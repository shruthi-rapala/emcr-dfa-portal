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
import { Address, ApplicantOption, InsuranceOption } from 'src/app/core/api/models';
import { DFAEligibilityDialogComponent } from 'src/app/core/components/dialog-components/dfa-eligibility-dialog/dfa-eligibility-dialog.component';
import * as globalConst from '../../../../core/services/globalConstants';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { CoreModule } from 'src/app/core/core.module';
import { DialogContent } from 'src/app/core/model/dialog-content.model';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { ProfileService } from 'src/app/core/api/services';
import { AddressFormsModule } from '../../address-forms/address-forms.module';

@Component({
  selector: 'prescreening',
  templateUrl: './prescreening.component.html',
  styleUrls: ['./prescreening.component.scss']
})
export default class PrescreeningComponent implements OnInit, OnDestroy {
  prescreeningForm: UntypedFormGroup;
  notInsured: boolean = false;
  formBuilder: UntypedFormBuilder;
  prescreeningForm$: Subscription;
  formCreationService: FormCreationService;
  radioApplicantOptions = ApplicantOption;
  radioInsuranceOptions = InsuranceOption;
  showOtherDocuments: boolean = false;
  private _profileAddress: Address;
  todayDate = new Date().toISOString();
  addressWithinOpenEvent: boolean = false;
  dateWithinOpenEvent: boolean = false;
  isValidAddress: boolean = false;

  constructor(
    @Inject('formBuilder') formBuilder: UntypedFormBuilder,
    @Inject('formCreationService') formCreationService: FormCreationService,
    public customValidator: CustomValidationService,
    public dialog: MatDialog,
    private router: Router,
    private profileService: ProfileService
  ) {
    this.formBuilder = formBuilder;
    this.formCreationService = formCreationService;
  }

  public get profileAddress(): Address {
    return this._profileAddress;
  }
  public set profileAddress(value: Address) {
    this._profileAddress = value;
  }

