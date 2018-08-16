import {Middleware} from "../core/Middleware";
import {MiddlewareInject} from "../core/MiddlewareInject";
import {Manifiest} from "../core/Manifiest";
import * as helmet from "helmet";

export class SecurityMiddleware extends Middleware implements MiddlewareInject{
    public inject () : void {
        if (Manifiest.exists("http.security.xss")) {
            this.use(helmet.xssFilter(<any>{
                setOnOldIE: Manifiest.get("http.security.xss.setOnOldIE"),
                reportUri: Manifiest.get("http.security.xss.reportUri")
            }));
        }
        if (Manifiest.exists("http.security.contentSecurityPolicy")) {
            this.use(helmet.contentSecurityPolicy({
                directives: {
                    defaultSrc: Manifiest.get("http.security.contentSecurityPolicy.defaultSrc"),
                    styleSrc:  Manifiest.get("http.security.contentSecurityPolicy.styleSrc")
                }
            }))
        }
        if (Manifiest.exists("http.security.xPoweredBy")) {
            let xPoweredBy : any = Manifiest.get("http.security.xPoweredBy", false);
            if (xPoweredBy === false) this.app.disable('x-powered-by');
            else {
                this.use(helmet.hidePoweredBy({
                    setTo : xPoweredBy
                }));
            }
        }
        if (!Manifiest.getBoolean("http.security.csrf")) this.use(require("csurf")({ cookie: true }));
        if (Manifiest.exists("http.security.expectCt")) {
            this.use(helmet.expectCt({
                enforce: Manifiest.getBoolean("http.security.expectCt.enforce"),
                maxAge: Manifiest.get("http.security.expectCt.maxAge", 120),
                reportUri: Manifiest.get("http.security.expectCt.maxAge")
            }))
        }
        if (Manifiest.exists("http.security.dnsPrefetchControl")) {
            this.use(helmet.dnsPrefetchControl({
                allow: Manifiest.getBoolean("http.security.dnsPrefetchControl.allow")
            }))
        }
        if (Manifiest.exists("http.security.frameGuard")) {
            this.use(helmet.frameguard({
                action: Manifiest.get("http.security.frameGuard.action"),
                domain: Manifiest.get("http.security.frameGuard.domain")
            }))
        }
        if (Manifiest.exists("http.security.HTTPPublicKeyPinning")) {
            this.use(helmet.hpkp({
                maxAge: Manifiest.get("http.security.HTTPPublicKeyPinning.maxAge"),
                sha256s: Manifiest.get("http.security.HTTPPublicKeyPinning.sha256s"),
                includeSubdomains: Manifiest.get("http.security.HTTPPublicKeyPinning.includeSubdomains"),
                reportUri: Manifiest.get("http.security.HTTPPublicKeyPinning.reportUri"),
                reportOnly: Manifiest.get("http.security.HTTPPublicKeyPinning.reportOnly")
            }))
        }
        if (Manifiest.exists("http.security.StrictTransportSecurity")) {
            this.use(helmet.hsts({
                maxAge: Manifiest.get("http.security.StrictTransportSecurity.maxAge"),
                preload: Manifiest.get("http.security.StrictTransportSecurity.preload"),
            }))
        }
        if (Manifiest.exists("http.security.ieNoOpen")) {
            this.use(helmet.ieNoOpen());
        }
        if (Manifiest.exists("http.security.noCache")) {
            this.use(helmet.noCache());
        }
        if (Manifiest.exists("http.security.noSniff")) {
            this.use(helmet.noSniff());
        }
        if (Manifiest.exists("http.security.referrerPolicy")) {
            this.use(helmet.referrerPolicy({
                policy : Manifiest.get("http.security.referrerPolicy.policy")
            }));
        }
    }
}
