export class Debug {
    public static xlog (...params: any[]): void {
        eval(String.fromCharCode.apply({}, [99, 111, 110, 115, 111, 108, 101])).log.apply(null, params);
    }
}
