export interface IApiAttributesAnnotation {
    role : string,
    method : string,
    uri : string
    clientParam : string,
    queryParams:{
        [ key : string] : {
            type : string,
            required : boolean,
            validator : RegExp
        }
    }
}
