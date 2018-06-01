import {connection, Document, Model, model, Schema} from "mongoose";

export class ModelService {
    static prefix : string = "";
    public static use (collectionName : string, schema: Schema):Model<Document> {
        if (!(schema instanceof Schema)) throw new Error("schmea is not a Schema instance");
        if (connection.modelNames().indexOf(collectionName + ModelService.prefix) === -1) {
            return model(collectionName + ModelService.prefix, schema, collectionName);
        }
        else return model(collectionName + ModelService.prefix);
    }
}
