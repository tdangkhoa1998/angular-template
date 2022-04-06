import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@app/@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      authorities: [],
      pageTitle: 'TITLE.login',
      isHideSideBar: true,
      isHideHeader: true,
      isAuthPage: true
    }
  }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }

