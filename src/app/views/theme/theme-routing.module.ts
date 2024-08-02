import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorsComponent } from './colors.component';
import { TypographyComponent } from './typography.component';
import { DefaultLayoutComponent } from 'src/app/containers/default-layout/default-layout.component';
import { AccordionsComponent } from '../base/accordion/accordions.component';
import { ButtonGroupsComponent } from '../buttons/button-groups/button-groups.component';
import { BreadcrumbsComponent } from '../base/breadcrumbs/breadcrumbs.component';

const routes: Routes = [
  {path:'',component:DefaultLayoutComponent,children:[
   
    

   
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'slider', 
      },
      {
        path: 'slider',
        component: ColorsComponent,
        data: {
          title: 'Colors',
        },
      },
      {
        path: 'report',
        component: BreadcrumbsComponent,
        data: {
          title: 'Report',
        },
      },
      {
        path: 'our_supporter',
        component: TypographyComponent,
        data: {
          title: 'Typography',
        },
      },
      {
        path: 'accordion',
        component: AccordionsComponent,
        data: {
          title: 'Accordion',
        },
      },
      {
        path: 'home_article',
        component: ButtonGroupsComponent,
        data: {
          title: 'Button groups'
        }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThemeRoutingModule {}
