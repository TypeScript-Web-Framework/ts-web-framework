import {Exception} from "../core/Exception";

export class HttpNotFoundException extends Exception {
    public statusCode : number = 404;
    constructor () {
        super ({Exception: "Not Found"}, true)
    }
}
