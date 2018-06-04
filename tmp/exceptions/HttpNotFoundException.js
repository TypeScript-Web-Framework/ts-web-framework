"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception_1 = require("../core/Exception");
class HttpNotFoundException extends Exception_1.Exception {
    constructor() {
        super({ Exception: "Not Found" }, true);
        this.statusCode = 404;
    }
}
exports.HttpNotFoundException = HttpNotFoundException;
