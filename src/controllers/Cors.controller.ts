import {Controller} from "../core/Controller";
import {Request, Response} from "express-serve-static-core";

export class CorsController extends Controller {
    public constructor (public request: Request, public response : Response) {
        super(request, response);
    }
}
