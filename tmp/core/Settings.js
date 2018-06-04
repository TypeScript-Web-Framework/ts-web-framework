"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class Settings {
    static get(path, defaultValue) {
        return this.exists(path) ? _.get(this.settings, path) : defaultValue;
    }
    static getArray(path, defaultValue) {
        let value = this.get(path, defaultValue);
        return Array.isArray(value) ? value : [];
    }
    static getObject(path, defaultValue) {
        let value = this.get(path, defaultValue);
        return typeof value === "object" ? value : null;
    }
    static getBoolean(path, defaultValue) {
        let value = this.get(path, typeof defaultValue === "undefined" ? false : defaultValue);
        return value === true || value == false || false;
    }
    static getString(path, defaultValue) {
        let value = this.get(path, defaultValue);
        return typeof value === "string" ? value : "";
    }
    static getNumber(path, defaultValue) {
        let value = this.get(path, defaultValue);
        return typeof value === "number" ? value : 0;
    }
    static getJson(path, defaultValue) {
        let value = this.get(path, defaultValue);
        try {
            value = JSON.stringify(value) || null;
        }
        catch (e) {
            value = null;
        }
        return value;
    }
    static getDate(path, defaultValue) {
        let value = this.get(path, defaultValue);
        return typeof value === "string" ? (new Date(Date.parse(value))) : defaultValue;
    }
    static exists(path) {
        return _.has(this.settings, path);
    }
    static equalTo(path, equalTo, strictMode = false) {
        if (strictMode === true)
            return Settings.get(path) === equalTo;
        return Settings.get(path) == equalTo;
    }
    static comapareTo(path, pathToCompare, strictMode = false) {
        if (strictMode === true)
            return Settings.get(path) === Settings.get(pathToCompare);
        return Settings.get(path) == Settings.get(pathToCompare);
    }
}
Settings.settings = JSON.parse(require('fs').readFileSync('./src/settings.json', 'utf8'));
exports.Settings = Settings;
