import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientAppComponent } from './uicomp/client-app/client-app.component';
import { ScopeComponent } from './uicomp/scope/scope.component';
import { UserDashboardComponent } from './uicomp/user-dashboard/user-dashboard.component';
import { RoleDashboardComponent } from './uicomp/role-dashboard/role-dashboard.component';
import { AdminGuard } from './guards/admin';

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
