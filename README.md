A simple, secure, fast and "ergonomic" Cross-platform HMVC Framework writen in TypeScript for Nodejs.

Ideal to create Web Services like to REST API, GraphQL API, Bridge, Integrators, and many more.


## Requeriments
* Nodejs
* TypeScript

## Tested & Platform Support
* [x] Windows
    * [x] Windows 7+
    * [x] Microsoft Azure App Service
* [x] Linux
    * [x] Ubuntu Desktop
    * [x] Ubuntu Server
    * [x] Fedora
    * [x] CentOS
    * [x] RedHat
    * [ ] Amazon Web Services EC2
* [x] OSX
    * [x] El Capitan
    * [x] Sierra
    * [x] High Sierra

## Features
* [x] Controller
* [ ] Models
* [ ] Vistas
* [ ] Services
* [ ] Security
    * [ ] CSRF Protection<sup>Optional</sup>
    * [ ] DDoS Protection<sup>Optional</sup>
    * [ ] Encrypt<sup>Optional</sup>
    * [ ] Hashing<sup>Optional</sup>
    * [ ] XSS<sup>Optional</sup>
    * [ ] Sanitize<sup>Optional</sup>
* [ ] Middleware
* [ ] Sessions<sup>Optional</sup>
* [ ] Cookies<sup>Optional</sup>
* [ ] Databases<sup>Optional</sup>
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
* [ ] Cache
    * [ ] Memcached<sup>Optional</sup>
    * [ ] Memory Cache<sup>Optional</sup>
    * [ ] Http<sup>Optional</sup>
* [x] Routes
* [ ] Bucket Support
    * [ ] AWS S3
* [ ] Lifecycle
* [ ] Binary CLI


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
export class MyOwnController extends Controller {
    public main () {
        this.httpOk();
    }
}
````
#### Middleware Controller
##### AuthController
````typescript
@Route("/my-own-url")
@Method(Methods.GET)
@Permission(Permissions.READ)
@QueryParam("data", QueryParamsTypes.JSON, false)
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
