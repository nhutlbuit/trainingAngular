import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthStore } from '../stores/auth.store';

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {

    constructor(private authStore: AuthStore)  {

    }

    canActivate(): boolean {
        return this.authStore.getadminGuard();
    }

}
