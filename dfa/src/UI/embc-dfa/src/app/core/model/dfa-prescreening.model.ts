import {
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { Profile } from 'src/app/core/api/models';
import { ApplicantOption, InsuranceOption } from '../api/models';
import { CustomValidationService } from '../services/customValidation.service';

export class DfaPrescreening {
  applicantOption: ApplicantOption;
  insuranceOption: InsuranceOption;
  profileId: string;
  profile: Profile;
  addressLine1?: null | string;
  addressLine2?: null | string;
  city?: null | string;
  isPrimaryAndDamagedAddressSame?: null | boolean;
  lossesExceed1000?: null | boolean;
  postalCode?: null | string;
  stateProvince?: null | string;
  damageCausedByDisaster?: null | boolean;
  damageFromDate?: null | string;

  constructor(
    applicantOption?: ApplicantOption,
    insuranceOption?: InsuranceOption,
    profileId?: string,
    profile?: Profile,
    addressLine1?: null | string,
    addressLine2?: null | string,
    city?: null | string,
    isPrimaryAndDamagedAddressSame?: null | boolean,
    lossesExceed1000?: null | boolean,
    postalCode?: null | string,
    stateProvince?: null | string,
    damageCausedByDisaster?: null | boolean,
    damageFromDate?: null | string
    ) {}
}

export class DfaPrescreeningForm {
  profileId = new UntypedFormControl();
  addressLine1 = new UntypedFormControl();
  addressLine2 = new UntypedFormControl();
  city = new UntypedFormControl();
  stateProvince = new UntypedFormControl();
  postalCode = new UntypedFormControl();
  isPrimaryAndDamagedAddressSame = new UntypedFormControl();
  applicantOption = new UntypedFormControl();
  insuranceOption = new UntypedFormControl();
  lossesExceed1000 = new UntypedFormControl();
  damageCausedByDisaster = new UntypedFormControl();
  damageFromDate = new UntypedFormControl();

  constructor(
    prescreening: DfaPrescreening,
    customValidator: CustomValidationService
  ) {

    this.profileId.setValue(prescreening.profileId);
    this.profileId.setValidators([Validators.required]);

    if (prescreening.addressLine1) {
      this.addressLine1.setValue(prescreening.addressLine1);
    }
    this.addressLine1.setValidators([Validators.required,
      customValidator
        .maxLengthValidator(100)
        .bind(customValidator)
      ]);

    if (prescreening.addressLine2) {
      this.addressLine2.setValue(prescreening.addressLine2);
    }
    this.addressLine2.setValidators([
      customValidator
        .maxLengthValidator(100)
        .bind(customValidator)
      ]);

    if (prescreening.city) {
      this.city.setValue(prescreening.city);
    }
    this.city.setValidators([Validators.required,
      customValidator
        .maxLengthValidator(100)
        .bind(customValidator)
    ]);

    if (prescreening.postalCode) {
      this.postalCode.setValue(prescreening.postalCode);
    }
    this.postalCode.setValidators([Validators.required, Validators.pattern(/^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/)]);

    if (prescreening.stateProvince) {
      this.stateProvince.setValue(prescreening.stateProvince);
    }
    this.stateProvince.setValidators([Validators.required,
      customValidator
      .maxLengthValidator(100)
      .bind(customValidator)
    ]);

    if (prescreening.isPrimaryAndDamagedAddressSame) {
      this.isPrimaryAndDamagedAddressSame.setValue(prescreening.isPrimaryAndDamagedAddressSame);
    }
    this.isPrimaryAndDamagedAddressSame.setValidators([Validators.required]);

    if (prescreening.applicantOption) {
      this.applicantOption.setValue(prescreening.applicantOption);
    }
    this.applicantOption.setValidators([Validators.required]);

    this.insuranceOption.setValue(prescreening.insuranceOption);
    this.insuranceOption.setValidators([Validators.required]);

    if (prescreening.lossesExceed1000) {
      this.lossesExceed1000.setValue(prescreening.lossesExceed1000);
    }
    this.lossesExceed1000.setValidators([Validators.required]);

    if (prescreening.damageFromDate) {
      this.damageFromDate.setValue(prescreening.damageFromDate);
    }
    this.damageFromDate.setValidators([Validators.required]);

    if (prescreening.damageCausedByDisaster) {
      this.damageCausedByDisaster.setValue(prescreening.damageCausedByDisaster);
    }
    this.damageCausedByDisaster.setValidators([Validators.required]);
  }
}
