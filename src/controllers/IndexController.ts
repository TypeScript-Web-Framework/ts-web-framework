import {HttpDelete, HttpGet, HttpPost, HttpPut} from "../annotations/Http";
import {Controller} from "../core/Controller";
import {IMainController} from "../interfaces/IMainController";
import {Api} from "../annotations/Api";


@Api
export class IndexController extends Controller implements IMainController {

    @HttpPost("/")
    public create () {
        this.httpOk();
    }

    @HttpGet("/")
    public read () {
        this.httpOk();
    }

    @HttpPut("/")
    public update () {
        this.httpOk();
    }

    @HttpDelete("/")
    public delete () {
        this.httpOk();
    }

}
