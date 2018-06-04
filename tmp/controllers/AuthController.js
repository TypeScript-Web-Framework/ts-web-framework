"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("../core/Controller");
const HttpUnauthorizedException_1 = require("../exceptions/HttpUnauthorizedException");
class AuthController extends Controller_1.Controller {
    beforeEnter() {
        if (!this.hasHeader("x-auth-token"))
            throw new HttpUnauthorizedException_1.HttpUnauthorizedException();
    }
}
exports.AuthController = AuthController;
