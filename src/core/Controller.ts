import {Metadata} from "../services/Metadata";
import {Request, Response} from "express-serve-static-core";
import { Observable } from 'rxjs';
export interface IController {
    main: () => void;
    params : () => { [key : string ] : string };
    queryString : () => { [key : string ] : string };
    end : (statusCode?: number, data?:any, asJson?:boolean) => void;
    httpOk : (data?:any, asJson?:boolean) => void;
    httpCreated : (data?:any, asJson?:boolean) => void;
    httpAccepted : (data?:any, asJson?:boolean) => void;
    httpNotFound : (data?:any, asJson?:boolean) => void;
    httpBadRequest : (data?:any, asJson?:boolean) => void;
    httpUnauthorized : (data?:any, asJson?:boolean) => void;
    httpForbidden : (data?:any, asJson?:boolean) => void;
    httpMethodNotAllowed : (data?:any, asJson?:boolean) => void;
    httpRedirect : (uri:string, permanently?:boolean) => void;
}
export class Controller implements IController{
    private hasBadRequest : any = null;
    public constructor(public request: Request, public response : Response) {
        let attrs = Metadata.getAttributes(this.constructor.prototype);
        for (let key in attrs.queryParams) {
            let element = attrs.queryParams[key];
            let value : string = this.request.query[key];

            if (attrs.queryParams[key].required === true && !(key in this.request.query)) {
                this.hasBadRequest = `required "${key}" as query string param`;
                break;
            }
            else {
                if (element.validator instanceof RegExp && !element.validator.test(value)) {
                    this.hasBadRequest = `Invalid format for '"${key}"'.`;
                    break;
                }
                if (element.type === "date") this.request.query[key] = new Date(Date.parse(this.request.query[key]));
                if (element.type === "integer") this.request.query[key] = parseInt(this.request.query[key]);
                if (element.type === "float") this.request.query[key] = parseFloat(this.request.query[key]);
                if (element.type === "json") this.request.query[key] = JSON.parse(this.request.query[key]);
                if (element.type === "decode:json") this.request.query[key] = JSON.parse(decodeURIComponent(this.request.query[key]));
            }
        }
        if (this.hasBadRequest === null) {

            try {

                let onEnter : any = this.beforeEnter();

                if (onEnter instanceof Observable) onEnter = (onEnter as Observable<any>).toPromise();
                if (onEnter instanceof Promise) {
                    onEnter
                        .then(() => this.main())
                        .catch( e => this.httpBadRequest(e.toString()))
                }
                else this.main();

            }
            catch (error) {
                this.httpBadRequest(error);
            }

        }
        else this.httpBadRequest({
            error : this.hasBadRequest
        });
    }
    public beforeEnter ():Promise<void>|void {}
    public afterEnter ():Promise<void>|void {}
    public main ():Promise<void>|void {
        if (this.hasBadRequest !== null) return this.httpBadRequest({error : this.hasBadRequest});
        return this.httpOk();
    }
    public end (statusCode?: number, data?: any, asJson?:boolean):void {
        if (this.response.headersSent) return;
        if (statusCode !== undefined) this.response.status (statusCode);
        if (data != undefined && data !== null) {
            if (asJson === true) {
                this.response.json(data);
                this.response.end();
                return;
            }
            else {
                if (typeof data !== "undefined" && data !== null) {
                    if (typeof data === "object") data = JSON.stringify(data);
                    else if (Number.isInteger(data)) data = data.toString();
                    else if (Number(data) === data && data % 1 !== 0) data = data.toString();
                    this.response.write(data);
                }
                else this.response.json(data);
            }
        }
        this.response.end();
    }

    public params <T>():{[key:string]:T};
    public params (key:string):Promise<any>;
    public params (key:string, defaultValue : any):Promise<any>;
    public params (...args:any[]):any {
        if (args.length > 0) {
            return new Promise((resolve, reject) => {
                if (args[0] in this.request.params) resolve(this.request.params[args[0]]);
                else if (args.length > 1) resolve(args[1]);
                else reject();
            });
        }
        return this.request.params || {};
    }

    public header <T>():{[key:string]:string};
    public header (key:string):Promise<string>;
    public header (key:string, defaultValue : string):Promise<string>;
    public header (...args:any[]):any {
        if (args.length > 0) {
            return new Promise((resolve, reject) => {
                if (args[0] in this.request.headers) resolve(this.request.headers[args[0]]);
                else if (args.length > 1) resolve(args[1]);
                else reject();
            });
        }
        return this.request.params || {};
    }


    public queryString <T>():{ [key:string] : T};
    public queryString <T>(key:string):Promise<T>;
    public queryString <T>(key:string, defaultValue : any):Promise<T>;
    public queryString (...args:any[]):any {
        if (args.length > 0) {
            return new Promise((resolve, reject) => {
                if (args[0] in this.request.query) resolve(this.request.query[args[0]]);
                else if (args.length > 1) resolve(args[1]);
                else reject();
            });
        }
        return this.request.query || {};
    }

    public hasQueryString (key : string):boolean {
        return key !== undefined && key !== null && key in this.request.query;
    }
    public hasParam (key : string):boolean {
        return key !== undefined && key !== null && key in this.request.params;
    }
    public hasQuery (key : string):boolean {
        return key !== undefined && key !== null && key in this.request.query;
    }
    public hasHeader (key : string):boolean {
        return key !== undefined && key !== null && key in this.request.headers;
    }
    public httpOk (data?: any, asJson : boolean = true):void {
        this.end(200, data, asJson);
    }
    public httpCreated (data : any, asJson : boolean = true):void {
        this.end(201, data, asJson);
    }
    public httpAccepted (data : any, asJson : boolean = true):void {
        this.end(201, data, asJson);
    }
    public httpNotFound (data?:any, asJson : boolean = true):void {
        this.end(404, data, asJson);
    }
    public httpBadRequest (data?:any, asJson : boolean = true):void {
        console.log("BAD REQUEST", data);
        this.end(400, data, asJson);
    }
    public httpUnauthorized (data?:any, asJson : boolean = true):void {
        this.end(401, data, asJson);
    }
    public httpForbidden (data?:any, asJson : boolean = true):void {
        this.end(403, data, asJson);
    }
    public httpMethodNotAllowed (data?:any, asJson : boolean = true):void {
        this.end(405, data, asJson);
    }
    public httpRedirect(uri: string, permanently?: boolean):void {
        if (permanently === true) this.response.redirect(301, uri);
        else this.response.redirect(uri);
        this.response.end();
    }
}
