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
            * [x] Promise support
        * [x] main
            * [x] Promise support
        * [ ] afterEnter
            * [ ] Promise support
    * [x] Easy Response
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
* [ ] Model
* [ ] Vista
    * [ ] as plain string
    * [ ] as JSON
    * [ ] as XML
* [ ] Service
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
        * [x] AES-256-GCM Encrypt/Decrypt
        * [x] AES-256-CBC Encrypt/Decrypt
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
* [ ] Custom Middleware
* [ ] Sessions<sup>Optional</sup>
* [ ] Cookies<sup>Optional</sup>
* [ ] Databases Support<sup>Optional</sup>
    * [ ] MongoDB<sup>Using [Mongoose](http://mongoosejs.com/)</sup>
    * [ ] MySQL/MariaDB<sup>Using [mysql](https://github.com/mysqljs/mysql)</sup>
    * [ ] PostgreSQL<sup>Using [node-postgres](https://node-postgres.com/)</sup>
    * [ ] Oracle<sup>Using [node-oracledb](https://github.com/oracle/node-oracledb)</sup>
    * [ ] SQL Server<sup>Using [node-mssql](https://github.com/tediousjs/node-mssql)</sup>
    * [ ] SQLite3<sup>Using [node-sqlite3](https://github.com/mapbox/node-sqlite3)</sup>
    * [ ] PouchDB<sup>Using [pouchdb](https://github.com/pouchdb/pouchdb)</sup>
    * [ ] CouchDB<sup>Using [node-couchdb](https://github.com/1999/node-couchdb)</sup>
    * [ ] DynamoDB<sup>Using [dynamodb](https://github.com/baseprime/dynamodb)</sup>
    * [ ] Cosmos DB<sup>Using [azure-documentdb-node](https://github.com/Azure/azure-documentdb-node)</sup>
    * [ ] Cassandra DB<sup>Using [cassandra-driver](https://github.com/datastax/nodejs-driver)</sup>
    * [ ] Redis<sup>Using [redis](https://github.com/NodeRedis/node_redis)</sup>
* [ ] Cache
    * [ ] Memcached<sup>[Using Memcached](https://github.com/3rd-Eden/memcached)</sup>
    * [ ] Memory Cache<sup>Using [node-cache](https://github.com/ptarjan/node-cache)</sup>
* [x] Routes
* [ ] Storage
    * [ ] Amazon Web Service S3
    * [ ] Microsoft Azure Blob Storage
    * [ ] Google Cloud Storage
* [ ] Binary CLI
    * [ ] Create Project
    * [ ] Create Controller
    * [ ] Create Model
    * [ ] Create Vista
    * [ ] Create Service
    * [ ] Enable/Disable feature
* [ ] MinifyJS
* [ ] Support to AOT(*Ahead-of-time*)<sup>Using [node-packer](https://github.com/pmq20/node-packer)</sup>


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
