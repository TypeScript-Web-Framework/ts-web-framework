import * as crypto from 'crypto';
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
