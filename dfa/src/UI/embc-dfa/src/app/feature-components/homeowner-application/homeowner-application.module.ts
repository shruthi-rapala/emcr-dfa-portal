import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeOwnerApplicationRoutingModule } from './homeowner-application-routing.module';
import { HomeOwnerApplicationComponent } from './homeowner-application.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { ComponentWrapperModule } from '../../sharedModules/components/component-wrapper/component-wrapper.module';
import { ReviewModule } from '../review/review.module';
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [HomeOwnerApplicationComponent],
  imports: [
    CommonModule,
    HomeOwnerApplicationRoutingModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatSelectModule,
    ComponentWrapperModule,
    ReviewModule,
    CoreModule
  ]
})
export class HomeOwnerApplicationModule {}
