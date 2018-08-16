import { Request, Response } from 'express';
import { Annotations } from './Annotations';
import { Debug } from './Debug';
import * as c from 'ansi-colors';
import { Exception } from './Exception';
import { ObjectHelper } from '../helpers/Object.helper';

export interface InterfaceController {
    params: () => { [key: string ]: string };
    queryString: () => { [key: string ]: string };
    end: (statusCode?: number, data?: any, asJson?: boolean) => void;
    httpOk: (data?: any, asJson?: boolean) => void;
    httpCreated: (data?: any, asJson?: boolean) => void;
    httpAccepted: (data?: any, asJson?: boolean) => void;
    httpNotFound: (data?: any, asJson?: boolean) => void;
    httpBadRequest: (data?: any, asJson?: boolean) => void;
    httpUnauthorized: (data?: any, asJson?: boolean) => void;
    httpForbidden: (data?: any, asJson?: boolean) => void;
    httpMethodNotAllowed: (data?: any, asJson?: boolean) => void;
    httpRedirect: (uri: string, permanently?: boolean) => void;
}
export abstract class Controller implements InterfaceController {
    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor(public request: Request, public response: Response) {
        process.on('unhandledRejection', error => {
            Debug.xlog("Exception:", error);
            this.httpInternalServerError();
        });

        const toIsolate = Annotations.getActions(this.constructor);
        for (let method of toIsolate) {
            // Debug.xlog(c.bold.green(c.symbols.info), c.bold.gray("Checking for:"), c.bold.magenta(method.name));
            (this as any)["isolated_" + method.name] = (this as any)[method.name];
            (this as any)[method.name] = () => {
                try {
                    Debug.xlog(c.bold.gray("Calling method:"), c.bold.magenta(method.name));
                    (this as any)["isolated_" + method.name].apply(this, []);
                }
                catch (e) {
                    Debug.xlog("Exception:::", e);
                    this.httpBadRequest(e);
                }
            };
            // Debug.xlog(c.bold.green(c.symbols.check), c.bold.green("Method :"), c.bold.green(method.name), c.bold.green("isolated as "), c.bold.magenta("isolated_" + method.name));
        }





        const classRule: Function = (): void => {
            if (this.constructor.name !== 'Controller') {
                const isType: Function = (value: any, type: string): boolean => {
                    switch (type.toLowerCase()) {
                        case 'string': return typeof value === 'string';
                        case 'boolean': return typeof value === 'boolean';
                        case 'array': return Array.isArray(value);
                        case 'blob':
                        case 'buffer': return value instanceof Buffer;
                        case 'number': return typeof value === 'number';
                        case 'object': return typeof value === 'object';
                        default: return false;
                    }
                };
                const controllerRules: any = Annotations.getExpected(this.constructor.prototype);
                for (let property in controllerRules) {
                    // noinspection JSUnfilteredForInLoop
                    let preparedName: string = ['_', Math.random().toString(), '_', property].join('');
                    // noinspection JSUnfilteredForInLoop
                    (this as any)[preparedName] = (this as any)[property];

                    // noinspection JSUnfilteredForInLoop
                    (this as any)[property] = () => {
                        // noinspection JSUnfilteredForInLoop
                        for (let param in controllerRules[property]) {
                            // noinspection JSUnfilteredForInLoop
                            let itm: any = controllerRules[property][param];
                            // check if exists
                            if (itm.required === true && !this.has(itm.name, itm.in)) {
                                return this.httpBadRequest(`#2: This service require a param type ${itm.type} in ${itm.in} called ${itm.name}`);
                            }
                            const value = this.get(itm.name, itm.in);
                            if (!isType(value, itm.type)) {
                                return this.httpBadRequest(`#1: This service require a param type ${itm.type} in ${itm.in} called ${itm.name}`);
                            }
                            if (typeof itm.validate === 'function') {
                                let callback = itm.validate(value);
                                if (callback !== true) return this.httpBadRequest(itm.message);
                            }
                        }
                        (this as any)[preparedName].apply(this, []);
                    };
                }
            }
        };
        if (typeof (this as any)._before === 'function') {
            Debug.xlog("CONSTRUCTOR:BEFORE::", this.constructor.name);

            const callbackResult = (this as any)._before.apply(this, []);
            if (callbackResult instanceof Promise) {
                callbackResult
                    .then(() => classRule())
                    .catch((e: any) => {
                        Debug.xlog("exception", e);
                        Debug.xlog("exception constructor", e.constructor.name);


                        if (ObjectHelper.isConstructor(e) && e.prototype instanceof Exception) {
                            Debug.xlog("exception", e.constructor.name);
                            throw new e();
                        }
                        else this.httpBadRequest();
                        Debug.xlog('xyz', e);
                    });
            }
            else {
                Debug.xlog("CONSTRUCTOR:NOT BEFORE::", this.constructor.name);
                classRule();
            }
        }
        else classRule();


    }

    public bodyAsJson (): any {
        return this.request.body;
    }
    public end (statusCode?: number, data?: any, asJson?: boolean): void {
        if (this.response.headersSent) return;
        if (statusCode !== undefined) this.response.status (statusCode);
        if (data !== undefined && data !== null) {
            if (asJson === true) {
                this.response.json(data);
                this.response.end();
                return;
            }
            else {
                if (typeof data !== 'undefined' && data !== null) {
                    if (typeof data === 'object') data = JSON.stringify(data);
                    else if (Number.isInteger(data)) data = data.toString();
                    else if (Number(data) === data && data % 1 !== 0) data = data.toString();
                    this.response.write(data);
                }
                else this.response.json(data);
            }
        }
        this.response.end();
    }
    public params <T>(): {[key: string]: T};
    public params (key: string, defaultValue?: any): string;
    public params (...args: any[]): any {
        if (args.length > 0) {
            if (args[0] in this.request.params) return this.request.params[args[0]];
            else if (args.length > 1) return args[1];
            else return null;
        }
        return this.request.params || {};
    }

