import { Component, OnInit, NgModule, Inject, OnDestroy, EventEmitter } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  AbstractControl,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, KeyValue } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormCreationService } from 'src/app/core/services/formCreation.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DirectivesModule } from '../../../../core/directives/directives.module';
import { CustomValidationService } from 'src/app/core/services/customValidation.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { SmallBusinessOption, ApplicantOption, SignatureBlock, InsuranceOption, FarmOption } from 'src/app/core/api/models';
import { DFAEligibilityDialogComponent } from 'src/app/core/components/dialog-components/dfa-eligibility-dialog/dfa-eligibility-dialog.component';
import * as globalConst from '../../../../core/services/globalConstants';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { CoreModule } from 'src/app/core/core.module';

@Component({
  selector: 'apptype-insurance',
  templateUrl: './apptype-insurance.component.html',
  styleUrls: ['./apptype-insurance.component.scss']
})
export default class AppTypeInsuranceComponent implements OnInit, OnDestroy {
  appTypeInsuranceForm: UntypedFormGroup;
  notInsured: boolean = false;
  formBuilder: UntypedFormBuilder;
  appTypeInsuranceForm$: Subscription;
  formCreationService: FormCreationService;
  radioApplicantOptions = ApplicantOption;
  radioInsuranceOptions = InsuranceOption;
  radioSmallBusinessOptions = SmallBusinessOption;
  radioFarmOptions = FarmOption;
  showOtherDocuments: boolean = false;

  constructor(
    @Inject('formBuilder') formBuilder: UntypedFormBuilder,
    @Inject('formCreationService') formCreationService: FormCreationService,
    public customValidator: CustomValidationService,
    public dialog: MatDialog,
    private router: Router,

  ) {
    this.formBuilder = formBuilder;
    this.formCreationService = formCreationService;
  }

  ngOnInit(): void {
    this.appTypeInsuranceForm$ = this.formCreationService
      .getAppTypeInsuranceForm()
      .subscribe((appTypeInsurance) => {
        this.appTypeInsuranceForm = appTypeInsurance;
        this.appTypeInsuranceForm.updateValueAndValidity();
        // add form level validator to check that insurance option is not set to yes
        this.appTypeInsuranceForm.addValidators([ValidateInsuranceOption.notFullInsurance('insuranceOption', InsuranceOption.Yes)]);
      });

    this.appTypeInsuranceForm
      .get('applicantOption')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.appTypeInsuranceForm.get('applicantOption').reset();
        }
        if (value === ApplicantOption.SmallBusinessOwner) {
          this.appTypeInsuranceForm.get('smallBusinessOption').setValidators([Validators.required]);
          this.appTypeInsuranceForm.get('farmOption').setValidators(null);
          this.appTypeInsuranceForm.updateValueAndValidity();
        } else if (value === ApplicantOption.FarmOwner) {
          this.appTypeInsuranceForm.get('smallBusinessOption').setValidators(null);
          this.appTypeInsuranceForm.get('farmOption').setValidators([Validators.required]);
          this.appTypeInsuranceForm.updateValueAndValidity();
        } else {
          this.appTypeInsuranceForm.get('smallBusinessOption').setValidators(null);
          this.appTypeInsuranceForm.get('farmOption').setValidators(null);
          this.appTypeInsuranceForm.updateValueAndValidity();
        }
      });

    let fullyInsuredEnumKey = Object.keys(InsuranceOption)[Object.values(InsuranceOption).indexOf(InsuranceOption.Yes)];
    let notInsuredEnumKey = Object.keys(InsuranceOption)[Object.values(InsuranceOption).indexOf(InsuranceOption.No)];

    this.appTypeInsuranceForm
      .get('insuranceOption')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.appTypeInsuranceForm.get('insuranceOption').reset();
          this.notInsured = false;
        } else if (value === fullyInsuredEnumKey) {
          this.yesFullyInsured();
          this.notInsured = false;
        } else if (value === notInsuredEnumKey) {
          this.notInsured = true;
        } else this.notInsured = false;
        this.formCreationService.insuranceOptionChanged.emit(value);
        this.appTypeInsuranceForm.updateValueAndValidity();
      });

    this.appTypeInsuranceForm
      .get('smallBusinessOption')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.appTypeInsuranceForm.get('smallBusinessOption').reset();
        }
      });

    this.appTypeInsuranceForm
      .get('farmOption')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.appTypeInsuranceForm.get('farmOption').reset();
        }
      });

  }

  updateApplicantSignature(event: SignatureBlock) {
    this.appTypeInsuranceForm.get('applicantSignature').get('signedName').setValue(event.signedName);
    this.appTypeInsuranceForm.get('applicantSignature').get('dateSigned').setValue(event.dateSigned);
    this.appTypeInsuranceForm.get('applicantSignature').get('signature').setValue(event.signature);
  }

  updateSecondaryApplicantSignature(event: SignatureBlock) {
    this.appTypeInsuranceForm.get('secondaryApplicantSignature').get('signedName').setValue(event.signedName);
    this.appTypeInsuranceForm.get('secondaryApplicantSignature').get('dateSigned').setValue(event.dateSigned);
    this.appTypeInsuranceForm.get('secondaryApplicantSignature').get('signature').setValue(event.signature);
  }

  yesFullyInsured(): void {
    this.dialog
      .open(DFAEligibilityDialogComponent, {
        data: {
          content: globalConst.yesFullyInsuredBody
        },
        height: '400px',
        width: '700px',
        disableClose: true
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'cancel') {
          this.cancelApplication();
          }
        else if (result === 'confirm') {
          this.appTypeInsuranceForm.controls.insuranceOption.setValue(this.radioInsuranceOptions.Yes);
        }
        else this.appTypeInsuranceForm.controls.insuranceOption.setValue(null);
      });
  }

  cancelApplication(): void {
    // TODO: Add application cancellation
    this.router.navigate(['/verified-registration/dashboard']);
  }

  public onToggleOtherDocuments() {
    this.showOtherDocuments = !this.showOtherDocuments;
  }

  // Preserve original property order
  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }

  /**
   * Returns the control of the form
   */
  get appTypeInsuranceFormControl(): { [key: string]: AbstractControl } {
    return this.appTypeInsuranceForm.controls;
  }

  updateOnVisibility(): void {
    this.appTypeInsuranceForm.get('appTypeInsurance').updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.appTypeInsuranceForm$.unsubscribe();
  }
}

// Form Level Validator cant proceed to next step if insurance is 'Yes'
export class ValidateInsuranceOption {
  static notFullInsurance(controlName: string, badOption: InsuranceOption): ValidatorFn {

    return (controls: AbstractControl) => {
      const control = controls.get(controlName);

      let enumKey = Object.keys(InsuranceOption)[Object.values(InsuranceOption).indexOf(badOption)];
      if (control.value !== enumKey) {
        return null;
      }
      else {
        control.setErrors({ notFullInsurance: true});
        return { notFullInsurance: true };
      }
    };
  }
}

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    MatCardModule,
    MatFormFieldModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    DirectivesModule,
  ],
  declarations: [AppTypeInsuranceComponent]
})
class AppTypeInsuranceModule {}
