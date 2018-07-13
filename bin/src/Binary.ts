import {Create} from "./Create";
import {Utils} from "./Utils";

const path = require('path');
const program = require('commander');

declare type Type = "controller" | "model" | "middleware" | "annotation" | "service" | "test" | "interface" | "helper" | "exception";
declare type ControllerMethod = "get" | "post" | "put" | "delete" | "patch" | "head";


export const root : string = path.dirname(path.dirname( __dirname )) + path.sep + 'src' + path.sep;
export const routes : {
    controllers : string,
        models : string,
        services : string,
        middlewares : string,
        interfaces : string,
        schemas : string,
        utils : string,
        exceptions : string,
} = {
    controllers :root + "controllers",
    models :root + "models",
    services :root + "services",
    middlewares :root + "middleware",
    interfaces :root + "interfaces",
    schemas :root + "schema",
    utils :root + "utils",
    exceptions :root + "exception"
};


export class Binary {
    private actions : string[] = [
        "add", "rm"
    ];
    public constructor () {
        if (this.actions.indexOf(process.argv[2]) !== -1) {
            (this as any)[process.argv[2]].apply(this, process.argv.slice(3));
        }
        else {
            console.error("xyz")
        }
    }
    private add (type : string, name : string, method : string = "get", route : string = "") {
        switch (type) {
            case "controller" :
                Create.controller( Utils.camelize(name), method, route )
                    .then(() => console.log("created:" + routes.controllers))
                    .catch((e) => console.error("can't create:", e));
                break;
            default:
                console.error(type);
                console.error(process.argv);
                break;
        }
    }
}
