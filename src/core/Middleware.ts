import * as express from 'express';
export class Middleware {
    public constructor (public app : express.Application) {
        if ('inject' in this) (<any>this).inject.apply(this, []);
    }
    public use (middleware:any):any {
        return this.app.use(middleware);
    }
}
