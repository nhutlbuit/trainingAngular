import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientAppComponent } from './uicomp/client-app/client-app.component';
import { ScopeComponent } from './uicomp/scope/scope.component';
import { UserDashboardComponent } from './uicomp/user-dashboard/user-dashboard.component';
import { RoleDashboardComponent } from './uicomp/role-dashboard/role-dashboard.component';
import { SwitchmapComponent } from './rxjs/switchmap/switchmap.component';

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
    loadChildren: () => import('./rxjs/parent/parent.component').then(m => m.ParentModule),
    canActivate: []
  },
  {
    path: 'lazyloading',
     loadChildren: () => import('./rxjs/lazyloading/lazyloading.component').then(({LazyModule}) => LazyModule),
    canActivate: []
  },
  {
    path: 'change-detection',
     loadChildren: () => import('./rxjs/change-detection/change-detection.component').then(m => m.ChangeDetectionModule),
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
