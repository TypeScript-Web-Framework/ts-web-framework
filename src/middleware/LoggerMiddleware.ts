import {Middleware} from "../core/Middleware";
import {MiddlewareInject} from "../core/MiddlewareInject";
import * as logger from 'morgan';

export class LoggerMiddleware extends Middleware implements MiddlewareInject {
    public inject ():void {
        this.use(logger('dev'));
    }
}
