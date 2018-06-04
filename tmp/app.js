"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const Metadata_1 = require("./services/Metadata");
const cors = require('cors');
require("reflect-metadata");
const Settings_1 = require("./core/Settings");
const IndexController_1 = require("./controllers/IndexController");
const helmet = require("helmet");
class Server {
    constructor() {
        this.controllers = [
            IndexController_1.IndexController
        ];
        this.express = express();
        this.middleware();
        this.routes();
    }
    middleware() {
        this.express.use(cors({
            origin: Settings_1.Settings.getArray("http.defaults.origin"),
            method: Settings_1.Settings.getArray("http.defaults.allowedMethods"),
            allowedHeaders: Settings_1.Settings.getArray("http.defaults.allowedHeaders"),
            exposedHeaders: Settings_1.Settings.getArray("http.defaults.exposedHeaders"),
            credentials: Settings_1.Settings.getBoolean("http.defaults.credentials")
        }));
        if (Settings_1.Settings.exists("http.defaults.security.xss")) {
            this.express.use(helmet.xssFilter({
                setOnOldIE: Settings_1.Settings.get("http.defaults.security.xss.setOnOldIE"),
                reportUri: Settings_1.Settings.get("http.defaults.security.xss.reportUri")
            }));
        }
        if (Settings_1.Settings.exists("http.defaults.security.contentSecurityPolicy")) {
            this.express.use(helmet.contentSecurityPolicy({
                directives: {
                    defaultSrc: Settings_1.Settings.get("http.defaults.security.contentSecurityPolicy.defaultSrc"),
                    styleSrc: Settings_1.Settings.get("http.defaults.security.contentSecurityPolicy.styleSrc")
                }
            }));
        }
        if (!Settings_1.Settings.getBoolean("http.defaults.security.xPoweredBy")) {
            this.express.disable('x-powered-by');
        }
        if (!Settings_1.Settings.getBoolean("http.defaults.security.csrf"))
            this.express.use(require("csurf")({ cookie: true }));
        if (Settings_1.Settings.exists("http.defaults.security.expectCt")) {
            this.express.use(helmet.expectCt({
                enforce: Settings_1.Settings.getBoolean("http.defaults.security.expectCt.enforce"),
                maxAge: Settings_1.Settings.get("http.defaults.security.expectCt.maxAge", 120),
                reportUri: Settings_1.Settings.get("http.defaults.security.expectCt.maxAge")
            }));
        }
        if (Settings_1.Settings.exists("http.defaults.security.dnsPrefetchControl")) {
            this.express.use(helmet.dnsPrefetchControl({
                allow: Settings_1.Settings.getBoolean("http.defaults.security.dnsPrefetchControl.allow")
            }));
        }
        if (Settings_1.Settings.exists("http.defaults.security.frameGuard")) {
            this.express.use(helmet.frameguard({
                action: Settings_1.Settings.get("http.defaults.security.frameGuard.action"),
                domain: Settings_1.Settings.get("http.defaults.security.frameGuard.domain")
            }));
        }
        if (Settings_1.Settings.exists("http.defaults.security.HTTPPublicKeyPinning")) {
            this.express.use(helmet.hpkp({
                maxAge: Settings_1.Settings.get("http.defaults.security.HTTPPublicKeyPinning.maxAge"),
                sha256s: Settings_1.Settings.get("http.defaults.security.HTTPPublicKeyPinning.sha256s"),
                includeSubdomains: Settings_1.Settings.get("http.defaults.security.HTTPPublicKeyPinning.includeSubdomains"),
                reportUri: Settings_1.Settings.get("http.defaults.security.HTTPPublicKeyPinning.reportUri"),
                reportOnly: Settings_1.Settings.get("http.defaults.security.HTTPPublicKeyPinning.reportOnly")
            }));
        }
        if (Settings_1.Settings.exists("http.defaults.security.StrictTransportSecurity")) {
            this.express.use(helmet.hsts({
                maxAge: Settings_1.Settings.get("http.defaults.security.StrictTransportSecurity.maxAge"),
                preload: Settings_1.Settings.get("http.defaults.security.StrictTransportSecurity.preload"),
            }));
        }
        if (Settings_1.Settings.exists("http.defaults.security.ieNoOpen"))
            this.express.use(helmet.ieNoOpen());
        if (Settings_1.Settings.exists("http.defaults.security.noCache"))
            this.express.use(helmet.noCache());
        if (Settings_1.Settings.exists("http.defaults.security.noSniff"))
            this.express.use(helmet.noSniff());
        if (Settings_1.Settings.exists("http.defaults.security.referrerPolicy")) {
            this.express.use(helmet.referrerPolicy({
                policy: Settings_1.Settings.get("http.defaults.security.referrerPolicy.policy")
            }));
        }
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    routes() {
        let router = express.Router();
        for (let controller of this.controllers) {
            let attrs = Metadata_1.Metadata.getAttributes(controller.prototype);
            if (!attrs)
                continue;
            console.log(`${attrs.method.toUpperCase()} ${attrs.uri}`);
            router[attrs.method](attrs.uri, (i, o) => {
                try {
                    new controller.prototype.constructor(i, o);
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
exports.default = new Server().express;
