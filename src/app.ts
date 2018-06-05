import * as express from 'express';
import {Router} from "express";
import {Metadata} from "./services/Metadata";
import {IApiAttributesAnnotation} from "./interfaces/IApiAttributesAnnotation";
import "reflect-metadata";
import {IndexController} from "./controllers/IndexController";
import {BodyParserMiddleware} from "./middleware/BodyParserMiddleware";
import {CorsMiddleware} from "./middleware/CorsMiddleware";
import {LoggerMiddleware} from "./middleware/LoggerMiddleware";
import {SecurityMiddleware} from "./middleware/SecurityMiddleware";
import {CookieMiddleware} from "./middleware/CookieMiddleware";
import {SessionsMiddleware} from "./middleware/SessionsMiddleware";

class Server {
    public express: express.Application;
    private controllers : Array<any> = [
        IndexController
    ];
    private middlewares : Array<Function> = [
        BodyParserMiddleware,
        CorsMiddleware,
        LoggerMiddleware,
        SecurityMiddleware,
        CookieMiddleware,
        SessionsMiddleware
    ];
    public constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    private middleware(): void {
        for (let middleware of this.middlewares) {
            new (middleware.prototype.constructor)(this.express);
        }
    }
    private routes(): void {
        let router : Router = express.Router();
        for (let controller of this.controllers) {


            let attrs : IApiAttributesAnnotation = Metadata.getAttributes(controller.prototype);
            if (!attrs) continue;
            console.log(`${attrs.method.toUpperCase()} ${attrs.uri}`);
            (router as any)[ attrs.method ](attrs.uri, (i:any, o:any) => {
                try {
                    new (controller.prototype.constructor as FunctionConstructor)(i, o);
                }
                catch (e) {
                    o.status(401);
                    o.end();
                }
            });
        }
        this.express.use('/', router);
    }
}
export default new Server().express;
