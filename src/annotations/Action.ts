import {Annotations} from "../core/Annotations";
import 'reflect-metadata';

// Action definitions
//export function Action(options : any):Function;


export type ActionMethod = "GET" | "PUT" | "DELETE" | "POST" | "PATCH" | "HEAD" | "OPTIONS";


export function Action(route : string) : Function;
export function Action(route : string, method: ActionMethod) : Function;
export function Action(...args: any[]): Function|void {
    let  annotate : Function = (
        target: any,
        property: string,
        propertyDescriptor: PropertyDescriptor,
        route: string,
        method: string
    ): void => {
        let options: any = {};
        if (propertyDescriptor) {
            if (propertyDescriptor.get) options.get = propertyDescriptor.get;
            if (propertyDescriptor.set) options.set = propertyDescriptor.set;
        }
        // options.method
        // options.route
        Annotations.setApi(target, property, method, route)
    };
    if (args.length >= 2) {
        annotate.apply(null, args);
        return;
    }
    return (target: any, propertyName: string, propertyDescriptor: PropertyDescriptor) => {
        annotate(target, propertyName, propertyDescriptor, args[0], args[1] ? args[1]: "GET" );
    };
}
