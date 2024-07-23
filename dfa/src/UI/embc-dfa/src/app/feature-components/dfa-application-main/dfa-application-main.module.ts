import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DFAApplicationMainRoutingModule } from './dfa-application-main-routing.module';
import { DFAApplicationMainComponent } from './dfa-application-main.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { ComponentWrapperModule } from '../../sharedModules/components/component-wrapper/component-wrapper.module';
import { ReviewModule } from '../review/review.module';
import { CoreModule } from '../../core/core.module';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

@NgModule({
  declarations: [DFAApplicationMainComponent],
  imports: [
    CommonModule,
    DFAApplicationMainRoutingModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatSelectModule,
    ComponentWrapperModule,
    ReviewModule,
    CoreModule,
    MatTooltipModule
  ]
})
export class DFAApplicationMainModule {}
