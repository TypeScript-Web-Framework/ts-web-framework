export interface IApiAttributesAnnotation {
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
