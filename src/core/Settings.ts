import * as _ from 'lodash';
import * as settings from './../settings.json';

export class Settings {
    static readonly settings : object = settings;
    public static get (path : string, defaultValue?: any):any {
        return this.exists(path) ? _.get(this.settings, path) : defaultValue;
    }
    public static getArray (path:string, defaultValue?: any[]):Array<any> {
        let value : any = this.get(path, defaultValue);
        return Array.isArray(value) ? value : []
    }
    public static getObject (path:string, defaultValue?: object):object {
        let value : any = this.get(path, defaultValue);
        return typeof value === "object" ? value : null
    }
    public static getBoolean (path:string, defaultValue?: boolean):boolean {
        let value :any = this.get(path, defaultValue);
        return value === true || value == false || false;
    }
    public static getString (path:string, defaultValue?: string):string {
        let value :any = this.get(path, defaultValue);
        return typeof value === "string" ? value : "";
    }
    public static getNumber (path:string, defaultValue?: number):number {
        let value :any = this.get(path, defaultValue);
        return typeof value === "number" ? value : 0;
    }
    public static getJson (path:string, defaultValue?: string):object {
        let value :any = this.get(path, defaultValue);
        try {
            value = JSON.stringify(value) || null;
        }
        catch (e) {
            value = null;
        }
        return value;
    }
    public static getDate (path : string, defaultValue: Date):Date {
        let value :any = this.get(path, defaultValue);
        return typeof value === "string" ? (new Date(Date.parse(value))) : defaultValue;
    }
    public static exists (path : string):boolean {
        return _.has(this.settings, path);
    }
}
