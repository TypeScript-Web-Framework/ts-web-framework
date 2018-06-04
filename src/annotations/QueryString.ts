import "reflect-metadata";
import {Metadata} from "../services/Metadata";
export enum QueryStringTypes {
    JSON = "json",
    STRING = "string",
    INTEGER = "integer",
    FLOAT = "float",
    DOUBLE = "float",
    NUMBER = "integer",
    BOOL = "bool",
    BOOLEAN = "boolean"
}
export function QueryString (name: string):any;
export function QueryString (name: string, type: QueryStringTypes):any;
export function QueryString (name: string, type: QueryStringTypes, required: boolean):any;
export function QueryString (name: string, type: QueryStringTypes, required: boolean, validator : RegExp):any;
export function QueryString (...args:any[]):any {
    let  annotate :Function = (target: FunctionConstructor, name: string, type: QueryStringTypes = QueryStringTypes.STRING, required: boolean = false, validator?: RegExp):void => {
        let attrs: any = Metadata.getAttributes(target.prototype);
        if (!attrs) attrs = {queryParams : {}};
        attrs.queryParams[name] = {type : type, required : required === true, validator : validator};
        Metadata.updateAttributes(target.prototype, {
            queryParams : attrs.queryParams
        });
        return void 0;
    };
    if (args.length > 0) {
        if (typeof args[0] === "function") return annotate.apply(null, args);
        return (target:FunctionConstructor) => annotate.apply(null, [target].concat(args));
    }
    return void 0;
}
