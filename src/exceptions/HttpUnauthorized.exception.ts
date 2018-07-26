import {Exception} from "../core/Exception";

export class HttpUnauthorizedException extends Exception {
    public statusCode : number = 401;
    constructor () {
        super ({Exception: "Unauthorized"})
    }
}
