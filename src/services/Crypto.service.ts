import * as crypto from 'crypto';
import { Manifiest } from '../core/Manifiest';
export class CryptoService {
    // Encrypt a password with manifiest salt
    public static passwordEncrypt (password: string): string {
        if (!Manifiest.exists('salt')) throw new Error('salt key dont exists on manifiest.json');
        return CryptoService.aes256Encrypt('aes-256-gcm', password, Manifiest.getString('salt'));
    }
    // Decrypt a password with manifiest salt
    public static passwordDecrypt (password: string): string {
        if (!Manifiest.exists('salt')) throw new Error('salt key dont exists on manifiest.json');
        return CryptoService.aes256Decrypt('aes-256-gcm', password, Manifiest.getString('salt'));
    }

    public static hmac (key: string, text: string, algorithm = 'sha1'): string {
        return crypto.createHmac(algorithm, key).update(text).digest('hex');
    }
    public static hmacSha1 (key: string, text: string): string {
        return CryptoService.hmac(key, text, 'sha1');
    }
    public static hmacSha256 (key: string, text: string): string {
        return CryptoService.hmac(key, text, 'sha256');
    }
    public static hmacSha512 (key: string, text: string): string {
        return CryptoService.hmac(key, text, 'sha512');
    }
    public static sha1 (value: string): string {
        return crypto.createHash('sha1').update(value).digest('hex');
    }
    public static sha256 (value: string): string {
        return crypto.createHash('sha256').update(value).digest('hex');
    }
    public static sha512 (value: string): string {
        return crypto.createHash('sha512').update(value).digest('hex');
    }
    public static md5 (value: string): string {
        return crypto.createHash('md5').update(value).digest('hex');
    }
    public static checkSum (value: string, algorithm = 'sha1'): string {
        return crypto
            .createHash(algorithm || 'md5')
            .update(value, 'utf8')
            .digest('hex');
    }
    public static aes256Encrypt (mode: 'aes-256-ctr'|'aes-256-cbc'|'aes-256-gcm'|'aes-256-ccm', value: string|Buffer, masterkey: string|Buffer): string {
        if (value instanceof Buffer) value = value.toString('utf8');
        if (!(masterkey instanceof Buffer)) masterkey = Buffer.from(masterkey, 'utf8');
        // random initialization vector
        const iv = crypto.randomBytes(16);
        // random salt
        const salt = crypto.randomBytes(64);
        // derive key: 32 byte key length - in assumption the masterkey is a cryptographic and NOT a password there is no need for
        // a large number of iterations. It may can replaced by HKDF
        const key = crypto.pbkdf2Sync(masterkey, salt, 2145, 32, 'sha512');
        // AES 256 GCM Mode
        const cipher: any = crypto.createCipheriv(mode, key, iv);
        // encrypt the given text
        const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
        // extract the auth tag
        const tag = cipher.getAuthTag();
        // generate output
        return Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
    }
    public static aes256Decrypt (mode: 'aes-256-ctr'|'aes-256-cbc'|'aes-256-gcm'|'aes-256-ccm', value: string|Buffer, masterkey: string|Buffer): string {
        if (value instanceof Buffer) value = value.toString('utf8');
        if (!(masterkey instanceof Buffer)) masterkey = Buffer.from(masterkey, 'utf8');
        // base64 decoding
        const bData = Buffer.from(value, 'base64');
        // convert data to buffers
        const salt = bData.slice(0, 64);
        const iv = bData.slice(64, 80);
        const tag = bData.slice(80, 96);
        const text = bData.slice(96);
        // derive key using; 32 byte key length
        const key = crypto.pbkdf2Sync(masterkey, salt , 2145, 32, 'sha512');
        // AES 256 GCM Mode
        const decipher: any = crypto.createDecipheriv(mode, key, iv);
        decipher.setAuthTag(tag);
        // encrypt the given text
        return  decipher.update(text, 'binary', 'utf8') + decipher.final('utf8');

    }
}