    public header <T>(): {[key: string]: string};
    // noinspection JSUnusedGlobalSymbols
    public header (key: string): Promise<string>;
    // noinspection JSUnusedGlobalSymbols
    public header (key: string, defaultValue: string): Promise<string>;
    public header (...args: any[]): any {
        if (args.length > 0) {
            return new Promise((resolve, reject) => {
                if (args[0] in this.request.headers) resolve(this.request.headers[args[0]]);
                else if (args.length > 1) resolve(args[1]);
                else reject();
            });
        }
        return this.request.params || {};
    }

    public has (key: string, _in: 'header'|'cookie'|'body'|'form'|'query'|'querystring'|'path'|'param'): boolean {
        let property: string;
        switch (_in) {
            case 'header': property = 'headers'; break;
            case 'cookie': property = 'cookies'; break;
            case 'querystring':
            case 'query': property = 'query'; break;
            case 'form':
            case 'body': property = 'body'; break;
            case 'param':
            case 'path': property = 'params'; break;
            default: return false;
        }
        const prop = (this.request as any)[property];
        if (typeof prop !== 'object' || prop === null) return false;
        if (!(key in prop)) return false;
        return typeof prop[key] !== 'undefined';
    }
    public get (key: string, _in: 'header'|'cookie'|'body'|'form'|'query'|'querystring'|'path'|'param'): any|undefined {
        let property: string;
        switch (_in) {
            case 'header': property = 'headers'; break;
            case 'cookie': property = 'cookies'; break;
            case 'querystring':
            case 'query': property = 'query'; break;
            case 'form':
            case 'body': property = 'body'; break;
            case 'param':
            case 'path': property = 'params'; break;
            default: return false;
        }
        const prop = (this.request as any)[property];
        if (typeof prop !== 'object' || prop === null) return undefined;
        if (!(key in prop)) return undefined;
        return prop[key];
    }

    public queryString <T>(): { [key: string]: T};
    // noinspection JSUnusedLocalSymbols
    public queryString <T>(key: string): Promise<T>;
    // noinspection JSUnusedLocalSymbols
    public queryString <T>(key: string, defaultValue: any): Promise<T>;
    public queryString (...args: any[]): any {
        if (args.length > 0) {
            return new Promise((resolve, reject) => {
                if (args[0] in this.request.query) resolve(this.request.query[args[0]]);
                else if (args.length > 1) resolve(args[1]);
                else reject();
            });
        }
        return this.request.query || {};
    }
    // noinspection JSUnusedGlobalSymbols
    public hasQueryString (key: string): boolean {
        return key !== undefined && key !== null && key in this.request.query;
    }
    // noinspection JSUnusedGlobalSymbols
    public hasParam (key: string): boolean {
        return key !== undefined && key !== null && key in this.request.params;
    }
    // noinspection JSUnusedGlobalSymbols
    public hasQuery (key: string): boolean {
        return key !== undefined && key !== null && key in this.request.query;
    }
    // noinspection JSUnusedGlobalSymbols
    public hasJsonBody (key: string): boolean {
        if (typeof this.request.body === 'object' && this.request.body !== null) {
            return key !== undefined && key !== null && key in this.request.body;
        }
        return false;
    }
    public hasHeader (key: string): boolean {
        return key !== undefined && key !== null && key in this.request.headers;
    }
    // noinspection JSUnusedGlobalSymbols
    public http200 = this.httpOk;
    public httpOk (data?: any, asJson = true): void {
        this.end(200, data, asJson);
    }
    public httpCreated (data?: any, asJson = true): void {
        this.end(201, data, asJson);
    }
    public httpAccepted (data?: any, asJson = true): void {
        this.end(202, data, asJson);
    }
    // noinspection JSUnusedGlobalSymbols
    public http204 = this.httpNoContent;
    public httpNoContent (data?: any, asJson = true): void {
        this.end(204, data, asJson);
    }
    // noinspection JSUnusedGlobalSymbols
    public http404 = this.httpNotFound;
    public httpNotFound (data?: any, asJson = true): void {
        this.end(404, data, asJson);
    }
    // noinspection JSUnusedGlobalSymbols
    public http500 = this.httpInternalServerError;
    public httpInternalServerError (data?: any, asJson = true): void {
        this.end(500, data, asJson);
    }
    // noinspection JSUnusedGlobalSymbols
    public http400 = this.httpBadRequest;
    public httpBadRequest (data?: any, asJson = true): void {
        this.end(400, data, asJson);
    }
    public httpUnauthorized (data?: any, asJson = true): void {
        this.end(401, data, asJson);
    }
    public httpForbidden (data?: any, asJson = true): void {
        this.end(403, data, asJson);
    }
    public httpMethodNotAllowed (data?: any, asJson = true): void {
        this.end(405, data, asJson);
    }
    public httpRedirect(uri: string, permanently?: boolean): void {
        if (permanently === true) this.response.redirect(301, uri);
        else this.response.redirect(uri, 307);
        this.response.end();
    }
}
