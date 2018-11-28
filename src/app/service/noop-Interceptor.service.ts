import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { AuthStore } from '../stores/auth.store';
import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs/observable/of';
import { error } from 'util';
import { AuthenticationService } from './authentication.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {

  public timeofRefresh$ = new Subject<boolean>();

  isReadyForRefresh: boolean;

  constructor(private authStore: AuthStore, private inj: Injector ) {
      this.checkIsReadyForRefresh();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authStore.getIsReadyLocalStorage()) {
      this.authStore.setIsReadyLocalStorage('false');
     // this.refreshToken();
    }
    let reqDup = req;
    reqDup = req.clone({
      setHeaders: {
      //  Authorization: 'Bearer ' +  this.authStore.getTokenLocalStorage(),
      // 'Content-Type': 'application/json'
       }
    });
    return next.handle(reqDup).pipe(
      catchError((err) => {
     // this.handleError(err);
      return of(err);
    }) as any);
  }

  /**
   * manage errors
   * @param err
   * @returns {any}
   */
  private handleError(err: HttpErrorResponse): Observable<any> {

    switch (err.status) {
      case 404:
        console.log('Endpoint is not found or not data!');
        break;
      case 401:
        console.error('Resource is not autherized or token is expired');
        break;
      case 500:
        console.error('Internal Server Error');
        break;
      default:
        break;
    }

    if (err.status) {
      return of(err.message);
    }
    throw error;
  }

  refreshToken() {
    const auth = this.inj.get(AuthenticationService);
    auth.refreshToken();
  }

  checkIsReadyForRefresh() {
    this.timeofRefresh$.subscribe(event => {
      if (event) {
        this.authStore.setIsReadyLocalStorage('true');
      }
    });
  }
}
