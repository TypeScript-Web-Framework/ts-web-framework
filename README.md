
## Requeriments
* Nodejs
* TypeScript

## Platform Support
* [x] Microsoft Azure AppService
* [ ] Amazon Web Service EC2

## Getting Started
### Create a new Controller
#### Annotations
##### @Uri
##### @Method
##### @Permission

#### Lifecycle
##### `public` `void|Promise<void>` main()
##### `public` `void|Promise<void>` beforeEnter()
##### `public` `void|Promise<void>` afterEnter()

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
