import {Middleware} from "../core/Middleware";
import {MiddlewareInject} from "../core/MiddlewareInject";

export class CookieParserMiddleware extends Middleware implements MiddlewareInject {
    public inject (): void {
        this.app.use(require('cookie-parser')());
    }
}
