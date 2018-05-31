export class Exception extends Error {
    public statusCode : number = 200;
    constructor (message : string|object, asJson : boolean = false) {
        super((asJson === true ? JSON.stringify(message) : message) as string);
        Object.setPrototypeOf(this, this.constructor.prototype);
    }
}
