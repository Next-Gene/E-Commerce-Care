import { Adapter } from '../interface/adapter';
import { RegisterAPIRes, RegisterRes } from '../interface/registerRes';
import * as i0 from "@angular/core";
export declare class AuthRegisterAPIAdapter implements Adapter {
    constructor();
    adapt(data: RegisterAPIRes): RegisterRes;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthRegisterAPIAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthRegisterAPIAdapter>;
}
