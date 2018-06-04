"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ObjectIsNull {
    static isNull(data, strict = false) {
        let properties = 0;
        if (typeof data === "undefined" || data === null)
            return true;
        if (typeof data === "string")
            data = data.split("");
        if (Array.isArray(data)) {
            properties = data.length;
            if (properties === 0)
                return true;
        }
        else {
            properties = Object.keys(data).length;
            if (properties === 0)
                return true;
        }
        let countNull = 0;
        for (let index in data) {
            if (typeof data[index] === "undefined" || data[index] === null)
                countNull++;
        }
        if (strict === false)
            return properties === countNull;
        return countNull > 0;
    }
    static get(data, strict, defaultValue = null) {
        return ObjectIsNull.isNull(data, strict) ? defaultValue : data;
    }
}
exports.ObjectIsNull = ObjectIsNull;
