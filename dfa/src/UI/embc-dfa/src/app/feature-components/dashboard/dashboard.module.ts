import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ReviewModule } from '../review/review.module';
import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    MatTabsModule,
    ReviewModule,
    CoreModule
  ]
})
export class DashboardModule { }
