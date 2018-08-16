import { Exception } from '../core/Exception';

export class HttpInternalServerErrorException extends Exception {
    status = 500;
    message = "Internal Server Error";
}
