import { Exception } from '../core/Exception';

export class HttpNotFoundException extends Exception {
    public status = 404;
    message = "Not Found";
}
