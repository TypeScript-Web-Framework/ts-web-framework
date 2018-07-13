import "reflect-metadata";
import {Metadata} from "../services/Metadata";
export enum Methods {
    POST    = "post",
    GET     = "get",
    DELETE  = "delete",
    PUT     = "put",
    PATCH   = "path",
    HEAD    = "head",
    CONNECT = "connect",
    OPTIONS = "options",
    TRACE   = "trace"
}
export function Method (method : Methods | string):any;
export function Method (...args:any[]):any {
    let  annotate :Function = (target: FunctionConstructor, method?: Methods | string):void => {
        Metadata.updateAttributes(target.prototype, {
            method : method
        });
        return void 0;
    };
    if (args.length > 0) {
        if (typeof args[0] === "function") return annotate(args[0]);
        return (target:FunctionConstructor) => annotate(target, args[0]);
    }
    return void 0;
}
