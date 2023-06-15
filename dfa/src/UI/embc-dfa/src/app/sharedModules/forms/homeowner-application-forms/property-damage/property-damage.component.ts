import { Component, OnInit, NgModule, Inject, OnDestroy } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormCreationService } from 'src/app/core/services/formCreation.service';
import { Subscription } from 'rxjs';
import { DirectivesModule } from '../../../../core/directives/directives.module';
import { CustomValidationService } from 'src/app/core/services/customValidation.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-property-damage',
  templateUrl: './property-damage.component.html',
  styleUrls: ['./property-damage.component.scss']
})
export default class PropertyDamageComponent implements OnInit, OnDestroy {
  propertyDamageForm: UntypedFormGroup;
  formBuilder: UntypedFormBuilder;
  propertyDamageForm$: Subscription;
  formCreationService: FormCreationService;

  constructor(
    @Inject('formBuilder') formBuilder: UntypedFormBuilder,
    @Inject('formCreationService') formCreationService: FormCreationService,
    public customValidator: CustomValidationService
  ) {
    this.formBuilder = formBuilder;
    this.formCreationService = formCreationService;
  }

  ngOnInit(): void {
    this.propertyDamageForm$ = this.formCreationService
      .getPropertyDamageForm()
      .subscribe((propertyDamage) => {
        this.propertyDamageForm = propertyDamage;
        this.propertyDamageForm.updateValueAndValidity();
      });

    this.propertyDamageForm
      .get('field')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.propertyDamageForm.get('field').reset();
        }
      });

    // TODO: Implement the correct setting of this value, will it be a radio button or checkbox??
    this.propertyDamageForm.get('field').setValue(true);
  }

  /**
   * Returns the control of the form
   */
  get propertyDamageFormControl(): { [key: string]: AbstractControl } {
    return this.propertyDamageForm.controls;
  }

  updateOnVisibility(): void {
    this.propertyDamageForm.get('field').updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.propertyDamageForm$.unsubscribe();
  }
}

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    DirectivesModule,
  ],
  declarations: [PropertyDamageComponent]
})
class PropertyDamageModule {}
