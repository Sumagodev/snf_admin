import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DefaultLayoutComponent } from 'src/app/containers';

const routes: Routes = [
  {path:'',component:DefaultLayoutComponent,children:[
    {path:'dashboard',component:DashboardComponent},
    {path:'',redirectTo:'/main/dashboard',pathMatch:'full'},
    
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
