import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule,
  MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
  MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule,
  MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule,
  MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { createTranslateLoader } from '../config/translate';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminGuard } from './guards/admin';
import { FunctionGuard } from './guards/function-guard';
import { AuthenticationService } from './service/authentication.service';
import { ClientAppService } from './service/client-app.service';
import { EventService } from './service/event.service';
import { NoopInterceptor } from './service/noop-Interceptor.service';
import { RoleService } from './service/role.service';
import { ScopeService } from './service/scope.service';
import { UIService } from './service/uiservice.service';
import { UserService } from './service/user.service';
import { Constants } from './shared/constants';
import { AuthStore } from './stores/auth.store';
import { ArrayToStringPipe } from './uicomp/client-app/array-to-string.pipe';
import { ClientAppComponent } from './uicomp/client-app/client-app.component';
import { AddClientDialogComponent } from './uicomp/dialogs/add-client-dialog/add-client-dialog.component';
import { AddUserDialogComponent } from './uicomp/dialogs/add-user-dialog/add-user-dialog.component';
import { ChangeStatusDialogComponent } from './uicomp/dialogs/change-status-dialog/change-status-dialog.component';
import { DeleteClientDialogComponent } from './uicomp/dialogs/delete-client-dialog/delete-client-dialog.component';
import { EditClientDialogComponent } from './uicomp/dialogs/edit-client-dialog/edit-client-dialog.component';
import { EditUserDialogComponent } from './uicomp/dialogs/edit-user-dialog/edit-user-dialog.component';
import { RoleDashboardComponent } from './uicomp/role-dashboard/role-dashboard.component';
import { ScopeComponent } from './uicomp/scope/scope.component';
import { SlNavbarComponent } from './uicomp/sl-navbar/sl-navbar.component';
import { SlToolbarComponent } from './uicomp/sl-toolbar/sl-toolbar.component';
import { UserDashboardComponent } from './uicomp/user-dashboard/user-dashboard.component';


@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  declarations: []
})
export class MaterialModule {}

const GUARD_PROVIDER = [FunctionGuard, AdminGuard];

const SERVICES_PROVIDER = [
  AuthenticationService,
  AuthStore,
  UIService,
  ClientAppService,
  ScopeService,
  RoleService,
  EventService,
  UserService
];

@NgModule({
  declarations: [
    AppComponent,
    SlToolbarComponent,
    SlNavbarComponent,
    ClientAppComponent,
    AddClientDialogComponent,
    EditClientDialogComponent,
    DeleteClientDialogComponent,
    ArrayToStringPipe,
    ScopeComponent,
    UserDashboardComponent,
    AddUserDialogComponent,
    EditUserDialogComponent,
    ChangeStatusDialogComponent,
    RoleDashboardComponent,
  ],
  imports: [
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
    }),
  ],
  // remove entryComponents
  // entryComponents: [
  //   AddClientDialogComponent,
  //   EditClientDialogComponent,
  //   DeleteClientDialogComponent,
  //   DialogConfirmComponent,
  //   AddUserDialogComponent,
  //   EditUserDialogComponent,
  //   ChangeStatusDialogComponent,
  //   AddStudentDialogComponent
  // ],
  providers: [
    Constants,
    NoopInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoopInterceptor,
      multi: true
    },
    GUARD_PROVIDER,
    SERVICES_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
