import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FloatingLabelsComponent } from './floating-labels/floating-labels.component';
import { FormControlsComponent } from './form-controls/form-controls.component';
import { InputGroupsComponent } from './input-groups/input-groups.component';
import { RangesComponent } from './ranges/ranges.component';
import { SelectComponent } from './select/select.component';
import { ChecksRadiosComponent } from './checks-radios/checks-radios.component';
import { LayoutComponent } from './layout/layout.component';
import { ValidationComponent } from './validation/validation.component';
import { DefaultLayoutComponent } from 'src/app/containers/default-layout/default-layout.component';
import { NewsArticlesComponent } from './news-articles/news-articles.component';
import { MentorsComponent } from './mentors/mentors.component';
import { FounderTeamComponent } from './founder-team/founder-team.component';
import { NriParticipantsComponent } from './nri-participants/nri-participants.component';
import { StateParticipantsComponent } from './state-participants/state-participants.component';


const routes: Routes = [
  {path:'',component:DefaultLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'form-control'
      },
      {
        path: 'form-control',
        component: FormControlsComponent,
        data: {
          title: 'Form Control'
        }
      },
      {
        path: 'nationsupporter',
        component: SelectComponent,
        data: {
          title: 'Select'
        }
      },
      {
        path: 'checks-radios',
        component: ChecksRadiosComponent,
        data: {
          title: 'Checks & Radios'
        }
      },
      {
        path: 'range',
        component: RangesComponent,
        data: {
          title: 'Range'
        }
      },
      {
        path: 'input-group',
        component: InputGroupsComponent,
        data: {
          title: 'Input Group'
        }
      },
      {
        path: 'floating-labels',
        component: FloatingLabelsComponent,
        data: {
          title: 'Floating Labels'
        }
      },
      {
        path: 'layout',
        component: LayoutComponent,
        data: {
          title: 'Layout'
        }
      },
      {
        path: 'supporters',
        component: ValidationComponent,
        data: {
          title: 'Validation'
        }
      },
      {
        path:'news-articles',
        component:NewsArticlesComponent,
        data:{
          Title:'news-articles'
        }
      },
      {
        path:'mentors',
        component:MentorsComponent,
        data:{
          title:'mentors'
        }
      },
      {
        path:'founder-team',
        component:FounderTeamComponent,
        data:{
          title:'founder-team'
        }
      },
      {
        path:'nri-participants',
        component:NriParticipantsComponent,
        data:{
          title:'nri-participants'
        }
      },
      {
        path:'state',
        component:StateParticipantsComponent,
        data:{
          title:'state'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule {
}
