import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({providedIn: 'root'})
export class AuthStore {
  constructor() { }

  public roleEvent$ = new Subject<boolean>();

  getadminGuard(): boolean {

    if (null == this.getRolesLocalStorage()) {
      return false;
    }
    return this.getRolesLocalStorage().adminGuard;
  }

  getRolesLocalStorage(): any {
    return JSON.parse(window.localStorage.getItem('roles')) || null;
  }

  getRolesIsNotExisted(): boolean {
    const isLogged = JSON.parse(window.localStorage.getItem('roles')) || null;
    return isLogged == null ? true : false;
  }

  saveRolesLocalStorage(data: any) {
    window.localStorage.setItem('roles', JSON.stringify(data));
  }

  saveTimeofExpiredLocalStorage(data: any) {
    window.localStorage.setItem('expiredtime', JSON.stringify(data));
  }

  getExpiredTimeLocalStorage(): number {
    return Number(JSON.parse(window.localStorage.getItem('expiredtime')));
  }

  clearedLocalStorage() {
    window.localStorage.clear();
  }

  setTokenLocalStorage(data: any) {
    window.localStorage.setItem('access_token', JSON.stringify(data));
  }

  getTokenLocalStorage(): any {
    return JSON.parse(window.localStorage.getItem('access_token'));
  }

  setRefeshTokenLocalStorage(data: any) {
    window.localStorage.setItem('refresh_token', JSON.stringify(data));
  }

  getRefreshTokenLocalStorage(): any {
    return JSON.parse(window.localStorage.getItem('refresh_token'));
  }

  setUsernameIntoStorage(username: string) {
    window.localStorage.setItem('username', username);
  }

  getUsernameFromStorage(): string {
    return window.localStorage.getItem('username');
  }

  setIsLoggedIntoStorage(username: string) {
    window.localStorage.setItem('isLoggedIn', username);
  }

  getIsLoggedInFromStorage(): boolean {
    const isLoggedIn = window.localStorage.getItem('isLoggedIn') || null;
    if (null == isLoggedIn) {
      return false;
    }
    return true;
  }

  logout() {
    window.localStorage.clear();
  }

  setUrlOauthLocalStorage(username: string) {
    window.localStorage.setItem('urlOauth', username);
  }

  getUrlOauthLocalStorage(): string {
    return window.localStorage.getItem('urlOauth') || null;
  }

  setCounterLocalStorage(count: number) {
    window.localStorage.setItem('count', JSON.stringify(count));
  }

  getCountNumLocalStorage(): number {
    return (window.localStorage.getItem('count') || null) === null
      ? 0
      : Number(window.localStorage.getItem('count'));
  }

  isLoggedIn(): boolean {
    if (null == window.localStorage.getItem('isLoggedIn')) {
      return false;
    }
    const isLoggedIn = window.localStorage.getItem('isLoggedIn');
    if ('true' === isLoggedIn) {
      return true;
    } else {
      return false;
    }
  }

  setIsReadyLocalStorage(username: string) {
    window.localStorage.setItem('isReady', username);
  }

  getIsReadyLocalStorage(): boolean {
    if (null == this.getRolesLocalStorage()) {
      return false;
    }
    const isReady = window.localStorage.getItem('isReady');
    if ('true' === isReady) {
      return true;
    } else {
      return false;
    }

  }
}
