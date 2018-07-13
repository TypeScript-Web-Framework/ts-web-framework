import {routes} from './Binary'
const fs = require('fs');
const path = require('path');


export class Create {


    public static controller (name : string, method : string = "get", route : string = "") {
        let extend : string = "Controller";
        let extendPath : string = null;
        let match : RegExpMatchArray = null;
        let argv : string = process.argv.join(" ");
        name = name.replace(/(.*?)(controller)$/i, '') + extend;
        method = String(method).toUpperCase();
        if (["GET", "POST", "DELETE", "PUT", "HEAD", "PATCH", "OPTIONS"].indexOf(method) == -1) method = "GET";
        match = argv.match(/(\s+(--extend|-e)(=|\s+)?([^\s]+))/i);
        if (match !== null) extend = match[4].replace(/\s+/, '');
        match = argv.match(/(\s+(--path|-p)(=|\s+)?([^\s]+))/i);
        if (match !== null) extendPath = match[4].replace(/\s+/, '');
        return new Promise((resolve, reject) => {
            let def :string[] = [];
            def.push('/**');
            def.push(' * Generated : ' + (new Date()).toISOString());
            def.push(' */');
            def.push('import {Route, Method, Methods} from "../annotations/Annotations";');

            if (extendPath === null) def.push('import {Controller} from "../core/Controller";');
            else def.push(`import {${extend}} from "${extendPath}";`);

            def.push('import {IMainController} from "../interfaces/IMainController";');
            def.push(`@Route("${route}")`);
            def.push(`@Method(Methods.${method.toUpperCase()})`);
            def.push(`export class ${name} extends ${extend} implements IMainController {`);
            def.push('   public main ():void {');
            def.push('       this.httpOk()');
            def.push('   }');
            def.push(`}`);
            fs.writeFile(routes.controllers + path.sep + name + ".ts", def.join("\n"), (err:any) => {
                if (err) reject(err);
                else resolve();
            });
        })
    }

}
