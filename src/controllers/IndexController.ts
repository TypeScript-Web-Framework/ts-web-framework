import {Http, HttpDelete, HttpPost, HttpPut} from "../annotations/Http";
import {Controller} from "../core/Controller";
import {Api} from "../annotations/Api";


@Api
export class IndexController extends Controller {

    @HttpPost("/")
    public create () {
        this.httpCreated();
    }

    @Http("/")
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

    @Http("/bad-request")
    public error () {
        this.httpBadRequest();
    }

    @Http("/bad-unauthorized")
    public unauthorized () {
        this.httpUnauthorized();
    }

    @Http("/forbidden")
    public Forbidden () {
        this.httpForbidden();
    }

}
