import {Exception} from "../core/Exception";

export class HttpBadRequestException extends Exception{
    public statusCode : number = 400;
}
