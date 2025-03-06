import { LoginAPIRes, LoginRes } from '../interface/loginRes';
import { Adapter } from '../interface/adapter';
import * as i0 from "@angular/core";
export declare class AuthLoginAPIAdapter implements Adapter {
    constructor();
    adapt(data: LoginAPIRes): LoginRes;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthLoginAPIAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthLoginAPIAdapter>;
}
