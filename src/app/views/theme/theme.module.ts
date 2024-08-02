import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardModule, GridModule, NavModule, UtilitiesModule, TabsModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { ColorsComponent } from './colors.component';
import { TypographyComponent } from './typography.component';

// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DocsComponentsModule } from '@docs-components/docs-components.module';


@NgModule({
  imports: [
    CommonModule,
    ThemeRoutingModule,
    CardModule,
    GridModule,
    UtilitiesModule,
    IconModule,
    NavModule,
    TabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    DocsComponentsModule
  ],
  declarations: [
    ColorsComponent,
    
    TypographyComponent,
  ]
})
export class ThemeModule {
}
