export abstract class Exception {
    public status: number;
    public message: string;
    public isJson: boolean;

    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor (status?: number, message?: string|object, isJson?: boolean) {
        status = status || this.status || 500;
        message = message || this.message || "";
        isJson = isJson || this.isJson || false;
        const error: any = {
            status,
            message,
            isJson
        };
        throw new Error(JSON.stringify(error));
    }
}
