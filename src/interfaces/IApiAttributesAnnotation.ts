export interface IApiAttributesAnnotation {
    controller : string,
    permission : string,
    method : string,
    uri : string
    queryParams:{
        [ key : string] : {
            type : string,
            required : boolean,
            validator : RegExp
        }
    }
}
