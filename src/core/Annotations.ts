// Service to annotate controllers and api's
export class Annotations {
    // Annotations keys
    static readonly KEYS : {ANNOTATION: string, API: string, ATTRIBUTE:string} = {
        ANNOTATION : "ANNOTATION",
        API : "API",
        ATTRIBUTE: "ATTRIBUTE"
    };

    //
    public static isValidPrototype (object: object):boolean {

        if(typeof object === "object" && !Array.isArray(object) && object !== null) {
            return ("constructor" in object) && ("prototype" in object.constructor);
        }
        else if (typeof object === "function") return true;
        return false;
    }

    // Register new API
    public static setApi (target:FunctionConstructor, options?: any) {
        if (!Annotations.isValidPrototype(target)) throw new TypeError("setApi");
        Reflect.defineMetadata(Annotations.KEYS.API, {
            name    : options.name || target.prototype.constructor.name,
            object  : target,
            actions : []
        }, target.constructor.prototype);
        let apis = Annotations.fetchApi() || [];
        apis.push(target);
        Reflect.defineMetadata(Annotations.KEYS.ANNOTATION, apis, Annotations.constructor.prototype);
    }


    // Set Http configuration
    public static setAction (target:any, property: string, method: string, route: string):any {
        if (!Annotations.isValidPrototype(target)) throw new TypeError("setAction");
        let attrs = Reflect.getMetadata(Annotations.KEYS.ATTRIBUTE, target.constructor.prototype);
        if (!Array.isArray(attrs)) attrs = [];
        attrs.push({name: property, method : method, route : route});
        return Reflect.defineMetadata(
            Annotations.KEYS.ATTRIBUTE,
            attrs,
            target.constructor.prototype
        );
    }

    //
    public static getActions (target: any) {
        if (!Annotations.isValidPrototype(target)) throw new TypeError("getActions");
        return Reflect.getMetadata(Annotations.KEYS.ATTRIBUTE, target.prototype);
    }

    // Alias of "getAttributes"
    public static getApi (target:FunctionConstructor) {
        if (!Annotations.isValidPrototype(target)) throw new TypeError("getApi");
        return Reflect.getMetadata(Annotations.KEYS.ATTRIBUTE, Annotations.constructor.prototype) || null;
    }

    // List all api's
    public static fetchApi () {
        return Reflect.getMetadata(Annotations.KEYS.ANNOTATION, Annotations.constructor.prototype)
    }

    // Set one or more attributes
    public static setAttributes(target: FunctionConstructor, data: object): void {
        if (!Annotations.isValidPrototype(target)) throw new TypeError("setAttributes");
        Reflect.defineMetadata(
            Annotations.KEYS.ATTRIBUTE,
            data,
            target
        );
    }

    // Set one attribute
    public static setAttribute (target:FunctionConstructor, key : string, value : any):void {
        if (!Annotations.isValidPrototype(target)) throw new TypeError("setAttribute");
        let attributes: any =  Reflect.getMetadata(Annotations.KEYS.ATTRIBUTE, Annotations.constructor.prototype) || null;
        if (attributes === null) attributes = {};
        attributes[key] = value;
        Annotations.setAttributes(Annotations.constructor.prototype, attributes);
    }
}
