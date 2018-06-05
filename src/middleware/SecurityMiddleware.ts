import {Middleware} from "../core/Middleware";
import {MiddlewareInject} from "../core/MiddlewareInject";
import {Settings} from "../core/Settings";
import * as helmet from "helmet";

export class SecurityMiddleware extends Middleware implements MiddlewareInject{
    public inject () : void {
        if (Settings.exists("http.security.xss")) {
            this.use(helmet.xssFilter(<any>{
                setOnOldIE: Settings.get("http.security.xss.setOnOldIE"),
                reportUri: Settings.get("http.security.xss.reportUri")
            }));
        }
        if (Settings.exists("http.security.contentSecurityPolicy")) {
            this.use(helmet.contentSecurityPolicy({
                directives: {
                    defaultSrc: Settings.get("http.security.contentSecurityPolicy.defaultSrc"),
                    styleSrc:  Settings.get("http.security.contentSecurityPolicy.styleSrc")
                }
            }))
        }
        if (Settings.exists("http.security.xPoweredBy")) {
            let xPoweredBy : any = Settings.get("http.security.xPoweredBy", false);
            if (xPoweredBy === false) this.app.disable('x-powered-by');
            else {
                this.use(helmet.hidePoweredBy({
                    setTo : xPoweredBy
                }));
            }
        }
        if (!Settings.getBoolean("http.security.csrf")) this.use(require("csurf")({ cookie: true }));
        if (Settings.exists("http.security.expectCt")) {
            this.use(helmet.expectCt({
                enforce: Settings.getBoolean("http.security.expectCt.enforce"),
                maxAge: Settings.get("http.security.expectCt.maxAge", 120),
                reportUri: Settings.get("http.security.expectCt.maxAge")
            }))
        }
        if (Settings.exists("http.security.dnsPrefetchControl")) {
            this.use(helmet.dnsPrefetchControl({
                allow: Settings.getBoolean("http.security.dnsPrefetchControl.allow")
            }))
        }
        if (Settings.exists("http.security.frameGuard")) {
            this.use(helmet.frameguard({
                action: Settings.get("http.security.frameGuard.action"),
                domain: Settings.get("http.security.frameGuard.domain")
            }))
        }
        if (Settings.exists("http.security.HTTPPublicKeyPinning")) {
            this.use(helmet.hpkp({
                maxAge: Settings.get("http.security.HTTPPublicKeyPinning.maxAge"),
                sha256s: Settings.get("http.security.HTTPPublicKeyPinning.sha256s"),
                includeSubdomains: Settings.get("http.security.HTTPPublicKeyPinning.includeSubdomains"),
                reportUri: Settings.get("http.security.HTTPPublicKeyPinning.reportUri"),
                reportOnly: Settings.get("http.security.HTTPPublicKeyPinning.reportOnly")
            }))
        }
        if (Settings.exists("http.security.StrictTransportSecurity")) {
            this.use(helmet.hsts({
                maxAge: Settings.get("http.security.StrictTransportSecurity.maxAge"),
                preload: Settings.get("http.security.StrictTransportSecurity.preload"),
            }))
        }
        if (Settings.exists("http.security.ieNoOpen")) {
            this.use(helmet.ieNoOpen());
        }
        if (Settings.exists("http.security.noCache")) {
            this.use(helmet.noCache());
        }
        if (Settings.exists("http.security.noSniff")) {
            this.use(helmet.noSniff());
        }
        if (Settings.exists("http.security.referrerPolicy")) {
            this.use(helmet.referrerPolicy({
                policy : Settings.get("http.security.referrerPolicy.policy")
            }));
        }
    }
}
