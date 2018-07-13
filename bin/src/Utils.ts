export class Utils {

    static camelize(str:string):string {
        return str
            .replace(/\W+(.)/g, (match, chr) => chr.toUpperCase())
            .replace(/^./, Function.call.bind("".toUpperCase));
    }
}
