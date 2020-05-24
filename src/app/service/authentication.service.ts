import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AuthStore } from '../stores/auth.store';
import { TokenRefresh } from '../guards/model/user-token';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Constants } from '../shared/constants';
import { Router } from '@angular/router';
import { UIService } from './uiservice.service';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  private LOG_OUT_AUTH2_URL;
  OAUTH2_SERVICE_PATH: string;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private _http: HttpClient,
    private authStore: AuthStore,
    private router: Router
  ) {

    // this.OAUTH2_SERVICE_PATH = Constants.OAUTH2_PATH;
    // this.LOG_OUT_AUTH2_URL = this.OAUTH2_SERVICE_PATH +
    //  '/logout-oauth2?client_id=' +
    //  Constants.CLIENT_ID;
  }

  getTokenSvice(data: any): Observable<any> {
    return this._http.post<any>('/adminUI/authenticate', data);
  }

  public logout() {
    this.authStore.clearedLocalStorage();

    this.LOG_OUT_AUTH2_URL = this.OAUTH2_SERVICE_PATH +
      '/logout-oauth2?client_id=' +
      Constants.CLIENT_ID;

    window.location.href = this.LOG_OUT_AUTH2_URL;
  }

  public getAutheticationCode(): string {
    const redirectUrl =
      this.OAUTH2_SERVICE_PATH +
      '/oauth/authorize?' +
      'response_type=' +
      Constants.RESPONSE_TYPE +
      '&client_id=' +
      Constants.CLIENT_ID;
    return redirectUrl;
  }

  getAccesstokenAsRefress(data: any): Observable<any> {
    return this._http.post<any>('/adminUI/refreshtoken', data);
  }

  getToken(value: any): void {
    this.getTokenSvice(value).subscribe(
      (data: any) => {
        this.authStore.saveRolesLocalStorage(data.roles);
        this.authStore.saveTimeofExpiredLocalStorage(data.TokenCheck.exp);
        this.authStore.setTokenLocalStorage(data.Token.access_token);
        this.authStore.setRefeshTokenLocalStorage(data.Token.refresh_token);
        this.authStore.setUsernameIntoStorage(data.TokenCheck.user_name);
        this.authStore.setIsLoggedIntoStorage('true');
        this.authStore.roleEvent$.next(true);
        this.router.navigate(['/users']);
      },
      error => {
        console.log('error: ' + JSON.stringify(error));
        alert('Cannot not get token');
      }
    );
  }

  public refreshToken() {
    const userToken = new TokenRefresh();
    userToken.refresh_token = this.authStore.getRefreshTokenLocalStorage();
    this.getAccesstokenAsRefress(userToken).subscribe(
      (data: any) => {
        this.authStore.saveTimeofExpiredLocalStorage(data.TokenCheck.exp);
        this.authStore.setTokenLocalStorage(data.Token.access_token);
        this.authStore.setRefeshTokenLocalStorage(data.Token.refresh_token);
        // return data;
      },
      error => {
        console.log('error:' + JSON.stringify(error) + 'invalid token');
      }
    );
  }
}
