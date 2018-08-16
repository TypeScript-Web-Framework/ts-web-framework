import {Middleware} from "../core/Middleware";
import * as bodyParser from 'body-parser';
import {MiddlewareInject} from "../core/MiddlewareInject";


export class BodyParserMiddleware extends Middleware implements MiddlewareInject {
    public inject ():void {
        this.use(bodyParser.json());
        this.use(bodyParser.urlencoded({
            extended: false
        }));
    }
}
