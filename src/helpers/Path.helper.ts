import * as path from 'path';
export class PathHelper {
    public static cwd (defaultValue?: any): string {
        if (PathHelper.isBundled()) return path.dirname(__filename);
        else if (typeof defaultValue !== 'undefined') return path.dirname(defaultValue);
        else return process.cwd();
    }
    public static isBundled (): boolean {
        return path.basename(__filename) === 'bundle.js';
    }
}
