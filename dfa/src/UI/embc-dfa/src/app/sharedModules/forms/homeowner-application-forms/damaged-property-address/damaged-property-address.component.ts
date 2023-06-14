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
  selector: 'app-damaged-property-address',
  templateUrl: './damaged-property-address.component.html',
  styleUrls: ['./damaged-property-address.component.scss']
})
export default class DamagedPropertyAddressComponent implements OnInit, OnDestroy {
  damagedPropertyAddressForm: UntypedFormGroup;
  formBuilder: UntypedFormBuilder;
  damagedPropertyAddressForm$: Subscription;
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
    this.damagedPropertyAddressForm$ = this.formCreationService
      .getDamagedPropertyAddressForm()
      .subscribe((damagedPropertyAddress) => {
        this.damagedPropertyAddressForm = damagedPropertyAddress;
        this.damagedPropertyAddressForm.updateValueAndValidity();
      });

    this.damagedPropertyAddressForm
      .get('addressLine1')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.damagedPropertyAddressForm.get('addressLine1').reset();
        }
      });
  }

  /**
   * Returns the control of the form
   */
  get damagedPropertyAddressFormControl(): { [key: string]: AbstractControl } {
    return this.damagedPropertyAddressForm.controls;
  }

  updateOnVisibility(): void {
    this.damagedPropertyAddressForm.get('addressLine1').updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.damagedPropertyAddressForm$.unsubscribe();
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
  declarations: [DamagedPropertyAddressComponent]
})
class DamagedPropertyAddressModule {}
