import {Annotations} from "../core/Annotations";
export function Api ():any;
export function Api (target: any):any;
export function Api (target: any, name : string):any;
export function Api (...args:any[]):any {
    let  annotate :Function = (target: FunctionConstructor, name?: string):void => {
        Annotations.setApi(target, {
            name : name || target.prototype.constructor.name
        });
        return;
    };
    if (args.length > 0) {
        if (typeof args[0] === "function") return annotate(args[0]);
        return (target:FunctionConstructor) => annotate.apply(null, [target].concat(args));
    }
    return;
}
