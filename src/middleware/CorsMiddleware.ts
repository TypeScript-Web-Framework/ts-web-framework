import {Middleware} from "../core/Middleware";
import {MiddlewareInject} from "../core/MiddlewareInject";
import {Settings} from "../core/Settings";


export class CorsMiddleware extends Middleware implements MiddlewareInject {
    public inject () : void {
        if (Settings.exists("http.cors")) {
            let cors = require('cors');
            this.use(cors({
                origin : Settings.getArray("http.cors.origin"),
                method :  Settings.getArray("http.cors.allowedMethods"),
                allowedHeaders: Settings.getArray("http.cors.allowedHeaders"),
                exposedHeaders: Settings.getArray("http.cors.exposedHeaders"),
                credentials : Settings.getBoolean("http.cors.credentials")
            }));
        }
    }
}
