import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@app/@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent,
    data: {
      authorities: [],
      pageTitle: 'TITLE.forgotPassword'
    }
  }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ForgotPasswordComponent]
})
export class ForgotPasswordModule { }
