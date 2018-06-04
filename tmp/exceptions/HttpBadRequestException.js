"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception_1 = require("../core/Exception");
class HttpBadRequestException extends Exception_1.Exception {
    constructor() {
        super(...arguments);
        this.statusCode = 400;
    }
}
exports.HttpBadRequestException = HttpBadRequestException;
