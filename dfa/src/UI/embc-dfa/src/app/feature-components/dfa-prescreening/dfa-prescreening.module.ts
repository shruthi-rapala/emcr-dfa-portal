import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DFAPrescreeningRoutingModule } from './dfa-prescreening-routing.module';
import { DFAPrescreeningComponent } from './dfa-prescreening.component';
import { MatSelectModule } from '@angular/material/select';
import { ComponentWrapperModule } from '../../sharedModules/components/component-wrapper/component-wrapper.module';
import { ReviewModule } from '../review/review.module';
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [DFAPrescreeningComponent],
  imports: [
    CommonModule,
    DFAPrescreeningRoutingModule,
    ReactiveFormsModule,
    MatSelectModule,
    ComponentWrapperModule,
    ReviewModule,
    CoreModule
  ]
})
export class DFAPrescreeningModule {}
