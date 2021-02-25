import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { AuthStore } from '../stores/auth.store';

@Injectable({providedIn: 'root'})
export class AdminLoadingGuard implements CanLoad {

    constructor(private authStore: AuthStore)  {

    }

    canLoad(route: Route): boolean {
        return true;
      }

}
