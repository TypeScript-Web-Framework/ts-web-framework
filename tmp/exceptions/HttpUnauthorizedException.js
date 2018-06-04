"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception_1 = require("../core/Exception");
class HttpUnauthorizedException extends Exception_1.Exception {
    constructor() {
        super({ Exception: "Unauthorized" });
        this.statusCode = 401;
    }
}
exports.HttpUnauthorizedException = HttpUnauthorizedException;
