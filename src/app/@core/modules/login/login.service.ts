import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '@app/config/constants/api.constants';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

export interface LoginContext {
  username: string;
  password: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext) {
    return this.http.post(API.URL.AUTHENTICATE.AUTHENTICATE, context).pipe(take(1));
  }

  accountInfo(): Observable<any> {
    return this.http.get(API.URL.ACCOUNTS.GET_ACCOUNT_INFO).pipe(take(1));
  }

  getPermissionAccess() {
    return this.http.get(`${API.URL.USER.MENU_ACCESS}`).pipe(take(1));
  }

  getAccessToken(idToken: any) {
    return this.http.post(API.URL.AUTHENTICATE.GET_ACCESS_TOKEN, idToken).pipe(take(1));
  }

  //Out of scope
  companyGetAll() {
    return this.http.get(API.URL.COMPANY.GET_ALL).pipe(take(1));
  }

}
