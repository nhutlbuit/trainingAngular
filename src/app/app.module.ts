import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
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
  MatTooltipModule,
  MatStepperModule
} from '@angular/material';

import { AuthenticationService } from './service/authentication.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthStore } from './stores/auth.store';
import { AppRoutingModule } from './app-routing.module';
import { SlToolbarComponent } from './uicomp/sl-toolbar/sl-toolbar.component';
import { SlNavbarComponent } from './uicomp/sl-navbar/sl-navbar.component';
import { UIService } from './service/uiservice.service';
import { ClientAppComponent } from './uicomp/client-app/client-app.component';
import { ClientAppService } from './service/client-app.service';
import { AddClientDialogComponent } from './uicomp/dialogs/add-client-dialog/add-client-dialog.component';
import { EditClientDialogComponent } from './uicomp/dialogs/edit-client-dialog/edit-client-dialog.component';
import { DeleteClientDialogComponent } from './uicomp/dialogs/delete-client-dialog/delete-client-dialog.component';
import { DialogConfirmComponent } from './uicomp/dialogs/confirm-dialog/dialog-confirm.component';
import { ScopeService } from './service/scope.service';
import { ArrayToStringPipe } from './uicomp/client-app/array-to-string.pipe';
import { ScopeComponent } from './uicomp/scope/scope.component';
import { UserDashboardComponent } from './uicomp/user-dashboard/user-dashboard.component';
import { AddUserDialogComponent } from './uicomp/dialogs/add-user-dialog/add-user-dialog.component';
import { RoleService } from './service/role.service';
import { EventService } from './service/event.service';
import { UserService } from './service/user.service';
import { EditUserDialogComponent } from './uicomp/dialogs/edit-user-dialog/edit-user-dialog.component';
import { ChangeStatusDialogComponent } from './uicomp/dialogs/change-status-dialog/change-status-dialog.component';
import { NoopInterceptor } from './service/noop-Interceptor.service';
import { Constants } from './shared/constants';
import { FunctionGuard } from './guards/function-guard';
import { AdminGuard } from './guards/admin';
import { RoleDashboardComponent } from './uicomp/role-dashboard/role-dashboard.component';
import { TestComponent } from './test/test.component';
import { Test1Component } from './test1/test1.component';
import { TestDirective } from './test.directive';
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
  declarations: [TestComponent, Test1Component, TestDirective]
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
    DialogConfirmComponent,
    ArrayToStringPipe,
    ScopeComponent,
    UserDashboardComponent,
    AddUserDialogComponent,
    EditUserDialogComponent,
    ChangeStatusDialogComponent,
    RoleDashboardComponent
  ],
  imports: [
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule
  ],
  entryComponents: [
    AddClientDialogComponent,
    EditClientDialogComponent,
    DeleteClientDialogComponent,
    DialogConfirmComponent,
    AddUserDialogComponent,
    EditUserDialogComponent,
    ChangeStatusDialogComponent
  ],
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
