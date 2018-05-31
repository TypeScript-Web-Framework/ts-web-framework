import "reflect-metadata";
import {Metadata} from "../services/Metadata";

export function Collection (collection: string):any;
export function Collection (...args:any[]):any {
    let  annotate :Function = (target: any, collection: string):void => {
        Metadata.updateAttributes(target.prototype, {collection : collection});
        return;
    };
    if (args.length > 0) {
        if (typeof args[0] === "function") return annotate(args[0]);
        return (target:any) => annotate(target, args[0]);
    }
    return void 0;
}
