import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatDialogModule, MatExpansionModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule,
  MatSelectModule, MatSidenavModule, MatSliderModule, MatSnackBarModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { createTranslateLoader } from '../config/translate';
import { AppComponent } from './app.component';
import { AdminGuard } from './guards/admin';
import { NoopInterceptor } from './service/noop-Interceptor.service';
import { Constants } from './shared/constants';
import { SlNavbarComponent } from './uicomp/sl-navbar/sl-navbar.component';
import { SlToolbarComponent } from './uicomp/sl-toolbar/sl-toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
     SlToolbarComponent,
     SlNavbarComponent
  ],
  imports: [
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
    }),
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/switchmap',
        pathMatch: 'full'
      },
      {
        path: 'switchmap',
        loadChildren: () => import('./rxjs/switchmap/switchmap.component').then(m => m.SwitchMapModule),
        canActivate: [AdminGuard]
      },
      {
        path: 'parent',
        loadChildren: () => import('./rxjs/parent/parent.component').then(m => m.ParentModule),
        canActivate: [AdminGuard]
      },
      {
        path: 'lazyloading',
         loadChildren: () => import('./rxjs/lazyloading/lazyloading.component').then(({LazyModule}) => LazyModule),
        canActivate: [AdminGuard]
      },
      {
        path: 'change-detection',
         loadChildren: () => import('./rxjs/change-detection/change-detection.component').then(m => m.ChangeDetectionModule),
        canActivate: [AdminGuard]
      }
    ])
  ],
  // remove providers of service
  // remove entryComponents of dialogs
  providers: [
    Constants,
    NoopInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoopInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
