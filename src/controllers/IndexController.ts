import {Permission, Permissions, Route, Method, Methods} from "../annotations/Annotations";
import {AuthController} from "./AuthController";
import {Settings} from "../core/Settings";

@Route("/ok")
@Method(Methods.GET)
@Permission(Permissions.READ)
export class IndexController extends AuthController{
    public main () {
        this.httpOk(Settings.settings);
    }
}
