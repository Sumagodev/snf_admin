import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ButtonsComponent } from './buttons/buttons.component';
import { ButtonGroupsComponent } from './button-groups/button-groups.component';
import { DropdownsComponent } from './dropdowns/dropdowns.component';
import { DefaultLayoutComponent } from 'src/app/containers/default-layout/default-layout.component';

const routes: Routes = [
  {path:'',component:DefaultLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'buttons'
      },
      {
        path: 'articles',
        component: ButtonsComponent,
        data: {
          title: 'Buttons'
        }
      },
      // {
      //   path: 'home_article',
      //   component: ButtonGroupsComponent,
      //   data: {
      //     title: 'Button groups'
      //   }
      // },
      {
        path: 'recognition',
        component: DropdownsComponent,
        data: {
          title: 'Dropdowns'
        }
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ButtonsRoutingModule {
}
