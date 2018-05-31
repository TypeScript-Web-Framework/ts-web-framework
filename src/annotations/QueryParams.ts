import "reflect-metadata";
import {Metadata} from "../services/Metadata";


export enum QueryParamsTypes {
    JSON = "json",
    STRING = "string",
    INTEGER = "integer",
    FLOAT = "float",
    DOUBLE = "float",
    NUMBER = "integer",
    BOOL = "bool",
    BOOLEAN = "boolean"
}

export function QueryParams (name: string):any;
export function QueryParams (name: string, type: QueryParamsTypes):any;
export function QueryParams (name: string, type: QueryParamsTypes, required: boolean):any;
export function QueryParams (name: string, type: QueryParamsTypes, required: boolean, validator : RegExp):any;
export function QueryParams (...args:any[]):any {
    let  annotate :Function = (target: any, name: string, type: QueryParamsTypes = QueryParamsTypes.STRING, required: boolean = false, validator?: RegExp):void => {
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
        return (target:any) => annotate.apply(null, [target].concat(args));
    }
    return void 0;
}
