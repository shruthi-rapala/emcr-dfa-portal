import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DFAApplicationStartRoutingModule } from './dfa-application-start-routing.module';
import { DFAApplicationStartComponent } from './dfa-application-start.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { ComponentWrapperModule } from '../../sharedModules/components/component-wrapper/component-wrapper.module';
import { ReviewModule } from '../review/review.module';
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [DFAApplicationStartComponent],
  imports: [
    CommonModule,
    DFAApplicationStartRoutingModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatSelectModule,
    MatAutocompleteModule,
    ComponentWrapperModule,
    ReviewModule,
    CoreModule
  ]
})
export class DFAApplicationStartModule {}
