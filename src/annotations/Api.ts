import { Annotations } from '../core/Annotations';
export function Api (): any;
export function Api (rootPath: string, useManifiest?: boolean): any;
export function Api (target: any, rootPath?: string, useManifiest?: boolean): any;
export function Api (...args: any[]): any {
    const  annotate: Function = (target: FunctionConstructor, rootPath?: string, useManifiest?: boolean): void => {
        Annotations.setApi(target, {
            name : target.prototype.constructor.name,
            root : ('/' + (rootPath || '')).trim().replace(/\/+/g, '/').replace(/(^\/+|\/+$)/g, ''),
            manifiest : useManifiest || false
        });
        return;
    };
    if (args.length > 0) {
        if (typeof args[0] === 'function') return annotate(args[0]);
        return (target: FunctionConstructor) => annotate.apply(null, [target].concat(args));
    }
    return;
}
