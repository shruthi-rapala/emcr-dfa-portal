import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    MatTabsModule,
    CoreModule
  ]
})
export class DashboardModule {}
