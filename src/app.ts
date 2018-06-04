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
import * as helmet from "helmet";




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
        if (Settings.exists("http.defaults.security.xss")) {
            this.express.use(helmet.xssFilter(<any>{
                setOnOldIE: Settings.get("http.defaults.security.xss.setOnOldIE"),
                reportUri: Settings.get("http.defaults.security.xss.reportUri")
            }));
        }
        if (Settings.exists("http.defaults.security.contentSecurityPolicy")) {
            this.express.use(helmet.contentSecurityPolicy({
                directives: {
                    defaultSrc: Settings.get("http.defaults.security.contentSecurityPolicy.defaultSrc"),
                    styleSrc:  Settings.get("http.defaults.security.contentSecurityPolicy.styleSrc")
                }
            }))
        }
        if (!Settings.getBoolean("http.defaults.security.xPoweredBy")) {
            this.express.disable('x-powered-by');
        }
        if (!Settings.getBoolean("http.defaults.security.csrf")) this.express.use(require("csurf")({ cookie: true }));
        if (Settings.exists("http.defaults.security.expectCt")) {
            this.express.use(helmet.expectCt({
                enforce: Settings.getBoolean("http.defaults.security.expectCt.enforce"),
                maxAge: Settings.get("http.defaults.security.expectCt.maxAge", 120),
                reportUri: Settings.get("http.defaults.security.expectCt.maxAge")
            }))
        }
        if (Settings.exists("http.defaults.security.dnsPrefetchControl")) {
            this.express.use(helmet.dnsPrefetchControl({
                allow: Settings.getBoolean("http.defaults.security.dnsPrefetchControl.allow")
            }))
        }
        if (Settings.exists("http.defaults.security.frameGuard")) {
            this.express.use(helmet.frameguard({
                action: Settings.get("http.defaults.security.frameGuard.action"),
                domain: Settings.get("http.defaults.security.frameGuard.domain")
            }))
        }
        if (Settings.exists("http.defaults.security.HTTPPublicKeyPinning")) {
            this.express.use(helmet.hpkp({
                maxAge: Settings.get("http.defaults.security.HTTPPublicKeyPinning.maxAge"),
                sha256s: Settings.get("http.defaults.security.HTTPPublicKeyPinning.sha256s"),
                includeSubdomains: Settings.get("http.defaults.security.HTTPPublicKeyPinning.includeSubdomains"),
                reportUri: Settings.get("http.defaults.security.HTTPPublicKeyPinning.reportUri"),
                reportOnly: Settings.get("http.defaults.security.HTTPPublicKeyPinning.reportOnly")
            }))
        }
        if (Settings.exists("http.defaults.security.StrictTransportSecurity")) {
            this.express.use(helmet.hsts({
                maxAge: Settings.get("http.defaults.security.StrictTransportSecurity.maxAge"),
                preload: Settings.get("http.defaults.security.StrictTransportSecurity.preload"),
            }))
        }
        if (Settings.exists("http.defaults.security.ieNoOpen")) this.express.use(helmet.ieNoOpen());
        if (Settings.exists("http.defaults.security.noCache")) this.express.use(helmet.noCache());
        if (Settings.exists("http.defaults.security.noSniff")) this.express.use(helmet.noSniff());
        if (Settings.exists("http.defaults.security.referrerPolicy")) {
            this.express.use(helmet.referrerPolicy({
                policy : Settings.get("http.defaults.security.referrerPolicy.policy")
            }));
        }


        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));

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
