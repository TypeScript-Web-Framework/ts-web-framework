"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Metadata_1 = require("../services/Metadata");
const rxjs_1 = require("rxjs");
class Controller {
    constructor(request, response) {
        this.request = request;
        this.response = response;
        this.hasBadRequest = null;
        let attrs = Metadata_1.Metadata.getAttributes(this.constructor.prototype);
        for (let key in attrs.queryParams) {
            let element = attrs.queryParams[key];
            let value = this.request.query[key];
            if (attrs.queryParams[key].required === true && !(key in this.request.query)) {
                this.hasBadRequest = `required "${key}" as query string param`;
                break;
            }
            else {
                if (element.validator instanceof RegExp && !element.validator.test(value)) {
                    this.hasBadRequest = `Invalid format for '"${key}"'.`;
                    break;
                }
                if (element.type === "date")
                    this.request.query[key] = new Date(Date.parse(this.request.query[key]));
                if (element.type === "integer")
                    this.request.query[key] = parseInt(this.request.query[key]);
                if (element.type === "float")
                    this.request.query[key] = parseFloat(this.request.query[key]);
                if (element.type === "json")
                    this.request.query[key] = JSON.parse(this.request.query[key]);
                if (element.type === "decode:json")
                    this.request.query[key] = JSON.parse(decodeURIComponent(this.request.query[key]));
            }
        }
        if (this.hasBadRequest === null) {
            try {
                let onEnter = this.beforeEnter();
                if (onEnter instanceof rxjs_1.Observable)
                    onEnter = onEnter.toPromise();
                if (onEnter instanceof Promise) {
                    onEnter
                        .then(() => this.main())
                        .catch(e => this.httpBadRequest(e.toString()));
                }
                else
                    this.main();
            }
            catch (error) {
                this.httpBadRequest(error);
            }
        }
        else
            this.httpBadRequest({
                error: this.hasBadRequest
            });
    }
    beforeEnter() { }
    afterEnter() { }
    main() {
        if (this.hasBadRequest !== null)
            return this.httpBadRequest({ error: this.hasBadRequest });
        return this.httpOk();
    }
    end(statusCode, data, asJson) {
        if (this.response.headersSent)
            return;
        if (statusCode !== undefined)
            this.response.status(statusCode);
        if (data != undefined && data !== null) {
            if (asJson === true) {
                this.response.json(data);
                this.response.end();
                return;
            }
            else {
                if (typeof data !== "undefined" && data !== null) {
                    if (typeof data === "object")
                        data = JSON.stringify(data);
                    else if (Number.isInteger(data))
                        data = data.toString();
                    else if (Number(data) === data && data % 1 !== 0)
                        data = data.toString();
                    this.response.write(data);
                }
                else
                    this.response.json(data);
            }
        }
        this.response.end();
    }
    params(...args) {
        if (args.length > 0) {
            return new Promise((resolve, reject) => {
                if (args[0] in this.request.params)
                    resolve(this.request.params[args[0]]);
                else if (args.length > 1)
                    resolve(args[1]);
                else
                    reject();
            });
        }
        return this.request.params || {};
    }
    header(...args) {
        if (args.length > 0) {
            return new Promise((resolve, reject) => {
                if (args[0] in this.request.headers)
                    resolve(this.request.headers[args[0]]);
                else if (args.length > 1)
                    resolve(args[1]);
                else
                    reject();
            });
        }
        return this.request.params || {};
    }
    queryString(...args) {
        if (args.length > 0) {
            return new Promise((resolve, reject) => {
                if (args[0] in this.request.query)
                    resolve(this.request.query[args[0]]);
                else if (args.length > 1)
                    resolve(args[1]);
                else
                    reject();
            });
        }
        return this.request.query || {};
    }
    hasQueryString(key) {
        return key !== undefined && key !== null && key in this.request.query;
    }
    hasParam(key) {
        return key !== undefined && key !== null && key in this.request.params;
    }
    hasQuery(key) {
        return key !== undefined && key !== null && key in this.request.query;
    }
    hasHeader(key) {
        return key !== undefined && key !== null && key in this.request.headers;
    }
    httpOk(data, asJson = true) {
        this.end(200, data, asJson);
    }
    httpCreated(data, asJson = true) {
        this.end(201, data, asJson);
    }
    httpAccepted(data, asJson = true) {
        this.end(201, data, asJson);
    }
    httpNotFound(data, asJson = true) {
        this.end(404, data, asJson);
    }
    httpBadRequest(data, asJson = true) {
        console.log("BAD REQUEST", data);
        this.end(400, data, asJson);
    }
    httpUnauthorized(data, asJson = true) {
        this.end(401, data, asJson);
    }
    httpForbidden(data, asJson = true) {
        this.end(403, data, asJson);
    }
    httpMethodNotAllowed(data, asJson = true) {
        this.end(405, data, asJson);
    }
    httpRedirect(uri, permanently) {
        if (permanently === true)
            this.response.redirect(301, uri);
        else
            this.response.redirect(uri);
        this.response.end();
    }
}
exports.Controller = Controller;
