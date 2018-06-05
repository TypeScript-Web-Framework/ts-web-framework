export interface BeforeEnterController {
    beforeEnter : () => Promise<any> | void;
}
