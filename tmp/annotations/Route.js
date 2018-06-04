"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Metadata_1 = require("../services/Metadata");
function Route(...args) {
    let annotate = (target, uri, permission, method) => {
        let toUpdate = { uri: uri };
        if (permission)
            toUpdate.role = permission;
        if (method)
            toUpdate.method = method;
        Metadata_1.Metadata.setApiUri(target.prototype, target.name);
        Metadata_1.Metadata.updateAttributes(target.prototype, toUpdate);
        Metadata_1.Metadata.registerController(target.prototype);
        return;
    };
    if (args.length > 0) {
        if (typeof args[0] === "function")
            return annotate(args[0]);
        return (target) => annotate.apply(null, [target].concat(args));
    }
    return void 0;
}
exports.Route = Route;
