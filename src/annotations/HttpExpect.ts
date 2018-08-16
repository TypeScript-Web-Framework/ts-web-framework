import { Annotations, InterfaceHttpExpectedKey, InterfaceHttpExpectedKeys } from '../core/Annotations';

export function HttpExpect (keys: InterfaceHttpExpectedKeys): Function;
export function HttpExpect (...args: any[]): any|Function {
    let isPlainObject: Function = (o: any): boolean =>
        !!o
        && typeof o === 'object'
        && Object.prototype.toString.call(o) === '[object Object]';

    return (target: any, propertyName: string): void => {
        let options: any = {};
        for (let key in args[0] as InterfaceHttpExpectedKeys) {
            let value: InterfaceHttpExpectedKey = args[0][key];
            // default key is undefined ;)
            let option: any = {
                name : key,
                in: 'query',
                type: 'String',
                required: false,
                message :  key + ' is expected'
            };
            if (isPlainObject(value)) {
                if ('message' in value && typeof value.message === 'string') option.message = value.message;
                if ('in' in value && typeof value.in === 'string') option.in = value.in;
                if ('type' in value && typeof value.type === 'function') {
                    option.type = value.type.prototype.constructor.name;
                }
                if ('required' in value && typeof value.required === 'boolean') option.required = value.required;
                if ('validate' in value && typeof value.validate === 'function') option.validate = value.validate;
                if ('default' in value) option.default = value.default;
            }
            options[option.name] = option;
        }
        Annotations.setExpected(target, propertyName, options);
    };
}
