"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Metadata_1 = require("../services/Metadata");
var Permissions;
(function (Permissions) {
    Permissions["UPDATE"] = "update";
    Permissions["DELETE"] = "delete";
    Permissions["READ"] = "read";
    Permissions["CREATE"] = "create";
})(Permissions = exports.Permissions || (exports.Permissions = {}));
function Permission(...args) {
    let annotate = (target, role) => {
        Metadata_1.Metadata.updateAttributes(target.prototype, {
            role: role
        });
        return;
    };
    if (args.length > 0) {
        if (typeof args[0] === "function")
            return annotate(args[0]);
        return (target) => annotate(target, args[0]);
    }
    return void 0;
}
exports.Permission = Permission;
