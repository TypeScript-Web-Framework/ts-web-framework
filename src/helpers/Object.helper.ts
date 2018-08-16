export class ObjectHelper  {
    public static isObject (value: any): boolean {
        return value !== null && typeof value === 'object' && Array.isArray(value) === false;
    }
    public static isObjectObject (value: any): boolean {
        return ObjectHelper.isObject(value) === true && Object.prototype.toString.call(value) === '[object Object]';
    }
    public static isConstructor (value: any): boolean {
        return typeof value === 'function'
            && typeof value.constructor === 'function'
            && value.constructor.name === 'Function';
    }
    public static isPlain (value: any): boolean {
        if (ObjectHelper.isObjectObject(value) === false) return false;
        if (typeof value.constructor !== 'function') return false;
        if (ObjectHelper.isObjectObject(value.constructor.prototype) === false) return false;
        return value.constructor.prototype.hasOwnProperty('isPrototypeOf') !== false;

    }
    public static isEmpty (value: any): boolean {
        if (!ObjectHelper.isObjectObject(value)) throw new TypeError('Only accept object');
        if (value === null) return true;
        return Object.keys(value).length === 0;
    }


    public static getMethods (obj: any): string[] {

        let methods: string[] = [];
        while (obj = Reflect.getPrototypeOf(obj)) {
            let keys = Reflect.ownKeys(obj);
            keys.forEach((k) => methods.push(k as string));
        }
        return methods;
    }
}
