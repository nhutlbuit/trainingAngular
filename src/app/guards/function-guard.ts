import { Injectable } from '@angular/core';
import { AuthStore } from '../stores/auth.store';
import { Subject } from 'rxjs/Subject';

@Injectable({providedIn: 'root'})
export class FunctionGuard {

    constructor(private authStore: AuthStore) {}

    isAdmin(): boolean {
        return this.authStore.getadminGuard();
    }
}

