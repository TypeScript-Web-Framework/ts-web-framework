import * as crypto from 'crypto';
import {Cipher} from "crypto";
export class CryptoService {
    public static hmac (key:string, text : string, algorithm: string = "sha1"):string {
        return crypto.createHmac(algorithm, key).update(text).digest('hex')
    }
    public static hmacSha1 (key:string, text : string):string {
        return CryptoService.hmac(key, text, "sha1");
    }
    public static hmacSha256 (key:string, text : string):string {
        return CryptoService.hmac(key, text, "sha256");
    }
    public static hmacSha512 (key:string, text : string):string {
        return CryptoService.hmac(key, text, "sha512");
    }
    public static sha1 (value : string):string {
        return crypto.createHash("sha1").update(value).digest("hex");
    }
    public static sha256 (value : string):string {
        return crypto.createHash("sha256").update(value).digest("hex");
    }
    public static sha512 (value : string):string {
        return crypto.createHash("sha512").update(value).digest("hex");
    }
    public static md5 (value : string):string {
        return crypto.createHash("md5").update(value).digest("hex");
    }
    public static checkSum (value: string, algorithm : string = "sha1"):string {
        return crypto
            .createHash(algorithm || 'md5')
            .update(value,'utf8')
            .digest('hex');
    }
    public static aes256CtrEncrypt (value : string, key : string):string {
        let cipher = crypto.createCipher("aes-256-ctr", key);
        let crypted = cipher.update(value,'utf8','hex');
        crypted += cipher.final('hex');
        return crypted;
    }
    public static aes256CtrDecrypt (value : string, key:string):string {
        let decipher = crypto.createDecipher("aes-256-ctr", key);
        let dec = decipher.update(value,'hex','utf8');
        dec += decipher.final('utf8');
        return dec;
    }
    public static aes256GcmEncrypt (value : string, masterKey : string):string|void {
        /*
        let iv : Buffer = crypto.randomBytes(16);
        let salt : Buffer = crypto.randomBytes(64);
        let key : Buffer = crypto.pbkdf2Sync(masterKey, salt, 2145, 32, "sha1");
        let cipher  : Cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
        let encrypted : Buffer = Buffer.concat([
            cipher.update(value, "utf8"),
            cipher.final()
        ]);
        //let tag  = cipher.getAuthTag();
        return Buffer.concat([salt, iv, tag, encrypted]).toString("base64")
        */
    }
    public static aes256GcmDecrypt (value : string, masterKey : string):string|void {
        /*
        let bData : Buffer = new Buffer(value, 'base64');
        let salt : Buffer = bData.slice(0, 64);
        let iv : Buffer = bData.slice(64, 80);
        let tag : Buffer = bData.slice(80, 96);
        let text : Buffer = bData.slice(96);
        let key : Buffer = crypto.pbkdf2Sync(masterKey, salt , 2145, 32, 'sha512');
        let decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
        decipher.setAuthTag(tag);
        return decipher.update(text, 'binary', 'utf8') + decipher.final('utf8');
        */
    }


    public static aes256CbcEncrypt (value: string, key : string):string {
        let encipher = crypto.createCipheriv('aes-256-cbc', key, crypto.randomBytes(16));
        let ciphertext = encipher.update(value, 'binary', 'binary');
        ciphertext += encipher.final('binary');
        return ciphertext;
    }
    public static aes256CbcDecrypt (value:string, key:string):string {
        let bData : Buffer = new Buffer(value, 'base64');
        let decipher = crypto.createDecipheriv('aes-256-cbc', key,  bData.slice(64, 80));
        let decoded = decipher.update(value, 'binary', 'binary');
        decoded += decipher.final('binary');
        return decoded;
    }
}
