"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const DataTypes_1 = require("../utils/DataTypes");
const _ = require("lodash");
const Annotations_1 = require("../annotations/Annotations");
class Metadata {
    static setApiUri(target, uri) {
        Reflect.defineMetadata(Metadata.METADATA_KEYS.API, uri, target);
    }
    static getApiUri(target) {
        return Reflect.getMetadata(Metadata.METADATA_KEYS.API, target) || null;
    }
    static getValueType(target, propertyName) {
        const type = Reflect.getMetadata('design:type', target, propertyName);
        const dataType = DataTypes_1.DataTypes.infer(type);
        if (dataType)
            return dataType;
        throw new Error(`Specified type of property`);
    }
    static updateAttributes(target, update) {
        let attributes = Metadata.getAttributes(target);
        if (!attributes)
            attributes = {
                uri: null,
                method: null,
                permission: null,
                queryParams: null
            };
        Metadata.setAttributes(target, _.extend(attributes, update));
    }
    static registerController(controller) {
        console.log("#A:", controller.constructor.name);
        Reflect.defineMetadata(Metadata.METADATA_KEYS.CONTROLLER, null, Annotations_1.Route.prototype);
        let attrs = Reflect.getMetadata(Metadata.METADATA_KEYS.CONTROLLER_LIST, Annotations_1.Route.prototype) || [];
        if (!attrs)
            attrs = [];
        console.log("#B:", controller.constructor.name);
        if (attrs.indexOf(controller.constructor.name) === -1) {
            console.log("#C:", controller.constructor.name);
            attrs.push(controller.constructor.name);
            Reflect.defineMetadata(Metadata.METADATA_KEYS.CONTROLLER_LIST, attrs, Annotations_1.Route.prototype);
            console.log("#D:", controller.constructor.name);
        }
        console.log("#E:", controller.constructor.name);
    }
    static getControllers() {
        console.log("#F:", Annotations_1.Route.prototype.constructor.name);
        return Reflect.getMetadata(Metadata.METADATA_KEYS.CONTROLLER_LIST, Annotations_1.Route.prototype) || [];
    }
    static setAttributes(target, options) {
        Reflect.defineMetadata(Metadata.METADATA_KEYS.ATTRIBUTE, Object.assign({}, Metadata.DEFAULT_OPTIONS, options), target);
    }
    static getAttributes(target) {
        return Reflect.getMetadata(Metadata.METADATA_KEYS.ATTRIBUTE, target);
    }
}
Metadata.METADATA_KEYS = {
    API: 'Controller:api',
    ATTRIBUTE: 'Controller:attribute',
    CONTROLLER: 'Controller:controller',
    CONTROLLER_LIST: 'Controller:controllers',
};
Metadata.DEFAULT_OPTIONS = {};
exports.Metadata = Metadata;
