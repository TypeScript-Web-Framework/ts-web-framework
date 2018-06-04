"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpBadRequestException_1 = require("./HttpBadRequestException");
class HttpBadRequestInvalidFormat extends HttpBadRequestException_1.HttpBadRequestException {
    constructor(target) {
        super({
            Exception: `Invalid format for "${target}"`
        }, true);
    }
}
exports.HttpBadRequestInvalidFormat = HttpBadRequestInvalidFormat;
