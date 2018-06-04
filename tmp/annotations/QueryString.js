"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Metadata_1 = require("../services/Metadata");
var QueryStringTypes;
(function (QueryStringTypes) {
    QueryStringTypes["JSON"] = "json";
    QueryStringTypes["STRING"] = "string";
    QueryStringTypes["INTEGER"] = "integer";
    QueryStringTypes["FLOAT"] = "float";
    QueryStringTypes["DOUBLE"] = "float";
    QueryStringTypes["NUMBER"] = "integer";
    QueryStringTypes["BOOL"] = "bool";
    QueryStringTypes["BOOLEAN"] = "boolean";
})(QueryStringTypes = exports.QueryStringTypes || (exports.QueryStringTypes = {}));
function QueryString(...args) {
    let annotate = (target, name, type = QueryStringTypes.STRING, required = false, validator) => {
        let attrs = Metadata_1.Metadata.getAttributes(target.prototype);
        if (!attrs)
            attrs = { queryParams: {} };
        attrs.queryParams[name] = { type: type, required: required === true, validator: validator };
        Metadata_1.Metadata.updateAttributes(target.prototype, {
            queryParams: attrs.queryParams
        });
        return void 0;
    };
    if (args.length > 0) {
        if (typeof args[0] === "function")
            return annotate.apply(null, args);
        return (target) => annotate.apply(null, [target].concat(args));
    }
    return void 0;
}
exports.QueryString = QueryString;
