import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import {Router} from "express";
import {Metadata} from "./services/Metadata";
import {IApiAttributesAnnotation} from "./interfaces/IApiAttributesAnnotation";
const cors = require('cors');
import "reflect-metadata";
import {Settings} from "./core/Settings";
import {IndexController} from "./controllers/IndexController";



class Server {
    public express: express.Application;
    private controllers : Array<any> = [
        IndexController
    ];
    public constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    private middleware(): void {
        this.express.use(cors({
            origin : Settings.getArray("http.defaults.origin"),
            method :  Settings.getArray("http.defaults.allowedMethods"),
            allowedHeaders: Settings.getArray("http.defaults.allowedHeaders"),
            exposedHeaders: Settings.getArray("http.defaults.exposedHeaders"),
            credentials : Settings.getBoolean("http.defaults.credentials")
        }));
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        if (Settings.exists("http.defaults.xPoweredBy")) {
            if (Settings.getBoolean("http.defaults.xPoweredBy") === false) this.express.disable('x-powered-by');
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
