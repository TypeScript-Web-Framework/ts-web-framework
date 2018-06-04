"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class ModelService {
    static use(collectionName, schema) {
        if (!(schema instanceof mongoose_1.Schema))
            throw new Error("schmea is not a Schema instance");
        if (mongoose_1.connection.modelNames().indexOf(collectionName + ModelService.prefix) === -1) {
            return mongoose_1.model(collectionName + ModelService.prefix, schema, collectionName);
        }
        else
            return mongoose_1.model(collectionName + ModelService.prefix);
    }
}
ModelService.prefix = "";
exports.ModelService = ModelService;
