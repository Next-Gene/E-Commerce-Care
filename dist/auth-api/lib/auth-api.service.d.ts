import { AuthAPI } from './base/AuthAPI';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthLoginAPIAdapter } from './adaptor/auth-login-api.adapter';
import { loginUser } from './interface/login';
import { LoginRes } from './interface/loginRes';
import { AuthRegisterAPIAdapter } from './adaptor/auth-register-api.adapter';
import { registerUser } from './interface/register';
import { RegisterRes } from './interface/registerRes';
import { ForgetPassUser } from './interface/forgetPass';
import { VerifyCodeUser } from './interface/VerifyCode';
import { ResetPassUser } from './interface/ResetPass';
import * as i0 from "@angular/core";
export declare class AuthApiService implements AuthAPI {
    private _HttpClient;
    private _AuthLoginAPIAdapter;
    private _AuthRegisterAPIAdapter;
    constructor(_HttpClient: HttpClient, _AuthLoginAPIAdapter: AuthLoginAPIAdapter, _AuthRegisterAPIAdapter: AuthRegisterAPIAdapter);
    Login(data: loginUser): Observable<LoginRes | never[]>;
    Regester(data: registerUser): Observable<RegisterRes | never[]>;
    Forgetpass(data: ForgetPassUser): Observable<any>;
    VerifyCode(data: VerifyCodeUser): Observable<any>;
    resetpass(data: ResetPassUser): Observable<any>;
    Logout(): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthApiService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthApiService>;
}
