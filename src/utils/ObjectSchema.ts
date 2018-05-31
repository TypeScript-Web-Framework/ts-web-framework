export function ObjectSchema (value:any, options:any, throwError:boolean = false) {
    let regexpArray = /(array|\[([\]]+)\])/i;
    let finalObject : any = {};
    if (typeof options !== "object" || options === null) return false;
    if (typeof value !== "object" || value === null) return false;
    let defaultOptions : any = {type : "string", defaultValue : null, nullable : false};
    for (let property in value) {
        let v = value[property], o = options[property];
        if (property in options) {
            o = Object.assign(defaultOptions, o || {});
            if (value[property] === null) {
                if (o.nullable === true) finalObject[property] = o.defaultValue;
                else {
                    if (throwError === true) throw new Error(`Can't support property ${property} as null or undefined`);
                    delete value[ property ];
                }
            }
            else if (Array.isArray(v) && regexpArray.test(o.type)) finalObject[property] = v;
            else if ((o.type === "plainObject" || o.type === "{}") && !Array.isArray(v)) finalObject[property] = v;
            else if (o.type === "numeric" && typeof v === "number") finalObject[property] = v;
            else if (o.type === "integer" && Number.isInteger(v)) finalObject[property] = v;
            else if (o.type === "float" && Number(v) === v && v % 1 !== 0) finalObject[property] = v;
            else if (typeof v === o.type) finalObject[property] = v;
            else {
                if (throwError === true) throw new Error(`Can't support property ${property} as ${typeof v} because you need it as ${o.type}`);
                delete value[ property ];
            }
        }
        else delete value[ property ];
    }
    return finalObject;
}
