import {Middleware} from "../core/Middleware";
import {MiddlewareInject} from "../core/MiddlewareInject";
import {Manifiest} from "../core/Manifiest";


export class CorsMiddleware extends Middleware implements MiddlewareInject {
    public inject () : void {
        if (Manifiest.exists("http.cors")) {
            let cors = require('cors');
            this.use(cors({
                origin : Manifiest.getArray("http.cors.origin"),
                method :  Manifiest.getArray("http.cors.allowedMethods"),
                allowedHeaders: Manifiest.getArray("http.cors.allowedHeaders"),
                exposedHeaders: Manifiest.getArray("http.cors.exposedHeaders"),
                credentials : Manifiest.getBoolean("http.cors.credentials")
            }));
        }
    }
}
