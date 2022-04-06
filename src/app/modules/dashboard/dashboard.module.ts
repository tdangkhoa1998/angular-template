import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@app/@shared/shared.module';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      authorities: [],
      pageTitle: 'TITLE.dashboard'
    }
  }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
