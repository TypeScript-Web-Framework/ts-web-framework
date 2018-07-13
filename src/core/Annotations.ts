// Service to annotate controllers and api's
export class Annotations {
    static readonly DEFAULT_OPTIONS: any = {};
    // Annotations keys
    static readonly KEYS : {CONTROLLER: string, API : string, ATTRIBUTE:string} = {
        CONTROLLER : "CONTROLLER",
        API: "API",
        ATTRIBUTE: "ATTRIBUTE"
    };
    // Register new Controller
    public static setController (target:FunctionConstructor) {
        Reflect.defineMetadata(Annotations.KEYS.CONTROLLER, {
            name : target.prototype.constructor.name,
            api : []
        }, target);
    }
    // Get registrered Controller
    public static getController(target:FunctionConstructor):string {
        return Reflect.getMetadata(Annotations.KEYS.CONTROLLER, target) || null;
    }
    // Set Action configuration
    public static setApi (
        target      :any,
        property    : string,
        method      : "GET" | "PUT" | "DELETE" | "POST" | "OPTION" | "HEAD" | "PATCH" | string,
        route       : string
    ):any {
        return Annotations.setAttributes(target, {
            propertyName: property,
            method : method,
            route : route
        });
    }
    // Alias of "getAttributes"
    public static getApi (target:FunctionConstructor) {
        return Annotations.getAttributes(target)
    }
    // Set one or more attributes
    public static setAttributes(target: FunctionConstructor, options: object): void {
        Reflect.defineMetadata(
            Annotations.KEYS.ATTRIBUTE,
            Object.assign({}, Annotations.DEFAULT_OPTIONS, options),
            target
        );
    }
    // Get all attributes of one controller
    public static getAttributes(target: FunctionConstructor):object | null{
        return Reflect.getMetadata(Annotations.KEYS.ATTRIBUTE, target.prototype) || null;
    }
    // Set one attribute
    public static setAttribute (target:FunctionConstructor, key : string, value : any):void {
        let attributes: any = Annotations.getAttributes(target);
        if (attributes === null) attributes = {};
        attributes[key] = value;
        Annotations.setAttributes(target, attributes);
    }
}
