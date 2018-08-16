import {Controller} from "../core/Controller";
import {HttpUnauthorizedException} from "../exceptions/HttpUnauthorized.exception";

export abstract class AuthController extends Controller {
    public _before () {
        if (!this.hasHeader("x-auth-token")) throw new HttpUnauthorizedException();
    }
}
