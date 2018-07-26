import { Http, HttpDelete, HttpGet, HttpPost, HttpPut } from "../../annotations/Http";
import {Controller} from "../../core/Controller";
import {Api} from "../../annotations/Api";
import { HttpExpect } from '../../annotations/HttpExpect';

@Api('/test/')
export class IndexController extends Controller {

    @HttpPost("/")
    public create () {
        this.httpCreated();
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
        this.httpNoContent();
    }

    @Http("/bad-request")
    public error () {
        this.httpBadRequest();
    }

    @Http("/unauthorized")
    public unauthorized () {
        this.httpUnauthorized();
    }

    @Http("/forbidden")
    public forbidden () {
        this.httpForbidden();
    }

    @Http("/not-found")
    public notFound () {
        this.httpNotFound();
    }

    @Http("/internal-server-error")
    public internalServerError () {
        this.httpInternalServerError();
    }


    @Http("/http-expect/:username")
    @HttpExpect({
        username : {
            in: 'path',
            type: String,
            required: true
        }
    })
    public expectPath () {
        this.httpOk();
    }

    @Http("/http-expect-query-string")
    @HttpExpect({
        search : {
            in: 'query',
            type: String,
            required: true
        }
    })
    public expectQueryString () {
        this.httpOk();
    }

    @HttpPost("/http-expect-body")
    @HttpExpect({
        email : {
            in: 'body',
            type: String,
            required: true
        }
    })
    public expectJsonKey () {
        this.httpOk();
    }


    @Http("/http-expect-cookie")
    @HttpExpect({
        _ga : {
            in: 'cookie',
            type: String,
            required: true
        }
    })
    public expectCookie() {
        this.httpOk();
    }


    @Http("/http-expect-header")
    @HttpExpect({
        'x-auth-token' : {
            in: 'header',
            type: String,
            required: true
        }
    })
    public expectHeader() {
        this.httpOk();
    }

    @Http("/http-expect-simple")
    @HttpExpect({
        name : String // expect 'name' in 'query' by default undefined and optional
    })
    public expectSimple() {
        this.httpOk(this.queryString().name);
    }

    @HttpPost("/http-expect-multiple")
    @HttpExpect({
        'x-auth-token' : {type: String, in: 'header', required: true},
        fullname : {type: String, in: 'query', required: true},
        age : {type: Number, in: 'body', required: true},
        _ga : {type: String, in: 'cookie', required: true}
    })
    public expectMultiple() {
        this.httpOk({
            headers: this.header(),
            queryString: this.queryString(),
            body: this.bodyAsJson(),
        });
    }
    @HttpExpect({
        example : {type: String, in: 'body', required: true}
    })
    @HttpPost("/http-expect-x-www-form-urlencoded")
    public formData() {
        return this.httpOk();
    }

    @HttpExpect({
        example : {type: Object, in: 'body', required: true}
    })
    @HttpPost("/http-expect-application-json")
    public applicationJson() {
        return this.httpOk();
    }

    @HttpExpect({
        'content-type' : {
            in: 'header',
            required: true,
            validate: (value:string): boolean => /application\/json/g.test(value),
            message : 'Only accept application/json as content-type'
        }
    })
    @Http("/http-expect-content-type")
    public contentType() {
        return this.httpOk();
    }

}
