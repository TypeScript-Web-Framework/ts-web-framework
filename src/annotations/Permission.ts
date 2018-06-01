import "reflect-metadata";
import {Metadata} from "../services/Metadata";
export enum Permissions {
    UPDATE = "update",
    DELETE = "delete",
    READ = "read",
    CREATE = "create"
}
export function Permission (role : Permissions):any;
export function Permission (...args:any[]):any {
    let  annotate :Function = (target: FunctionConstructor, role?: Permissions):void => {
        Metadata.updateAttributes(target.prototype, {
            role : role
        });
        return;
    };
    if (args.length > 0) {
        if (typeof args[0] === "function") return annotate(args[0]);
        return (target:FunctionConstructor) => annotate(target, args[0]);
    }
    return void 0;
}
