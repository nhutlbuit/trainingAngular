import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef
} from '@angular/core';
import { UIService } from './service/uiservice.service';
import { MatSidenav } from '@angular/material';
import { AuthenticationService } from './service/authentication.service';
import { AuthStore } from './stores/auth.store';
import { Constants } from './shared/constants';
import { Common } from './shared/common';
import { NoopInterceptor } from './service/noop-Interceptor.service';
import * as moment from 'moment';
import 'moment-timezone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Constants]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  static inactive = true;

  @ViewChild(MatSidenav)
  private matSideNav: MatSidenav;

  timeOfRefresh = false;
  isExpired = false;
  checkRefreshTokenThread;
  private baseAccountURL: string;
  private authUrl: string;
  public dateTime = moment();

  constructor(
    private uiService: UIService,
    private authStore: AuthStore,
    private authService: AuthenticationService,
    private intercept: NoopInterceptor,
    private eltRef: ElementRef
  ) {
    this.uiService.navBarEventStream$.subscribe(evtVal =>
      this.matSideNav.toggle()
    );
    const native = this.eltRef.nativeElement;
    this.baseAccountURL = native.getAttribute('baseAccountURL');
    this.authService.OAUTH2_SERVICE_PATH  = native.getAttribute('authUrl');
    this.uiService.baseAccountURL = this.baseAccountURL;

    console.log('Connectting to Account Service: ' + this.baseAccountURL);
  }

  ngOnInit() {
   // this.handleLogin();
  }

  ngAfterViewInit() {
   // this.refressToken();
  }

  ngOnDestroy(): void {
    sessionStorage.clear();
    this.checkRefreshTokenThread.clear();
  }

  handleLogin() {
    if (!this.authStore.isLoggedIn()) {
      const code = Common.getParameterByName('code');
      const state = Common.getParameterByName('state');

      if (state === 'approved') {
        if (code) {
          this.authService.getToken(code);
        } else {
          this.goToAuthServer();
        }
      } else if (state === 'deny') {
        this.authStore.setIsLoggedIntoStorage('true');
      } else {
        /// this.authService.logout();
        this.goToAuthServer();
      }
    }
  }

  goToAuthServer() {
    window.location.href = this.authService.getAutheticationCode();
  }

  refressToken() {
    this.checkRefreshTokenThread = setInterval(() => {
      const expiredTime = this.authStore.getExpiredTimeLocalStorage();
      const nowTime = String(new Date().getTime());
      const nowTimeJava = Number(nowTime.substr(0, 10));
      this.timeOfRefresh = expiredTime - nowTimeJava < Constants._9MINUTES;
      this.isExpired = expiredTime < nowTimeJava;

      if (this.isExpired) {
        this.goToAuthServer();
      } else if (
        this.timeOfRefresh &&
        !this.authStore.getIsReadyLocalStorage()
      ) {
        this.intercept.timeofRefresh$.next(true);
      }
    }, Constants._1MINUTE);
  }
}
