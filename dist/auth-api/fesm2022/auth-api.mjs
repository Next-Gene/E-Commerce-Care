import * as i0 from '@angular/core';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import * as i1 from '@angular/common/http';

class AuthENDPOINT {
    static LOGIN = "https://exam.elevateegy.com/api/v1/auth/signin";
    static REGISER = "https://exam.elevateegy.com/api/v1/auth/signup";
    static Change_Password = "https://exam.elevateegy.com/api/v1/auth/changePassword";
    static DELETE_ACOUNT = "https://exam.elevateegy.com/api/v1/auth/deleteMe";
    static EDITE_PROFILE = "https://exam.elevateegy.com/api/v1/auth/editProfile";
    static LOGIN_OUT = "https://exam.elevateegy.com/api/v1/auth/logout";
    static USER_INFO = "https://exam.elevateegy.com/api/v1/auth/profileData";
    static FORGET_PASSWORD = "https://exam.elevateegy.com/api/v1/auth/forgotPassword";
    static VERIFY_RESET_CODE = "https://exam.elevateegy.com/api/v1/auth/verifyResetCode";
    static RESET_PASSWORD = "https://exam.elevateegy.com/api/v1/auth/resetPassword";
}

class AuthLoginAPIAdapter {
    constructor() { }
    adapt(data) {
        return {
            message: data.message,
            token: data.token,
            userEmail: data.user.email,
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.7", ngImport: i0, type: AuthLoginAPIAdapter, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.1.7", ngImport: i0, type: AuthLoginAPIAdapter, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.7", ngImport: i0, type: AuthLoginAPIAdapter, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [] });

class AuthRegisterAPIAdapter {
    constructor() { }
    adapt(data) {
        return {
            message: data.message,
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.7", ngImport: i0, type: AuthRegisterAPIAdapter, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.1.7", ngImport: i0, type: AuthRegisterAPIAdapter, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.7", ngImport: i0, type: AuthRegisterAPIAdapter, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

class AuthApiService {
    _HttpClient;
    _AuthLoginAPIAdapter;
    _AuthRegisterAPIAdapter;
    constructor(_HttpClient, _AuthLoginAPIAdapter, _AuthRegisterAPIAdapter) {
        this._HttpClient = _HttpClient;
        this._AuthLoginAPIAdapter = _AuthLoginAPIAdapter;
        this._AuthRegisterAPIAdapter = _AuthRegisterAPIAdapter;
    }
    Login(data) {
        return this._HttpClient.post(AuthENDPOINT.LOGIN, data).pipe(map((res) => this._AuthLoginAPIAdapter.adapt(res)));
    }
    Regester(data) {
        return this._HttpClient.post(AuthENDPOINT.REGISER, data).pipe(map((res) => this._AuthRegisterAPIAdapter.adapt(res)));
    }
    Forgetpass(data) {
        return this._HttpClient.post(AuthENDPOINT.FORGET_PASSWORD, data);
    }
    VerifyCode(data) {
        return this._HttpClient.post(AuthENDPOINT.VERIFY_RESET_CODE, data);
    }
    resetpass(data) {
        return this._HttpClient.put(AuthENDPOINT.RESET_PASSWORD, data);
    }
    Logout() {
        return this._HttpClient.get(AuthENDPOINT.LOGIN_OUT);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.7", ngImport: i0, type: AuthApiService, deps: [{ token: i1.HttpClient }, { token: AuthLoginAPIAdapter }, { token: AuthRegisterAPIAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.1.7", ngImport: i0, type: AuthApiService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.7", ngImport: i0, type: AuthApiService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }, { type: AuthLoginAPIAdapter }, { type: AuthRegisterAPIAdapter }] });

/*
 * Public API Surface of auth-api
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AuthApiService };
//# sourceMappingURL=auth-api.mjs.map
