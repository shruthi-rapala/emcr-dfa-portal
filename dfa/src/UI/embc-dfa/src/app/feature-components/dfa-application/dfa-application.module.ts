import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DFAApplicationRoutingModule } from './dfa-application-routing.module';
import { DFAApplicationComponent } from './dfa-application.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ComponentWrapperModule } from '../../sharedModules/components/component-wrapper/component-wrapper.module';
import { ReviewModule } from '../review/review.module';
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [DFAApplicationComponent],
  imports: [
    CommonModule,
    DFAApplicationRoutingModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatSelectModule,
    MatAutocompleteModule,
    ComponentWrapperModule,
    ReviewModule,
    CoreModule
  ]
})
export class DFAApplicationModule {}
