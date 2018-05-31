import {Controller} from "../core/Controller";
import {Permission, Permissions, Uri, Method, Methods} from "../annotations/Annotations";

@Uri("/")
@Method(Methods.GET)
@Permission(Permissions.READ)
export class IndexController extends Controller {
    public main () {
        this.httpOk();
    }
}
