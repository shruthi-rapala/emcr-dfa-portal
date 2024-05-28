import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DFAProjectComponent } from './dfa-project-dashboard.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { ComponentWrapperModule } from '../../sharedModules/components/component-wrapper/component-wrapper.module';
import { ReviewModule } from '../review/review.module';
import { CoreModule } from '../../core/core.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { DFAProjectRoutingModule } from './dfa-project-dashboard-routing.module';

@NgModule({
  declarations: [DFAProjectComponent],
  imports: [
    CommonModule,
    DFAProjectRoutingModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatSelectModule,
    ComponentWrapperModule,
    ReviewModule,
    CoreModule,
    MatTooltipModule,
    MatTabsModule
  ]
})
export class DFAProjectModule {}
