import {Middleware} from "../core/Middleware";
import {MiddlewareInject} from "../core/MiddlewareInject";
import {Settings} from "../core/Settings";

export class CookieMiddleware extends Middleware implements MiddlewareInject {
    public inject ():void {
        if (Settings.exists("http.security.cookies")) {
            let cookieSession = require('cookie-session');
            this.use(cookieSession({
                name: Settings.getString("http.security.cookies.name", "name"),
                keys: Settings.getArray("http.security.cookies.keys", []),
                maxAge: Settings.getNumber("http.security.cookies.maxAge", 24 * 60 * 60 * 1000)
            }))
        }
    }
}
