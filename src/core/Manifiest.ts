import * as _ from 'lodash';
import { PathHelper } from '../helpers/Path.helper';
export class Manifiest {
    static readonly json: any = JSON.parse(require('fs')
        .readFileSync(PathHelper.cwd(__dirname) + '/manifiest.json', 'utf8'));

    public static get (path: string, defaultValue?: any): any {
        return this.exists(path) ? _.get(this.json, path) : defaultValue;
    }
    public static getArray (path: string, defaultValue?: any[]): any[] {
        let value: any = this.get(path, defaultValue);
        return Array.isArray(value) ? value : [];
    }
    // noinspection JSUnusedGlobalSymbols
    public static getObject (path: string, defaultValue?: object): object {
        let value: any = this.get(path, defaultValue);
        return typeof value === 'object' ? value : null;
    }
    public static getBoolean (path: string, defaultValue?: boolean): boolean {
        let value: any = this.get(path, typeof defaultValue === 'undefined' ? false : defaultValue);
        return value === true;
    }
    public static getString (path: string, defaultValue?: string): string {
        let value: any = this.get(path, defaultValue);
        return typeof value === 'string' ? value : '';
    }
    public static getNumber (path: string, defaultValue?: number): number {
        let value: any = this.get(path, defaultValue);
        return typeof value === 'number' ? value : 0;
    }
    // noinspection JSUnusedGlobalSymbols
    public static getJson (path: string, defaultValue?: string): object {
        let value: any = this.get(path, defaultValue);
        try {
            value = JSON.stringify(value) || null;
        }
        catch (e) {
            value = null;
        }
        return value;
    }
    // noinspection JSUnusedGlobalSymbols
    public static getDate (path: string, defaultValue: Date): Date {
        let value: any = this.get(path, defaultValue);
        return typeof value === 'string' ? (new Date(Date.parse(value))) : defaultValue;
    }
    public static exists (path: string): boolean {
        return _.has(this.json, path);
    }
    // noinspection JSUnusedGlobalSymbols
    public static equalTo (path: string, equalTo: any, strictMode = false): boolean {
        if (strictMode === true) return Manifiest.get(path) === equalTo;
        // noinspection TsLint
        return Manifiest.get(path) == equalTo;
    }
    // noinspection JSUnusedGlobalSymbols
    public static comapareTo (path: string, pathToCompare: any, strictMode = false): boolean {
        if (strictMode === true) return Manifiest.get(path) === Manifiest.get(pathToCompare);
        // noinspection TsLint
        return Manifiest.get(path) == Manifiest.get(pathToCompare);
    }
}
