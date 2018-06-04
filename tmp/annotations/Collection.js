"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Metadata_1 = require("../services/Metadata");
function Collection(...args) {
    let annotate = (target, collection) => {
        Metadata_1.Metadata.updateAttributes(target.prototype, { collection: collection });
        return;
    };
    if (args.length > 0) {
        if (typeof args[0] === "function")
            return annotate(args[0]);
        return (target) => annotate(target, args[0]);
    }
    return void 0;
}
exports.Collection = Collection;
