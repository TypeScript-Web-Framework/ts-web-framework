import { Exception } from '../core/Exception';

export class HttpBadRequestException extends Exception {
    status = 400;
    message = "Bad Request";
}
