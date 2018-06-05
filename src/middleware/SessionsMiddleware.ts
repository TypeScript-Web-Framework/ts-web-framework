import {MiddlewareInject} from "../core/MiddlewareInject";
import {Middleware} from "../core/Middleware";
import {Settings} from "../core/Settings";
export class SessionsMiddleware extends Middleware implements MiddlewareInject{
    public inject() : void {
        if (Settings.exists("http.security.session")) {
            let session = require('express-session');
            this.use(session({
                name : Settings.getString("http.security.session.name", "session"),
                secret: Settings.getString("http.security.session.secret", "secret"),
                cookie: {
                    maxAge: Settings.getNumber("http.security.session.maxAge",  86400000)
                }
            }));
        }
    }
}
