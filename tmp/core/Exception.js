"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Exception extends Error {
    constructor(message, asJson = true) {
        super((asJson === true ? JSON.stringify(message) : message));
        this.statusCode = 200;
        //Object.setPrototypeOf(this, this.constructor.prototype);
    }
}
exports.Exception = Exception;
