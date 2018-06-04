"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Metadata_1 = require("../services/Metadata");
var Methods;
(function (Methods) {
    Methods["POST"] = "post";
    Methods["GET"] = "get";
    Methods["DELETE"] = "delete";
    Methods["PUT"] = "put";
    Methods["PATCH"] = "path";
    Methods["HEAD"] = "head";
    Methods["CONNECT"] = "connect";
    Methods["OPTIONS"] = "options";
    Methods["TRACE"] = "trace";
})(Methods = exports.Methods || (exports.Methods = {}));
function Method(...args) {
    let annotate = (target, method) => {
        Metadata_1.Metadata.updateAttributes(target.prototype, {
            method: method
        });
        return void 0;
    };
    if (args.length > 0) {
        if (typeof args[0] === "function")
            return annotate(args[0]);
        return (target) => annotate(target, args[0]);
    }
    return void 0;
}
exports.Method = Method;
