import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeModule, CardModule, GridModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { ChartsComponent } from './charts.component';
import { ChartsRoutingModule } from './charts-routing.module';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [ChartsComponent],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    ChartjsModule,
    CardModule,
    GridModule,
    BadgeModule,
    DocsComponentsModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
  ]
})
export class ChartsModule {
}
