import 'reflect-metadata';
import {DataTypes} from "../utils/DataTypes";
import {IApiAttributesAnnotation} from "../interfaces/IApiAttributesAnnotation";
import * as _ from "lodash";
import {Route} from "../annotations/Annotations";

export class Metadata {
    static readonly METADATA_KEYS : { API : string, ATTRIBUTE : string, CONTROLLER :string, CONTROLLER_LIST : string } = {
        API         : 'Controller:api',
        ATTRIBUTE   : 'Controller:attribute',
        CONTROLLER   : 'Controller:controller',
        CONTROLLER_LIST   : 'Controller:controllers',
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
            permission : null,
            queryParams : null
        };
        Metadata.setAttributes(target, _.extend(attributes, update));
    }

    static registerController (controller : any): void {
        console.log("#A:", controller.constructor.name);
        Reflect.defineMetadata(Metadata.METADATA_KEYS.CONTROLLER, null, Route.prototype);

        let attrs : any = Reflect.getMetadata(Metadata.METADATA_KEYS.CONTROLLER_LIST, Route.prototype) || [];

        if (!attrs) attrs = [];
        console.log("#B:", controller.constructor.name);

        if (attrs.indexOf(controller.constructor.name) === -1) {
            console.log("#C:", controller.constructor.name);

            attrs.push(controller.constructor.name);
            Reflect.defineMetadata(
                Metadata.METADATA_KEYS.CONTROLLER_LIST,
                attrs,
                Route.prototype
            );
            console.log("#D:", controller.constructor.name);

        }

        console.log("#E:", controller.constructor.name);

    }

    static getControllers (): Array<string|FunctionConstructor|FunctionConstructor> {
        console.log("#F:", Route.prototype.constructor.name);

        return Reflect.getMetadata(Metadata.METADATA_KEYS.CONTROLLER_LIST, Route.prototype) || [];
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
