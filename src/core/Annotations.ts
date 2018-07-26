// Service to annotate controllers and api's

export type TypeHttpExpectedIn = 'query' | 'path' | 'body' | 'header' | 'cookie';
export type TypeHttpExpectedType = StringConstructor | NumberConstructor | ArrayConstructor | BooleanConstructor | ObjectConstructor;
export interface InterfaceHttpExpectedKey {
    in? : TypeHttpExpectedIn;
    type? : TypeHttpExpectedType;
    // default: false
    required?: boolean;
    // default: null
    validate?: (value:boolean|string|number|Array<boolean|number|string>) => boolean;
    // default: undefined
    default?: any;
    message?: string;
}
export interface InterfaceHttpExpectedKeys {
    [key: string]: InterfaceHttpExpectedKey | TypeHttpExpectedType;
}

export class Annotations {
    // Annotations keys
    static readonly KEYS: {
        ANNOTATION: string,
        API: string,
        ATTRIBUTE: string,
        EXPECTED: string
    } = {
        ANNOTATION : 'GLOBAL:ANNOTATION',
        API : 'CONTROLLER:API',
        ATTRIBUTE: 'CONTROLLER:HTTP:ATTRIBUTE',
        EXPECTED: 'CONTROLLER:HTTP:EXPECT'
    };

    //
    public static isValidPrototype (object: object): boolean {

        if (typeof object === 'object' && !Array.isArray(object) && object !== null) {
            return ('constructor' in object) && ('prototype' in object.constructor);
        }
        else if (typeof object === 'function') return true;
        return false;
    }

    // Register new API
    public static setApi (target: FunctionConstructor, options?: {name: string, root: string, manifiest: boolean}) {
        if (!Annotations.isValidPrototype(target)) throw new TypeError('setApi');
        Reflect.defineMetadata(Annotations.KEYS.API, {
            name    : options.name || target.prototype.constructor.name,
            root    : options.root || '/',
            manifiest: options.manifiest || false,
            object  : target,
            actions : []
        }, target.prototype.constructor);
        const apis = Annotations.fetchApi() || [];
        apis.push(target);
        // noinspection JSPotentiallyInvalidConstructorUsage
        Reflect.defineMetadata(Annotations.KEYS.ANNOTATION, apis, Annotations.constructor.prototype);
    }


    // Set Http configuration
    public static setAction (target: any, property: string, method: string, route: string, expected?: any): any {
        if (!expected) expected = {};
        if (!Annotations.isValidPrototype(target)) throw new TypeError('setAction');
        let attrs = Reflect.getMetadata(Annotations.KEYS.ATTRIBUTE, target.constructor.prototype);
        if (!Array.isArray(attrs)) attrs = [];
        attrs.push({name: property, method, route, expected});
        return Reflect.defineMetadata(
            Annotations.KEYS.ATTRIBUTE,
            attrs,
            target.constructor.prototype
        );
    }

    //
    public static getActions (target: any) {
        if (!Annotations.isValidPrototype(target)) throw new TypeError('getActions');
        return Reflect.getMetadata(Annotations.KEYS.ATTRIBUTE, target.prototype);
    }

    // Alias of "getAttributes"
    public static getApi (target: FunctionConstructor): {name: string, root: string, manifiest: boolean, object: any, actions: any[]} {
        if (!Annotations.isValidPrototype(target)) throw new TypeError('getApi');
        // noinspection JSPotentiallyInvalidConstructorUsage
        return Reflect.getMetadata(Annotations.KEYS.API, target) || null;
    }

    // List all api's
    public static fetchApi () {
        // noinspection JSPotentiallyInvalidConstructorUsage
        return Reflect.getMetadata(Annotations.KEYS.ANNOTATION, Annotations.constructor.prototype);
    }

    // Set one or more attributes
    public static setAttributes(target: FunctionConstructor, data: object): void {
        if (!Annotations.isValidPrototype(target)) throw new TypeError('setAttributes');
        Reflect.defineMetadata(
            Annotations.KEYS.ATTRIBUTE,
            data,
            target
        );
    }
    // Set expected rules
    public static setExpected (target: FunctionConstructor, propertyName: string, rules: any): void {
        let existing: any = Reflect.getMetadata(Annotations.KEYS.EXPECTED, target) || {};
        if (propertyName in existing) {
            existing[propertyName] = {...existing[propertyName], rules};
        }
        else existing[propertyName] = rules;
        Reflect.defineMetadata(Annotations.KEYS.EXPECTED, existing, target);
    }
    // Get expected rules
    public static getExpected (target: FunctionConstructor, propertyName?: string): any | undefined {
        if (typeof propertyName === 'undefined') return (Reflect.getMetadata(Annotations.KEYS.EXPECTED, target) || {});
        return (Reflect.getMetadata(Annotations.KEYS.EXPECTED, target) || {})[propertyName];
    }
}
