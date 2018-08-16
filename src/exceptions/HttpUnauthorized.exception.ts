import { Exception } from '../core/Exception';

export class HttpUnauthorizedException extends Exception {
    public status = 401;
    message = "Unauthorized";
}
