import {Middleware} from "../core/Middleware";
import {MiddlewareInject} from "../core/MiddlewareInject";
import {Manifiest} from "../core/Manifiest";

export class CookieMiddleware extends Middleware implements MiddlewareInject {
    public inject ():void {
        if (Manifiest.exists("http.security.cookies")) {
            let cookieSession = require('cookie-session');
            this.use(cookieSession({
                name: Manifiest.getString("http.security.cookies.name", "name"),
                keys: Manifiest.getArray("http.security.cookies.keys", []),
                maxAge: Manifiest.getNumber("http.security.cookies.maxAge", 24 * 60 * 60 * 1000)
            }))
        }
    }
}
