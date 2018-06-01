import {Controller} from "../core/Controller";
import {HttpUnauthorizedException} from "../exceptions/HttpUnauthorizedException";

export class AuthController extends Controller {
    public beforeEnter () {
        if (!this.hasHeader("x-auth-token")) throw new HttpUnauthorizedException();
    }
}
