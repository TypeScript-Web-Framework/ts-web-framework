import {MiddlewareInject} from "../core/MiddlewareInject";
import {Middleware} from "../core/Middleware";
import {Manifiest} from "../core/Manifiest";
export class SessionsMiddleware extends Middleware implements MiddlewareInject{
    public inject() : void {
        if (Manifiest.exists("http.security.session")) {
            let session = require('express-session');
            this.use(session({
                name : Manifiest.getString("http.security.session.name", "session"),
                secret: Manifiest.getString("http.security.session.secret", "secret"),
                cookie: {
                    maxAge: Manifiest.getNumber("http.security.session.maxAge",  86400000)
                }
            }));
        }
    }
}
