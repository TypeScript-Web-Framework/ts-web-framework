A simple, secure, fast and "ergonomic" Cross-platform HMVC Framework writen in TypeScript for Nodejs.

Ideal to create Web Services like to REST API, GraphQL API, Bridge, Integrators, and many more.


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
        * [x] Custom AuthController
    * [ ] Lifecycle
        * [x] beforeEnter
            * [x] as Promise
        * [x] main
            * [x] as Promise
        * [ ] afterEnter
* [ ] Model
* [ ] Vista
    * [ ] as plain string
    * [ ] as JSON
* [ ] Service
* [ ] Security
    * [X] CSRF Prevention<sup>Using [CSurf](https://github.com/expressjs/csurf)</sup>
    * [x] Denial-Of-Service Prevention<sup>Using [DDDoS](https://github.com/ololoepepe/dddos)</sup>
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
    * [ ] Encrypt<sup>Optional</sup>
    * [ ] Hashing<sup>Optional</sup>
    * [ ] Sanitize<sup>Optional</sup>
* [ ] Custom Global Middleware
* [ ] Sessions<sup>Optional</sup>
* [ ] Cookies<sup>Optional</sup>
* [ ] Databases Support<sup>Optional</sup>
    * [ ] MongoDB<sup>Optional</sup>
    * [ ] MySQL/MariaDB<sup>Optional</sup>
    * [ ] PostgreSQL<sup>Optional</sup>
    * [ ] Oracle<sup>Optional</sup>
    * [ ] SQL Server<sup>Optional</sup>
    * [ ] SQLite<sup>Optional</sup>
    * [ ] PouchDB<sup>Optional</sup>
    * [ ] CouchDB<sup>Optional</sup>
    * [ ] Firebase<sup>Optional</sup>
    * [ ] DynamoDB<sup>Optional</sup>
    * [ ] Cosmos DB<sup>Optional</sup>
    * [ ] Cassandra DB<sup>Optional</sup>
    * [ ] Redis<sup>Optional</sup>
    * [ ] AWS S3<sup>Optional</sup>
    * [ ] JSON File System Mechanism<sup>Optional</sup>
* [ ] Cache Support
    * [ ] Memcached<sup>Optional</sup>
    * [ ] Memory Cache<sup>Optional</sup>
    * [ ] Http<sup>Optional</sup>
* [x] Routes
* [ ] Bucket Support
    * [ ] AWS S3
* [ ] Binary CLI
    * [ ] Create Project
    * [ ] Create Controller
    * [ ] Create Model
    * [ ] Create Vista
    * [ ] Create Service
    * [ ] Enable/Disable feature
* [ ] MinifyJS
* [ ] AOT(*Ahead-of-time*)<sup>Using [Enclose](http://enclose.io/)</sup>


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
Main is like to "constructor".
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


### Create a new Model
```typescript
export class MyOwnModel extends Model {}
```
#### Mongodb


#### MySQL, MariaDB, PostgreSQL, Oracle models
##### Annotations
###### @Entity
###### @Table
> Alias of @Entity

###### @Column
###### @Field
> Alias of @Column

###### @Id
###### @PrimaryKey
###### @Unique
###### @AutoIncrement
###### @ForeignKey
###### @ManyToOne
###### @OneToOne
###### @ManyToMany
###### @Version

### Create a new service
```typescript
export class MyOwnService extends Service {}
```
### Create a new Middleware
```typescript
export class MyOwnMiddleware extends Middleware {}
```
