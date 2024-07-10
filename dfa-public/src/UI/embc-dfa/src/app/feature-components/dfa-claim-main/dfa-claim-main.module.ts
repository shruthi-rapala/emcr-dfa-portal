import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { ComponentWrapperModule } from '../../sharedModules/components/component-wrapper/component-wrapper.module';
import { ReviewProjectModule } from '../review-project//review-project.module';
import { CoreModule } from '../../core/core.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DFAClaimMainRoutingModule } from './dfa-claim-main-routing.module';
import { DFAClaimMainComponent } from './dfa-claim-main.component';

@NgModule({
  declarations: [DFAClaimMainComponent],
  imports: [
    CommonModule,
    DFAClaimMainRoutingModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatSelectModule,
    ComponentWrapperModule,
    ReviewProjectModule,
    CoreModule,
    MatTooltipModule
  ]
})
export class DFAClaimMainModule {}
