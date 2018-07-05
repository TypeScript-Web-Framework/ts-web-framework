import {Permission, Permissions, Route, Method, Methods} from "../annotations/Annotations";
import {Controller} from "../core/Controller";
import {CryptoService} from "../services/CryptoService";
import {IMainController} from "../interfaces/IMainController";

@Route("")
@Method(Methods.GET)
@Permission(Permissions.READ)
export class IndexController extends Controller implements IMainController {
    public main () {
        this.httpOk();
    }
}
