import {Annotations} from "../core/Annotations";
import 'reflect-metadata';

// Http definitions
export type ActionMethod = "GET" | "PUT" | "DELETE" | "POST" | "PATCH" | "HEAD" | "OPTIONS";

export function Http(route : string, method?: ActionMethod) : Function;
export function Http(target: FunctionConstructor, propertyName: string, propertyDescriptor?:PropertyDescriptor): void;
export function Http(...args: any[]): Function|void {
    if (args.length >= 4) {
        annotate(args[0], args[1], args[2], args[3], args[4], args[5] || null );
        return;
    }
    return (target: any, propertyName: string, propertyDescriptor: PropertyDescriptor) => {
        annotate(target, propertyName, propertyDescriptor, args[0], args[1] ? args[1]: "GET" );
    };
}

export function HttpGet(...args:any[]):Function {
    args[1] = "GET";
    return Http.apply(null, args);
}
export function HttpDelete(...args:any[]):Function {
    args[1] = "DELETE";
    return Http.apply(null, args);
}
export function HttpPost(...args:any[]):Function {
    args[1] = "POST";
    return Http.apply(null, args);
}
export function HttpPut(...args:any[]):Function {
    args[1] = "PUT";
    return Http.apply(null, args);
}

let  annotate : Function = (
    target: any,
    property: string,
    propertyDescriptor: PropertyDescriptor,
    route: string,
    method: ActionMethod
): void => {
    route = route.trim().replace(/\/+/g, "/");
    if (route == "//" || route === "\\") route = "";
    let options: any = {};
    if (propertyDescriptor) {
        if (propertyDescriptor.get) options.get = propertyDescriptor.get;
        if (propertyDescriptor.set) options.set = propertyDescriptor.set;
    }
    Annotations.setAction(target, property, method, route)
};
