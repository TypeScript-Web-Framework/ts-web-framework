import {Permission, Permissions, Route, Method, Methods} from "../annotations/Annotations";
import {AuthController} from "./AuthController";
import {Settings} from "../core/Settings";
import {Controller} from "../core/Controller";

@Route("/index")
@Method(Methods.GET)
@Permission(Permissions.READ)
export class IndexController extends Controller {
    public main () {
        this.httpOk(Settings.settings);
    }
}
