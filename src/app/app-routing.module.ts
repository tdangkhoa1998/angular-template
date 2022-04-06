import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import("@core/modules/login/login.module").then((m) => m.LoginModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import("@core/modules/forgot-password/forgot-password.module").then((m) => m.ForgotPasswordModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import("@core/modules/forgot-password/forgot-password.module").then((m) => m.ForgotPasswordModule)
  },
  {
    path: '',
    loadChildren: () => import("src/app/modules/dashboard/dashboard.module").then((m) => m.DashboardModule)
  },

  { path: '**', redirectTo: 'not-found' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
