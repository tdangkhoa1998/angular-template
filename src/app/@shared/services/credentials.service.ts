import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '@app/config/constants/api.constants';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Credentials {
  // Customize received credentials here
  token: string;
}
const credentialsKey = 'authenticationInfo';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  public permissionMatrix = [];
  private _credentials: Credentials | null = null;

  constructor(public http: HttpClient,
    //  private store: Store<AppState>
     ) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }


  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

  /**
 * Logs out the user and clear credentials.
 * @return True if the user was logged out successfully.
 */
  logout(): Observable<any> {
    const strRToken = localStorage.getItem("refreshToken");
    const _userInfo = JSON.parse(localStorage.getItem("authenticationInfo") || '');
    const dataModel = {
      refreshToken: strRToken,
      accountId: _userInfo.id || 0
    }
    const logOutObs = new Observable(observer => {
      this.http.post(API.URL.ACCOUNTS.SIGN_OUT, dataModel).subscribe((authResponse: any) => {
        localStorage.clear();
        observer.next();
      });
    });
    return logOutObs;
  }

  /**
   * Saved refresh token to the local storage.
   * @param strRefreshToken.
   */
  storedRefreshToken(strRefreshToken: string): void {
    localStorage.setItem('refreshToken', strRefreshToken);
  }

  /**
  * Saved token to the local storage.
  * @param strToken.
  */
  storedToken(strToken: string): void {
    localStorage.setItem('authenticationToken', strToken);
  }

  storedUserInfo(info: any): void {
    // this.store.dispatch(new UpdateAccount(info));
    localStorage.setItem("authenticationInfo", JSON.stringify(info));
  }

  getToken(): string {
    return localStorage.getItem('authenticationToken') || '';
  }

  refreshToken() {
    const strRToken = localStorage.getItem("refreshToken");
    // const data = strRToken;
    const dataModel = {
      refreshToken: strRToken
    }
    return this.http.post(API.URL.AUTHENTICATE.REFRESH_TOKEN, dataModel).pipe(tap((authResponse: any) => {
      if (authResponse.data) {
        const _data = authResponse.data;
        localStorage.setItem("authenticationToken", _data.accessToken);
        localStorage.setItem("refreshToken", _data.refreshToken);
      }
    }));
  }

  hasPermissionOn(resourceId: string, actionId: string) {
    //Retry get permissionAccess
    if (this.permissionMatrix.length == 0) {
      this.permissionMatrix = JSON.parse(localStorage.getItem('permissionAccess') as string) || [];
    }
    let index = -1;
    if (actionId === "") {
      index = _.findIndex(this.permissionMatrix, (e: any) => {
        return ((e.functionName == resourceId) && (e.permission === actionId));
      });
    }
    else {
      index = _.findIndex(this.permissionMatrix, (e: any) => {
        return ((e.functionName == resourceId) && (e.permission.includes(actionId)));
      });
    }
    if (index < 0) {
      return false;
    }
    return true;
  }

}
