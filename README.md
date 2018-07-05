[![Known Vulnerabilities](https://snyk.io/test/github/olaferlandsen/typescript-http-framework-mvc/badge.svg?targetFile=package.json)](https://snyk.io/test/github/olaferlandsen/typescript-http-framework-mvc?targetFile=package.json)
[![dependencies Status](https://david-dm.org/olaferlandsen/typescript-http-framework-mvc/status.svg)](https://david-dm.org/olaferlandsen/typescript-http-framework-mvc)
[![devDependencies Status](https://david-dm.org/olaferlandsen/typescript-http-framework-mvc/dev-status.svg)](https://david-dm.org/olaferlandsen/typescript-http-framework-mvc?type=dev)
[![Build status](https://ci.appveyor.com/api/projects/status/q6cpofnt1ajm2npx?svg=true)](https://ci.appveyor.com/project/olaferlandsen/typescript-http-framework-mvc)
[![Maintainability](https://api.codeclimate.com/v1/badges/a4de1d6326dea75dfbec/maintainability)](https://codeclimate.com/github/olaferlandsen/typescript-http-framework-mvc/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/olaferlandsen/typescript-http-framework-mvc/badge.svg?branch=master)](https://coveralls.io/github/olaferlandsen/typescript-http-framework-mvc?branch=master)

Ideal to create Web Services.


## Requeriments
* Nodejs 8+
* TypeScript 2.8+

## Tested & Platform Support
* [x] Microsoft
    * [x] Windows 7+
    * [x] Azure AppService
* [x] Linux
    * [x] Ubuntu
    * [x] Fedora
    * [x] CentOS
    * [x] RedHat
    * [x] Debian
    * [x] AWS EC2
    * [x] Arduino
    * [x] Android Termux
* [x] OSX

## Features
* [x] Controller
    * [x] Annotations
        * [x] @Uri
        * [x] @Method
        * [x] @Permission
        * [x] @QueryString
    * [x] Custom Middleware Controller
        * [x] Default AuthController
        * [ ] Default CorsController
        * [ ] Default OAuth2Controller
    * [ ] Lifecycle
        * [x] beforeEnter
            * [x] Promise support
        * [x] main
            * [x] Promise support
        * [ ] afterEnter
            * [ ] Promise support
    * [x] Easy Response
        * [x] as Plain Text
        * [x] as JSON
        * [x] `200` - httpOk
        * [x] `201` - httpCreated
        * [x] `202` - httpAccepted
        * [x] `301` - httpRedirect
        * [x] `307` - httpRedirect
        * [x] `400` - httpBadRequest
        * [x] `401` - httpUnauthorized
        * [x] `403` - httpForbidden
        * [x] `404` - httpNotFound
        * [x] `405` - httpMethodNotAllowed
* [x] Cors Settings
* [ ] Security
    * [X] CSRF Prevention<sup>Using [CSurf](https://github.com/expressjs/csurf)</sup>
    * [ ] Denial-Of-Service Prevention<sup>Using [DDDoS](https://github.com/ololoepepe/dddos)</sup>
    * [x] Expect-CT<sup>Using [Helmet](https://helmetjs.github.io/)</sup>
    * [x] Content Security Policy<sup>Using [Helmet](https://helmetjs.github.io/)</sup>
    * [x] DNS Prefetch Control<sup>Using [Helmet](https://helmetjs.github.io/)</sup>
    * [x] X-Frame-Options<sup>Using [Helmet](https://helmetjs.github.io/)</sup>
    * [x] Hiden Powerd By<sup>Using [Helmet](https://helmetjs.github.io/)</sup>
    * [x] HTTP Public Key Pinning<sup>Using [Helmet](https://helmetjs.github.io/)</sup>
    * [x] HTTP Strict Transport Security<sup>Using [Helmet](https://helmetjs.github.io/)</sup>
    * [x] X-Download-Options for IE8+<sup>Using [Helmet](https://helmetjs.github.io/)</sup>
    * [x] No Cache<sup>Using [Helmet](https://helmetjs.github.io/)</sup>
    * [x] No Sniff<sup>Using [Helmet](https://helmetjs.github.io/)</sup>
    * [x] Referrer-Policy<sup>Using [Helmet](https://helmetjs.github.io/)</sup>
    * [X] XSS Prevention<sup>Using [Helmet](https://helmetjs.github.io/)</sup>
    * [x] Basic Cryptography<sup>Using [crypto](https://nodejs.org/api/crypto.html#crypto_crypto)</sup>
        * [x] AES-256-CTR Encrypt/Decrypt
        * [ ] AES-256-GCM Encrypt/Decrypt
        * [ ] AES-256-CBC Encrypt/Decrypt
    * [x] Hashing<sup>Using [crypto](https://nodejs.org/api/crypto.html#crypto_crypto)</sup>
        * [x] SHA1
        * [x] SHA256
        * [x] SHA512
        * [x] MD5
        * [x] HMAC-SHA1
        * [x] HMAC-SHA256
        * [x] HMAC-SHA512
        * [x] Checksum-MD5
        * [x] Checksum-SHA1
* [x] Custom Middleware
* [X] Sessions<sup>Using [session](https://github.com/expressjs/session)</sup>
* [X] Cookies<sup>Using [cookie-session](https://github.com/expressjs/cookie-session)</sup>
* [x] Routes

## Getting Started
### Controllers
This framework only support one controller by uri

#### Create a new Controller
##### Annotations
###### @Route
Define URL for access to this controller
###### @Method
Define method to access to this controller
###### @Permission
Define permission to this controller. It can using with you own AuthController

##### Lifecycle
###### `public` `void|Promise<void>` main()
IMainController is like to "constructor".
If you overwride this function on you controller returning a promise, the framework will wait to receive some response from promise like resolve or reject to continue execution with `afterEnter` method.

###### `public` `void|Promise<void>` beforeEnter()
Before execute main
If you overwride this function on you controller returning a promise, the framework will wait to receive some response from promise like resolve or reject to continue execution with `main` method.

###### `public` `void|Promise<void>` afterEnter()
After execute main, this method will execute.

#### Example code
````typescript
import {Route, Method, Permission, QueryString, Methods, Permissions, QueryStringTypes} from "../annotations/Annotations";
import {Controller} from "../core/Controller";

@Route("/my-own-url")
@Method(Methods.GET)
@Permission(Permissions.READ)
@QueryString("data", QueryStringTypes.JSON, false)
export class MyOwnController extends Controller {
    public main () {
        this.httpOk();
    }
}
````
#### Middleware Controller
##### AuthController
> 
````typescript
import {Controller} from "../core/Controller";
export class AuthController extends Controller {
    public beforeEnter ():Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.headers.exists("x-auth-token")) reject(new HttpUnauthorizedException());
            resolve();
        })
    }
}
````
##### AuthController without Promise
````typescript
import {Controller} from "../core/Controller";
export class AuthController extends Controller {
    
    public beforeEnter ():void {
        if (!("x-auth-controller" in this.request.headers)) {
            throw new HttpUnauthorizedException();
        }
    }
}
````
