import 'reflect-metadata';
import {DataTypes} from "../utils/DataTypes";
import {IApiAttributesAnnotation} from "../interfaces/IApiAttributesAnnotation";
import * as _ from "lodash";

export class Metadata {
    static readonly METADATA_KEYS : { API : string, ATTRIBUTE : string } = {
        API         : 'Analytics:api',
        ATTRIBUTE   : 'Analytics:attribute',
    };
    static readonly DEFAULT_OPTIONS : Object = {};

    static setApiUri(target: Object, uri: string):void {
        Reflect.defineMetadata(Metadata.METADATA_KEYS.API, uri, target);
    }
    static getApiUri(target:Object):string|null {
        return Reflect.getMetadata(Metadata.METADATA_KEYS.API, target) || null;
    }
    static getValueType(target: Object, propertyName: string): any {
        const type = Reflect.getMetadata('design:type', target, propertyName);
        const dataType = DataTypes.infer(type);
        if (dataType) return dataType;
        throw new Error(`Specified type of property`);
    }
    static updateAttributes (target: any, update: any): void {
        let attributes : IApiAttributesAnnotation = Metadata.getAttributes(target);
        if (!attributes) attributes = {
            uri : null,
            method : null,
            role : null,
            clientParam: "client",
            queryParams : null
        };
        Metadata.setAttributes(target, _.extend(attributes, update));
    }
    static setAttributes(target: Object, options: any): void {
        Reflect.defineMetadata(
            Metadata.METADATA_KEYS.ATTRIBUTE,
            Object.assign(<IApiAttributesAnnotation>{}, Metadata.DEFAULT_OPTIONS, options),
            target
        );
    }
    static getAttributes(target: any): IApiAttributesAnnotation | undefined {
        return Reflect.getMetadata(Metadata.METADATA_KEYS.ATTRIBUTE, target);
    }
}
