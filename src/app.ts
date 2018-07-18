import * as express from 'express';
import {Router} from "express";
import "reflect-metadata";
import {IndexController} from "./controllers/IndexController";
import {BodyParserMiddleware} from "./middleware/BodyParserMiddleware";
import {CorsMiddleware} from "./middleware/CorsMiddleware";
import {LoggerMiddleware} from "./middleware/LoggerMiddleware";
import {SecurityMiddleware} from "./middleware/SecurityMiddleware";
import {CookieMiddleware} from "./middleware/CookieMiddleware";
import {SessionsMiddleware} from "./middleware/SessionsMiddleware";
import {Annotations} from "./core/Annotations";

// Define server class
class Server {
    // declare express property
    public express: express.Application;
    // declare controllers
    private controllers : Array<any> = [IndexController];
    // declare and import middlewares
    private middlewares : Array<Function> = [
        BodyParserMiddleware,
        CorsMiddleware,
        LoggerMiddleware,
        SecurityMiddleware,
        CookieMiddleware,
        SessionsMiddleware
    ];
    // implement constructor
    public constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // implement middlewares
    private middleware(): void {
        for (let middleware of this.middlewares) (new (middleware.prototype.constructor)(this.express));
    }
    // implements routing
    private routes(): void {
        let router : Router = express.Router();
        for (let api of (Annotations.fetchApi() as any[])) {
            for (let rule of Annotations.getActions(api)) {
                console.log(`${rule.method.toUpperCase()} ${rule.route == "" ? "/" : rule.route} => ${api.name}.${rule.name}`);
                (router as any)[ rule.method.toLowerCase() ](rule.route, (i:any, o:any) => {
                    try {
                        let x :any = new (api as FunctionConstructor)(i, o);
                        x[rule.name].apply(x, []);
                    }
                    catch (e) {
                        console.error(e);
                        o.status(500);
                        o.end();
                    }
                });
            }
        }
        this.express.use('/', router);
    }
}
// export server
export default new Server().express;
