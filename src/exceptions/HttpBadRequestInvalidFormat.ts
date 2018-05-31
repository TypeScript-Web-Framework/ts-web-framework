import {HttpBadRequestException} from "./HttpBadRequestException";

export class HttpBadRequestInvalidFormat extends HttpBadRequestException{
    constructor (target : string) {
        super({
            Exception: `Invalid format for "${target}"`
        }, true);
    }
}
