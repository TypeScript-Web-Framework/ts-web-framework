import "reflect-metadata";
import {Metadata} from "../services/Metadata";
import {Permissions} from "./Permission";
import {Methods} from "./Method";

export interface RouteOptions {
    permission?: Permissions;
    method?: Methods;
}
export function Route (uri:string, options?: RouteOptions):any;
export function Route (...args:any[]):any {
    let  annotate :Function = (target: FunctionConstructor, uri: string, permission?: Permissions, method?: Methods):void => {
        let toUpdate : any = {uri : uri};
        if (permission) toUpdate.role = permission;
        if (method) toUpdate.method = method;
        Metadata.setApiUri(target.prototype, target.name);
        Metadata.updateAttributes(target.prototype, toUpdate);
        Metadata.registerController(target.prototype);
        return;
    };
    if (args.length > 0) {
        if (typeof args[0] === "function") return annotate(args[0]);
        return (target:FunctionConstructor) => annotate.apply(null, [target].concat(args));
    }
    return void 0;
}