  ngOnInit(): void {
    this.prescreeningForm$ = this.formCreationService
      .getDfaPrescreeningForm()
      .subscribe((prescreening) => {
        this.prescreeningForm = prescreening;
        this.prescreeningForm.updateValueAndValidity();
        // add form level validator to check that insurance option is not set to yes
        this.prescreeningForm.addValidators([ValidateInsuranceOption.notFullInsurance('insuranceOption', InsuranceOption.Yes)]);
      });

    this.profileService.profileGetProfile().subscribe(profile => {
        this.profileAddress = {
          addressLine1: profile?.primaryAddress?.addressLine1,
          addressLine2: profile?.primaryAddress?.addressLine2,
          postalCode: profile?.primaryAddress?.postalCode,
          stateProvince: profile?.primaryAddress?.stateProvince ? profile.primaryAddress?.stateProvince : "BC",
          city: profile?.primaryAddress?.city
        }
    })

    this.prescreeningForm
      .get('applicantOption')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.prescreeningForm.get('applicantOption').reset();
        }
        this.formCreationService.applicantOptionChanged.emit();
        this.prescreeningForm.updateValueAndValidity();
        });

    let fullyInsuredEnumKey = Object.keys(InsuranceOption)[Object.values(InsuranceOption).indexOf(InsuranceOption.Yes)];
    let notInsuredEnumKey = Object.keys(InsuranceOption)[Object.values(InsuranceOption).indexOf(InsuranceOption.No)];
    let unsureEnumKey = Object.keys(InsuranceOption)[Object.values(InsuranceOption).indexOf(InsuranceOption.Unsure)];

    this.prescreeningForm
      .get('insuranceOption')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.prescreeningForm.get('insuranceOption').reset();
          this.notInsured = false;
        } else if (value === fullyInsuredEnumKey) {
          this.yesFullyInsured();
          this.notInsured = false;
        } else if (value === notInsuredEnumKey) {
          this.notInsured = true;
        } else if (value === unsureEnumKey) {
          this.notInsured = false;
        }
        this.prescreeningForm.updateValueAndValidity();
        this.formCreationService.insuranceOptionChanged.emit();
      });

    this.prescreeningForm
      .get('damageCausedByDisaster')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '')
          this.prescreeningForm.get('damageCausedByDisaster').reset();
        else if (value === 'false')
          this.dontContinuePrescreening(globalConst.damageNotCausedByDisasterBody, "damageCausedByDisaster");
      });

    this.prescreeningForm
      .get('lossesExceed1000')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '')
          this.prescreeningForm.get('lossesExceed1000').reset();
        else if (value === 'false')
          this.dontContinuePrescreening(globalConst.lossesDontExceed1000, "lossesExceed1000");
      });

    this.prescreeningForm
      .get('damageFromDate')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '')
          this.prescreeningForm.get('damageFromDate').reset();
      });

    this.prescreeningForm
      .get('addressLine1')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '')
          this.prescreeningForm.get('addressLine1').reset();
        this.checkIsValidAddress();
      });

    this.prescreeningForm
      .get('addressLine2')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '')
          this.prescreeningForm.get('addressLine2').reset();
        this.checkIsValidAddress();
      });

    this.prescreeningForm
      .get('city')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '')
          this.prescreeningForm.get('city').reset();
        this.checkIsValidAddress();
      });

    this.prescreeningForm
      .get('community')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.prescreeningForm.get('community').reset();
        } else this.prescreeningForm.get('city').setValue(this.prescreeningForm.get('community').value);
        this.checkIsValidAddress();
      });

    this.prescreeningForm
      .get('postalCode')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '')
          this.prescreeningForm.get('postalCode').reset();
        this.checkIsValidAddress();
      });

    this.prescreeningForm
      .get('stateProvince')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '')
          this.prescreeningForm.get('stateProvince').reset();
        this.checkIsValidAddress();
      });
  }

  checkIsValidAddress() {
    if (this.prescreeningForm.controls.addressLine1.valid &&
      this.prescreeningForm.controls.city.valid &&
      this.prescreeningForm.controls.postalCode.valid &&
      this.prescreeningForm.controls.stateProvince.valid)
      this.isValidAddress = true;
    else this.isValidAddress = false;
    this.addressWithinOpenEvent = false;
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
          this.cancelPrescreening();
          }
        else if (result === 'confirm') {
          this.prescreeningForm.controls.insuranceOption.setValue(Object.keys(InsuranceOption)[Object.values(InsuranceOption).indexOf(InsuranceOption.No)]);
          this.prescreeningForm.updateValueAndValidity();
        }
        else this.prescreeningForm.controls.insuranceOption.setValue(null);
        this.formCreationService.insuranceOptionChanged.emit();
      });
  }

  onUseProfileAddressChoice(choice: any) {
    this.prescreeningForm.controls.stateProvince.setValue("BC");
    if (!choice.value) return; // not a radio button change
    if (choice.value == 'true') // yes
    {
      this.prescreeningForm.controls.addressLine1.setValue(this.profileAddress.addressLine1);
      this.prescreeningForm.controls.addressLine2.setValue(this.profileAddress.addressLine2);
      this.prescreeningForm.controls.city.setValue(this.profileAddress.city);
      this.prescreeningForm.controls.stateProvince.setValue(this.profileAddress.stateProvince);
      this.prescreeningForm.controls.postalCode.setValue(this.profileAddress.postalCode);
    } else { // no
      this.prescreeningForm.controls.addressLine1.setValue(null);
      this.prescreeningForm.controls.addressLine2.setValue(null);
      this.prescreeningForm.controls.city.setValue(null);
      this.prescreeningForm.controls.postalCode.setValue(null);
    }
    this.checkIsValidAddress();
  }

  public onToggleOtherDocuments() {
    this.showOtherDocuments = !this.showOtherDocuments;
  }

  dontContinuePrescreening(content: DialogContent, controlName: string) {
    this.dialog
      .open(DFAEligibilityDialogComponent, {
        data: {
          content: content
        },
        width: '700px',
        disableClose: true
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'cancel') {
          this.cancelPrescreening();
          }
        else if (result === 'confirm') {
          this.prescreeningForm.get(controlName).setValue("true");
        }
        else this.prescreeningForm.get(controlName).setValue(null);
      });
  }

  cancelPrescreening(): void {
    // TODO: Add application cancellation
    this.router.navigate(['/dfa-dashboard']);
  }

  checkAddressWithinOpenEvent(): void {
    // TODO: check if address with GeoBC data
    this.addressWithinOpenEvent = false;
    if (this.addressWithinOpenEvent == false) {
      this.dialog
      .open(DFAEligibilityDialogComponent, {
        data: {
          content: globalConst.addressNotWithinOpenEvent
        },
        width: '700px',
        disableClose: true
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'cancel') {
          this.cancelPrescreening();
        }
      });
    }
  }

  checkDateWithinOpenEvent(): void {
    this.dateWithinOpenEvent = false;
    // TODO: check if date withing open event matched by address
    if (this.addressWithinOpenEvent == false || this.dateWithinOpenEvent == false) {
      this.dialog
      .open(DFAEligibilityDialogComponent, {
        data: {
          content: globalConst.addressNotWithinOpenEvent
        },
        width: '700px',
        disableClose: true
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'cancel') {
          this.cancelPrescreening();
        }
      });
    }
  }

  // Preserve original property order
  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }

  /**
   * Returns the control of the form
   */
  get prescreeningFormControl(): { [key: string]: AbstractControl } {
    return this.prescreeningForm.controls;
  }

  updateOnVisibility(): void {
    this.prescreeningForm.controls.lossesExceed1000.updateValueAndValidity();
    this.prescreeningForm.controls.insuranceOption.updateValueAndValidity();
    this.prescreeningForm.controls.applicantOption.updateValueAndValidity();
    this.prescreeningForm.controls.damageCausedByDisaster.updateValueAndValidity();
    this.prescreeningForm.controls.damgeFromDate.updateValueAndValidity();
    this.prescreeningForm.controls.addressLine1.updateValueAndValidity();
    this.prescreeningForm.controls.addressLine2.updateValueAndValidity();
    this.prescreeningForm.controls.city.updateValueAndValidity();
    this.prescreeningForm.controls.postalCode.updateValueAndValidity();
    this.prescreeningForm.controls.stateProvince.updateValueAndValidity();
    this.prescreeningForm.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.prescreeningForm$.unsubscribe();
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
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    AddressFormsModule
  ],
  declarations: [PrescreeningComponent]
})
class AppTypeInsuranceModule {}
