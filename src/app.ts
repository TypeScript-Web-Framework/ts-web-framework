import * as express from 'express';
import 'reflect-metadata';
import { BodyParserMiddleware } from './middleware/BodyParser.middleware';
import { CorsMiddleware } from './middleware/Cors.middleware';
import { LoggerMiddleware } from './middleware/Logger.middleware';
import { SecurityMiddleware } from './middleware/Security.middleware';
import { CookieMiddleware } from './middleware/Cookie.middleware';
import { SessionsMiddleware } from './middleware/Sessions.middleware';
import { Annotations } from './core/Annotations';
import { MiddlewareInject } from './core/MiddlewareInject';
import { Manifiest } from './core/Manifiest';
import { Debug } from './core/Debug';
import {IndexController} from "./controllers/IndexController";
import {CookieParserMiddleware} from "./middleware/CookieParser.middleware";
const c = require('ansi-colors');
// Define server class
class Server {
    // declare express property
    public express: express.Application;
    // declare controllers
    // noinspection JSMismatchedCollectionQueryUpdate
    // noinspection JSUnusedLocalSymbols
    // noinspection JSMismatchedCollectionQueryUpdate
    // noinspection JSUnusedLocalSymbols
    // noinspection JSMismatchedCollectionQueryUpdate
    // noinspection JSUnusedLocalSymbols
    private controllers: any[] = [IndexController];
    // declare and import middlewares
    private middlewares: Function[] = [
        BodyParserMiddleware,
        CorsMiddleware,
        LoggerMiddleware,
        SecurityMiddleware,
        CookieMiddleware,
        SessionsMiddleware,
        CookieParserMiddleware
    ];
    // implement constructor
    public constructor() {
        process.stdout.write('\u001b[2J');
        process.stdout.write('\u001b[1;1H');
        process.stdout.write('\u001b[3J');
        this.express = express();
        this.middleware()
            .then(() => this.routes())
            .catch((e: any) => Debug.xlog('error', e));
    }
    // implement middlewares
    private middleware(): Promise<any> {
        const promises: Promise<any>[] = [];
        for (const middleware of this.middlewares) {
            const instance: MiddlewareInject = (new (middleware.prototype.constructor)(this.express));
            const inject: any | Promise<any> = instance.inject();
            if (inject instanceof Promise) promises.push(inject as Promise<any>);
        }
        return Promise.all(promises);
    }
    // implements routing
    private routes(): void {
        const router: express.Router = express.Router();
        for (const api of (Annotations.fetchApi() as any[])) {
            let apiInfo = Annotations.getApi(api.prototype.constructor);
            Debug.xlog(c.bold.blue(apiInfo.name), '(', c.bold.gray(api.constructor.name), ')');
            for (const rule of Annotations.getActions(api)) {
                let route: string[]|string = [];
                if (apiInfo.manifiest === true) {
                    if (Manifiest.exists('http.root')) {
                        let manifiestRoot: string = Manifiest.getString('http.root', undefined);
                        // noinspection SuspiciousTypeOfGuard
                        if (typeof manifiestRoot === 'string' && manifiestRoot.trim().length > 0) route.push(manifiestRoot.trim());
                    }
                }
                route.push(apiInfo.root);
                route.push(rule.route);
                route = route.join('/');
                route =  route
                    .replace(/\/+/g, '/')
                    .replace(/(^\/+|\/+$)/g, '');
                route = '/' + route;
                route = route.replace(/\s+/g, '');
                let method: string = ' '.repeat(10);
                let preMethod: string = rule.method.toUpperCase().replace(/\s+/g, '');
                method = preMethod + method.substr(preMethod.length);
                let action: string = ' '.repeat(60);
                let preAction = (api.name + '.' + rule.name).replace(/\s+/g, '');
                action = preAction + action.substr(preAction.length);
                Debug.xlog(c.bold.green(method), c.bold.magenta(action), c.bold.gray(route));
                (router as any)[ rule.method.toLowerCase() ](route, (i: any, o: any) => {
                    try {
                        const x: any = new (api as FunctionConstructor)(i, o);
                        x[rule.name].apply(x, []);
                    }
                    catch (e) {
                        o.status(500);
                        o.end();
                    }
                });
            }
            Debug.xlog(' ');
        }
        Debug.xlog(c.bold.green(c.symbols.check, 'Listening to HTTP requests:'), '\n');
        this.express.use('/', router);
    }
}
// export server
export default new Server().express;
