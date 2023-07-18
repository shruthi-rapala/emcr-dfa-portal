import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { SignatureBlock } from 'src/app/core/api/models';
import { ApplicantOption, SmallBusinessOption, FarmOption, InsuranceOption, DfaApplicationStart } from '../api/models';

export class Consent {
  consent: boolean;

  constructor(
    consent?: boolean
  ) {}
}

export class ConsentForm {
  consent = new UntypedFormControl();

  constructor(
    consent: Consent
  ) {
    if (consent.consent) {
      this.consent.setValue(consent.consent);
    }

    this.consent.setValidators([Validators.required]);
  }
}

export class ProfileVerification {
  profileVerified: boolean;
  profileId: string;

  constructor(
    profileVerified?: boolean,
    profileId?: string
  ) {}
}

export class ProfileVerificationForm {
  profileVerified = new UntypedFormControl();
  profileId = new UntypedFormControl();

  constructor(
    profileVerification: ProfileVerification
  ) {
    this.profileVerified.setValidators([Validators.required]);
    this.profileVerified.setValue(profileVerification.profileVerified);

    this.profileId.setValue(profileVerification.profileId);
    this.profileId.setValidators([Validators.required]);
  }
}

export class AppTypeInsurance {
  applicantOption: ApplicantOption;
  insuranceOption: InsuranceOption;
  smallBusinessOption: SmallBusinessOption;
  farmOption: FarmOption;
  applicantSignature: SignatureBlock;
  secondaryApplicantSignature: SignatureBlock;

  constructor(
    applicantOption?: ApplicantOption,
    insuranceOption?: InsuranceOption,
    smallBusinessOption?: SmallBusinessOption,
    farmOption?: FarmOption,
    applicantSignature?: SignatureBlock,
    secondaryApplicantSignature?: SignatureBlock
  ) {   }
}

export class AppTypeInsuranceForm {
  applicantOption = new UntypedFormControl();
  insuranceOption = new UntypedFormControl();
  smallBusinessOption = new UntypedFormControl();
  farmOption = new UntypedFormControl();
  applicantSignature: UntypedFormGroup;
  secondaryApplicantSignature: UntypedFormGroup;

  constructor(
    appTypeInsurance: AppTypeInsurance,
    fb: UntypedFormBuilder
  ) {
    if (appTypeInsurance.applicantOption) {
      this.applicantOption.setValue(appTypeInsurance.applicantOption);
    }

    this.applicantOption.setValidators([Validators.required]);

    this.insuranceOption.setValue(appTypeInsurance.insuranceOption);
    this.insuranceOption.setValidators([Validators.required]);
    this.smallBusinessOption.setValue(appTypeInsurance.smallBusinessOption);
    this.farmOption.setValue(appTypeInsurance.farmOption);

    this.applicantSignature = fb.group({
      signature: null,
      dateSigned: null,
      signedName: null
    });
    this.applicantSignature?.controls.signature.setValue(appTypeInsurance?.applicantSignature?.signature);
    this.applicantSignature?.controls.dateSigned.setValue(appTypeInsurance?.applicantSignature?.dateSigned);
    this.applicantSignature?.controls.signedName.setValue(appTypeInsurance?.applicantSignature?.signedName);

    this.secondaryApplicantSignature = fb.group({
      signature: null,
      dateSigned: null,
      signedName: null
    });
    this.secondaryApplicantSignature?.controls.signature.setValue(appTypeInsurance?.secondaryApplicantSignature?.signature);
    this.secondaryApplicantSignature?.controls.dateSigned.setValue(appTypeInsurance?.secondaryApplicantSignature?.dateSigned);
    this.secondaryApplicantSignature?.controls.signedName.setValue(appTypeInsurance?.secondaryApplicantSignature?.signedName);
  }
}
