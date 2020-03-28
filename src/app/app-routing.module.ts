import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientAppComponent } from './uicomp/client-app/client-app.component';
import { ScopeComponent } from './uicomp/scope/scope.component';
import { UserDashboardComponent } from './uicomp/user-dashboard/user-dashboard.component';
import { RoleDashboardComponent } from './uicomp/role-dashboard/role-dashboard.component';
import { AdminGuard } from './guards/admin';
import { SwitchmapComponent } from './rxjs/switchmap/switchmap.component';
import { ParentComponent } from './rxjs/parent/parent.component';
import { ChildComponent } from './rxjs/child/child.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  },
  {
    path: 'client-app',
    component: ClientAppComponent,
    canActivate: []
  },
  {
    path: 'users',
    component: UserDashboardComponent,
    canActivate: []
  },
  {
    path: 'scope',
    component: ScopeComponent,
    canActivate: []
  },
  {
    path: 'roles',
    component: RoleDashboardComponent,
    canActivate: []
  },
  {
    path: 'switchmap',
    component: SwitchmapComponent,
    canActivate: []
  },
  {
    path: 'parent',
    component: ParentComponent,
    canActivate: []
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, enableTracing: false })
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
