import { environment } from "../../../../../environments/environment";

export class AuthENDPOINT {
  static LOGIN = `${environment.baseUrl}/api/v1/auth/login`;
  static REGISER = `${environment.baseUrl}/api/v1/auth/register`;
  static Change_Password = `${environment.baseUrl}/api/v1/auth/changePassword`;
  static DELETE_ACOUNT = `${environment.baseUrl}/api/v1/auth/deleteMe`;
  static EDITE_PROFILE = `${environment.baseUrl}/api/v1/auth/editProfile`;
  static LOGIN_OUT = `${environment.baseUrl}/api/v1/auth/logout`;
  static USER_INFO = `${environment.baseUrl}/api/v1/auth/profileData`;
  static FORGET_PASSWORD = `${environment.baseUrl}/api/v1/auth/forget-password`;
  static VERIFY_RESET_CODE = `${environment.baseUrl}/api/v1/auth/verify-code`;
  static RESET_PASSWORD = `${environment.baseUrl}/api/v1/auth/reset-password`;
}
