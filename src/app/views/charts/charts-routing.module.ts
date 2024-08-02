import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChartsComponent } from './charts.component';
import { DefaultLayoutComponent } from 'src/app/containers/default-layout/default-layout.component';

const routes: Routes = [
  {path:'',component:DefaultLayoutComponent,
  children: [
   { path: '',
    component: ChartsComponent,
    data: {
      title: 'charts'
    }}
  ]}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule {}

