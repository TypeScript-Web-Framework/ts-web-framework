
## Requeriments
* Nodejs
* TypeScript

## Platform Support
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
    * [ ] CSRF Protection
    * [ ] DDoS Protection
    * [ ] Encrypt
    * [ ] Hashing
    * [ ] XSS
    * [ ] Sanitize
* [ ] Middleware
* [ ] Sessions
* [ ] Cookies
* [ ] Databases
    * [ ] MongoDB
    * [ ] MySQL/MariaDB
    * [ ] PostgreSQL
    * [ ] Oracle
    * [ ] SQL Server
    * [ ] SQLite
    * [ ] PouchDB
    * [ ] CouchDB
    * [ ] Firebase
    * [ ] DynamoDB
    * [ ] Cosmos DB
    * [ ] Cassandra DB
    * [ ] Redis
    * [ ] AWS S3
    * [ ] JSON File System Mechanism
* [ ] Cache
    * [ ] Memcached
    * [ ] Memory Cache
    * [ ] Http
* [x] Routes
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
