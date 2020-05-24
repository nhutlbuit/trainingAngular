import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/switchmap',
    pathMatch: 'full'
  },
  // {
  //   path: 'client-app',
  //   component: ClientAppComponent,
  //   canActivate: []
  // },
  // {
  //   path: 'users',
  //   component: UserDashboardComponent,
  //   canActivate: []
  // },
  // {
  //   path: 'scope',
  //   component: ScopeComponent,
  //   canActivate: []
  // },
  // {
  //   path: 'roles',
  //   component: RoleDashboardComponent,
  //   canActivate: []
  // },
  {
    path: 'switchmap',
    loadChildren: () => import('./rxjs/switchmap/switchmap.component').then(m => m.SwitchMapModule),
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
