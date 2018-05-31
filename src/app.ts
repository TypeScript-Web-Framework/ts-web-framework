import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import {Router} from "express";
import {Metadata} from "./services/Metadata";
import {IApiAttributesAnnotation} from "./interfaces/IApiAttributesAnnotation";
import {Controller} from "./core/Controller";
const cors = require('cors');
import "reflect-metadata";
class Server {
    public defaultLimit : number = 10;
    public express: express.Application;
    private controllers : Array<typeof Controller> = [];
    public constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    private middleware(): void {
        this.express.use(cors({
            origin : true,
            method : ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Authorization-Token', 'X-Authorization-Secret'],
            exposedHeaders: ['Content-Range', 'X-Content-Range'],
            credentials : true
        }));
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.disable('x-powered-by');
    }
    private routes(): void {
        let router : Router = express.Router();
        for (let controller of this.controllers) {
            let attrs : IApiAttributesAnnotation = Metadata.getAttributes(controller.prototype);
            if (!attrs) continue;
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
