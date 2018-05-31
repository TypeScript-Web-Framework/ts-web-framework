import "reflect-metadata";
import {Metadata} from "../services/Metadata";
import {Permissions} from "../enums/Permissions";
import {Methods} from "../enums/Methods";


export function Uri (uri:string, role?: Permissions, method?: Methods, clientParam?: string):any;
export function Uri (...args:any[]):any {
    let  annotate :Function = (target: any, uri: string, role?: Permissions, method?: Methods, clientParam?: string):void => {
        let toUpdate : any = {uri : uri};
        if (role) toUpdate.role = role;
        if (method) toUpdate.method = method;
        if (clientParam) toUpdate.clientParam = clientParam;
        Metadata.setApiUri(target.prototype, target.name);
        Metadata.updateAttributes(target.prototype, toUpdate);
        return;
    };
    if (args.length > 0) {
        if (typeof args[0] === "function") return annotate(args[0]);
        return (target:any) => annotate.apply(null, [target].concat(args));
    }
    return void 0;
}
