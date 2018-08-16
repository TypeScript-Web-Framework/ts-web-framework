import { Exception } from '../core/Exception';

export class HttpBadRequestInvalidFormatException extends Exception {
    mesaage = "Invalid formar for target";
    status = 400;
}
