import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { ButtonsComponent } from './buttons/buttons.component';
import { ButtonGroupsComponent } from './button-groups/button-groups.component';
import { DropdownsComponent } from './dropdowns/dropdowns.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ButtonsRoutingModule } from './buttons-routing.module';

import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  NavbarModule,
  NavModule,
  SharedModule,
  UtilitiesModule
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';

@NgModule({
  declarations: [
    ButtonsComponent,
    ButtonGroupsComponent,
    DropdownsComponent,
  ],
  imports: [
    CommonModule,
    ButtonsRoutingModule,
    ButtonModule,
    ButtonGroupModule,
    GridModule,
    IconModule,
    CardModule,
    UtilitiesModule,
    DropdownModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DocsComponentsModule,
    NavbarModule,
    CollapseModule,
    NavModule,
    NavbarModule,
    MatPaginatorModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule
  ]

})
export class ButtonsModule {
}
