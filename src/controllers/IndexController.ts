import {Permission, Permissions, Route, Method, Methods} from "../annotations/Annotations";
import {Controller} from "../core/Controller";
import {CryptoService} from "../services/CryptoService";
import {IMainController} from "../interfaces/IMainController";

@Route("/index")
@Method(Methods.GET)
@Permission(Permissions.READ)
export class IndexController extends Controller implements IMainController {
    public main () {
        let pass : string = "123456";

        //let cbc_e : string = CryptoService.aes256CbcEncrypt("Hola",pass);
        //let cbc_d : string = CryptoService.aes256CbcDecrypt(cbc_e,pass);

        let ctr_e : string = CryptoService.aes256CtrEncrypt("Hola",pass);
        let ctr_d : string = CryptoService.aes256CtrDecrypt(ctr_e,pass);

        //let gcm_e : string = CryptoService.aes256GcmEncrypt("Hola", pass);
        //let gcm_d : string = CryptoService.aes256GcmDecrypt(gcm_e, pass);


        this.httpOk({
            cbc : {
                //encrypt : cbc_e,
                //decrypt : cbc_d
            },
            ctr : {
                encrypt : ctr_e,
                decrypt : ctr_d
            },
            gcm : {
            //    encrypt : gcm_e,
            //    decrypt : gcm_d
            }
        });
    }
}
