import {Controller} from "../core/Controller";
import {BeforeEnterController} from "../interfaces/BeforeEnterController";

export class CorsController extends Controller implements BeforeEnterController {
    public beforeEnter () {
    }
}
