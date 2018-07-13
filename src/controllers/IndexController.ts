import {Action} from "../annotations/Action";
import {Controller} from "../core/Controller";
import {IMainController} from "../interfaces/IMainController";
import {Methods, Route} from "../annotations/Annotations";
import {Method} from "../annotations/Method";


@Route("")
@Method(Methods.GET)
export class IndexController extends Controller implements IMainController {

    @Action("/person/:id", "GET")
    public main () {
        this.httpOk();
    }
}
