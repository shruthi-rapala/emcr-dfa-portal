import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Community, Country, StateProvince } from './address';
import { CustomValidationService } from '../services/customValidation.service';
import { SignatureBlock, SecondaryApplicantTypeOption, FileCategory, RoomType } from 'src/app/core/api/models';

export class DamagedPropertyAddress {
  addressLine1?: null | string;
  addressLine2?: null | string;
  community?: null | string;
  eligibleForHomeOwnerGrant?: null | boolean;
  firstNationsReserve?: null | string;
  isPrimaryAndDamagedAddressSame?: null | boolean;
  landlordEmail?: null | string;
  landlordGivenNames?: null | string;
  landlordPhone?: null | string;
  landlordSurname?: null | string;
  manufacturedHome?: null | boolean;
  occupyAsPrimaryResidence?: null | boolean;
  onAFirstNationsReserve?: null | boolean;
  postalCode?: null | string;
  stateProvince?: null | string;

  constructor(
    addressLine1?: string,
    addressLine2?: string,
    community?: Community | string,
    postalCode?: null | string,
    stateProvince?: null | StateProvince,
    country?: Country,
    occupyAsPrimaryResidence?: null | boolean,
    onAFirstNationsReserve?: null | boolean,
    firstNationsReserve?: string,
    manufacturedHome?: null | boolean,
    isPrimaryAndDamagedAddressSame?: null | boolean,
    eligibleForHomeOwnerGrant?: null | boolean,
    landlordGivenNames?: null | string,
    landlordSurname?: null | string,
    landlordPhone?: null | string,
    landlordEmail?: null | string
  ) {}
}

export class DamagedPropertyAddressForm {
  addressLine1 = new UntypedFormControl();
  addressLine2 = new UntypedFormControl();
  community = new UntypedFormControl();
  postalCode = new UntypedFormControl();
  stateProvince = new UntypedFormControl();
  occupyAsPrimaryResidence = new UntypedFormControl();
  onAFirstNationsReserve = new UntypedFormControl();
  firstNationsReserve = new UntypedFormControl();
  manufacturedHome = new UntypedFormControl();
  eligibleForHomeOwnerGrant = new UntypedFormControl();
  isPrimaryAndDamagedAddressSame = new UntypedFormControl();
  landlordGivenNames = new UntypedFormControl();
  landlordSurname = new UntypedFormControl();
  landlordPhone = new UntypedFormControl();
  landlordEmail = new UntypedFormControl();

  constructor(
    damagedPropertyAddress: DamagedPropertyAddress,
    customValidator: CustomValidationService
  ) {
    if (damagedPropertyAddress.addressLine1) {
      this.addressLine1.setValue(damagedPropertyAddress.addressLine1);
    }
    this.addressLine1.setValidators([Validators.required]);

    if (damagedPropertyAddress.addressLine2) {
      this.addressLine2.setValue(damagedPropertyAddress.addressLine2);
    }
    this.addressLine2.setValidators(null);

    if (damagedPropertyAddress.community) {
      this.community.setValue(damagedPropertyAddress.community);
    }
    this.community.setValidators([Validators.required]);

    if (damagedPropertyAddress.postalCode) {
      this.postalCode.setValue(damagedPropertyAddress.postalCode);
    }
    this.postalCode.setValidators([Validators.required, Validators.pattern(/^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/)]);

    if (damagedPropertyAddress.stateProvince) {
      this.stateProvince.setValue(damagedPropertyAddress.stateProvince);
    }
    this.stateProvince.setValidators([Validators.required]);

    if (damagedPropertyAddress.occupyAsPrimaryResidence) {
      this.occupyAsPrimaryResidence.setValue(damagedPropertyAddress.occupyAsPrimaryResidence);
    }
    this.occupyAsPrimaryResidence.setValidators([Validators.required]);

    if (damagedPropertyAddress.onAFirstNationsReserve) {
      this.onAFirstNationsReserve.setValue(damagedPropertyAddress.onAFirstNationsReserve);
    }
    this.onAFirstNationsReserve.setValidators([Validators.required]);

    if (damagedPropertyAddress.firstNationsReserve) {
      this.firstNationsReserve.setValue(damagedPropertyAddress.firstNationsReserve);
    }
    this.firstNationsReserve.setValidators(null);

    if (damagedPropertyAddress.isPrimaryAndDamagedAddressSame) {
      this.isPrimaryAndDamagedAddressSame.setValue(damagedPropertyAddress.isPrimaryAndDamagedAddressSame);
    }
    this.isPrimaryAndDamagedAddressSame.setValidators([Validators.required]);

    if (damagedPropertyAddress.manufacturedHome) {
      this.manufacturedHome.setValue(damagedPropertyAddress.manufacturedHome);
    }
    this.manufacturedHome.setValidators(null);

    if (damagedPropertyAddress.eligibleForHomeOwnerGrant) {
      this.eligibleForHomeOwnerGrant.setValue(damagedPropertyAddress.eligibleForHomeOwnerGrant);
    }
    this.eligibleForHomeOwnerGrant.setValidators(null);

    if (damagedPropertyAddress.landlordGivenNames) {
      this.landlordGivenNames.setValue(damagedPropertyAddress.landlordGivenNames);
    }
    this.landlordGivenNames.setValidators(null);

    if (damagedPropertyAddress.landlordSurname) {
      this.landlordSurname.setValue(damagedPropertyAddress.landlordSurname);
    }
    this.landlordSurname.setValidators(null);

    if (damagedPropertyAddress.landlordPhone) {
      this.landlordPhone.setValue(damagedPropertyAddress.landlordPhone);
    }
    this.landlordPhone.setValidators([customValidator.maskedNumberLengthValidator().bind(customValidator)]);

    if (damagedPropertyAddress.landlordEmail) {
      this.landlordEmail.setValue(damagedPropertyAddress.landlordEmail);
    }
    this.landlordEmail.setValidators([Validators.email]);
  }
}

export class PropertyDamage {
  briefDescription?: null | string;
  damageFromDate?: null | string;
  damageToDate?: null | string;
  dateReturned?: null | string;
  floodDamage?: null | boolean;
  landslideDamage?: null | boolean;
  lossesExceed1000?: null | boolean;
  otherDamage?: null | boolean;
  otherDamageText?: null | string;
  residingInResidence?: null | boolean;
  stormDamage?: null | boolean;
  wereYouEvacuated?: null | boolean;
  wildfireDamage?: null | boolean;

  constructor(
    floodDamage?: null | boolean,
    landslideDamage?: null | boolean,
    wildfireDamage? : null | boolean,
    stormDamage?: null | boolean,
    otherDamage?: null | boolean,
    otherDamageText?: null | string,
    damageFromDate?: null | Date,
    damageToDate?: null | Date,
    briefDescription?: null | string,
    lossesExceed1000?: null | boolean,
    wereYouEvacuated?: null | boolean,
    dateReturned?: null | Date,
    residingInResidence?: null | boolean,
  ) {}
}

export class PropertyDamageForm {
  floodDamage = new UntypedFormControl();
  landslideDamage = new UntypedFormControl();
  wildfireDamage = new UntypedFormControl();
  stormDamage = new UntypedFormControl();
  otherDamage = new UntypedFormControl();
  otherDamageText = new UntypedFormControl();
  damageFromDate = new UntypedFormControl();
  damageToDate = new UntypedFormControl();
  briefDescription = new UntypedFormControl();
  lossesExceed1000 = new UntypedFormControl();
  wereYouEvacuated = new UntypedFormControl();
  dateReturned = new UntypedFormControl();
  residingInResidence = new UntypedFormControl();

  constructor(
    propertyDamage: PropertyDamage
  ) {
    if (propertyDamage.floodDamage) {
      this.floodDamage.setValue(propertyDamage.floodDamage);
    }
    this.floodDamage.setValidators(null);

    if (propertyDamage.landslideDamage) {
      this.landslideDamage.setValue(propertyDamage.landslideDamage);
    }
    this.landslideDamage.setValidators(null);

    if (propertyDamage.wildfireDamage) {
      this.wildfireDamage.setValue(propertyDamage.wildfireDamage)
    }
    this.wildfireDamage.setValidators(null);

    if (propertyDamage.stormDamage) {
      this.stormDamage.setValue(propertyDamage.stormDamage);
    }
    this.stormDamage.setValidators(null);

    if (propertyDamage.otherDamage) {
      this.otherDamage.setValue(propertyDamage.otherDamage);
    }
    this.otherDamage.setValidators(null);

    if (propertyDamage.otherDamageText) {
      this.otherDamageText.setValue(propertyDamage.otherDamageText);
    }
    this.otherDamageText.setValidators(null);

    if (propertyDamage.damageFromDate) {
      this.damageFromDate.setValue(propertyDamage.damageFromDate);
    }
    this.damageFromDate.setValidators(null);

    if (propertyDamage.damageToDate) {
      this.damageToDate.setValue(propertyDamage.damageToDate);
    }
    this.damageToDate.setValidators(null);

    if (propertyDamage.briefDescription) {
      this.briefDescription.setValue(propertyDamage.briefDescription);
    }
    this.briefDescription.setValidators(null);

    if (propertyDamage.lossesExceed1000) {
      this.lossesExceed1000.setValue(propertyDamage.lossesExceed1000);
    }
    this.lossesExceed1000.setValidators(null);

    if (propertyDamage.wereYouEvacuated) {
      this.wereYouEvacuated.setValue(propertyDamage.wereYouEvacuated);
    }
    this.wereYouEvacuated.setValidators(null);

    if (propertyDamage.dateReturned) {
      this.dateReturned.setValue(propertyDamage.dateReturned);
    }
    this.dateReturned.setValidators(null);

    if (propertyDamage.residingInResidence) {
      this.residingInResidence.setValue(propertyDamage.residingInResidence);
    }
    this.residingInResidence.setValidators(null);

  }
}

export class FullTimeOccupant {
  applicationId?: string;
  contactId?: string;
  deleteFlag?: boolean;
  firstName?: string;
  id?: null | string;
  lastName?: string;
  relationship?: string;
}

export class FullTimeOccupantsForm {
  applicationId = new UntypedFormControl();
  deleteFlag = new UntypedFormControl();
  id = new UntypedFormControl();
  firstName = new UntypedFormControl();
  lastName = new UntypedFormControl();
  relationship = new UntypedFormControl();
  fullTimeOccupant: UntypedFormGroup;
  fullTimeOccupants = new UntypedFormControl([], Validators.required);
  addNewFullTimeOccupantIndicator = new UntypedFormControl(false);

  constructor(
    fullTimeOccupants: Array<FullTimeOccupant>,
    customValidator: CustomValidationService,
    builder: UntypedFormBuilder
  ) {
    this.fullTimeOccupant = builder.group({
      deleteFlag: [
        false,
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFullTimeOccupantIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      applicationId: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFullTimeOccupantIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      id: [
        ''
      ],
      firstName: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFullTimeOccupantIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      lastName: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFullTimeOccupantIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      relationship: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFullTimeOccupantIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ]
    });
  }
}

export class OtherContact {
  applicationId?: string;
  deleteFlag?: boolean;
  email?: string;
  firstName?: string;
  id?: null | string;
  lastName?: string;
  phoneNumber?: string;
}

export class OtherContactsForm {
  applicationId = new UntypedFormControl();
  deleteFlag = new UntypedFormControl();
  id = new UntypedFormControl();
  firstName = new UntypedFormControl();
  lastName = new UntypedFormControl();
  phoneNumber = new UntypedFormControl();
  email = new UntypedFormControl();
  addNewOtherContactIndicator = new UntypedFormControl(false);
  otherContact: UntypedFormGroup;
  otherContacts = new UntypedFormControl([], Validators.required);

  constructor(
    otherContacts: Array<OtherContact>,
    customValidator: CustomValidationService,
    builder: UntypedFormBuilder
  ) {
    this.otherContact = builder.group({
      deleteFlag: [
        false,
        [
          customValidator
            .conditionalValidation(
              () => this.addNewOtherContactIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      applicationId: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewOtherContactIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      id: [
        ''
      ],
      firstName: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewOtherContactIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      lastName: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewOtherContactIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      phoneNumber: [
        '',
        [
          customValidator.maskedNumberLengthValidator().bind(customValidator),
          customValidator
            .conditionalValidation(
              () => this.addNewOtherContactIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      email: [
        '',
        [
          Validators.email,
          customValidator
            .conditionalValidation(
              () => this.addNewOtherContactIndicator.value,
              Validators.required,
            )
            .bind(customValidator)
        ]
      ]
    });
  }
}

export class SecondaryApplicant {
  applicantType?: SecondaryApplicantTypeOption;
  applicationId?: string;
  deleteFlag?: boolean;
  email?: string;
  firstName?: string;
  id?: null | string;
  lastName?: string;
  phoneNumber?: string;
}

export class SecondaryApplicantsForm {
  applicationId = new UntypedFormControl();
  deleteFlag = new UntypedFormControl();
  id = new UntypedFormControl();
  firstName = new UntypedFormControl();
  lastName = new UntypedFormControl();
  phoneNumber = new UntypedFormControl();
  email = new UntypedFormControl();
  applicantType = new UntypedFormControl();
  addNewSecondaryApplicantIndicator = new UntypedFormControl(false);
  secondaryApplicant: UntypedFormGroup;
  secondaryApplicants = new UntypedFormControl([]);

  constructor(
    secondaryApplicants: Array<SecondaryApplicant>,
    customValidator: CustomValidationService,
    builder: UntypedFormBuilder
  ) {
    this.secondaryApplicant = builder.group({
      deleteFlag: [
        false,
        [
          customValidator
            .conditionalValidation(
              () => this.addNewSecondaryApplicantIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      applicationId: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewSecondaryApplicantIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      id: [
        ''
      ],
      applicantType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewSecondaryApplicantIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      firstName: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewSecondaryApplicantIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      lastName: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewSecondaryApplicantIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      phoneNumber: [
        '',
        [
          customValidator.maskedNumberLengthValidator().bind(customValidator),
          customValidator
            .conditionalValidation(
              () => this.addNewSecondaryApplicantIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      email: [
        '',
        [
          Validators.email,
          customValidator
            .conditionalValidation(
              () => this.addNewSecondaryApplicantIndicator.value,
              Validators.required,
            )
            .bind(customValidator)
        ]
      ]
    });
  }
}

export class CleanUpLogItem {
  applicationId?: string;
  date?: string;
  deleteFlag?: boolean;
  description?: string;
  hours?: string;
  id?: null | string;
  name?: string;
}

export class CleanUpLogItemsForm {
  applicationId = new UntypedFormControl();
  deleteFlag = new UntypedFormControl();
  id = new UntypedFormControl();
  name = new UntypedFormControl();
  date = new UntypedFormControl();
  hours = new UntypedFormControl();
  description = new UntypedFormControl();
  cleanuplog: UntypedFormGroup;
  cleanuplogs = new UntypedFormControl([]);
  addNewCleanUpLogIndicator = new UntypedFormControl(false);

  constructor(
    cleanUpLogItems: Array<CleanUpLogItem>,
    customValidator: CustomValidationService,
    builder: UntypedFormBuilder
  ) {
    this.cleanuplog = builder.group({
      deleteFlag: [
        false,
        [
          customValidator
            .conditionalValidation(
              () => this.addNewCleanUpLogIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      applicationId: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewCleanUpLogIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      id: [
        ''
      ],
      date: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewCleanUpLogIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      name: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewCleanUpLogIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      hours: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewCleanUpLogIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      description: [
        ''
      ]
    });
  }
}

export class CleanUpLog {
  haveInvoicesOrReceiptsForCleanupOrRepairs?: null | boolean;
}

export class CleanUpLogForm {
  haveInvoicesOrReceiptsForCleanupOrRepairs = new UntypedFormControl();

  constructor(
    cleanUpLog: CleanUpLog,
  ) {
    if (cleanUpLog.haveInvoicesOrReceiptsForCleanupOrRepairs != null) {
      this.haveInvoicesOrReceiptsForCleanupOrRepairs.setValue(cleanUpLog.haveInvoicesOrReceiptsForCleanupOrRepairs);
    }
    this.haveInvoicesOrReceiptsForCleanupOrRepairs.setValidators(null);
  }
}

export class FileUpload {
  applicationId?: string;
  contentType?: string;
  deleteFlag?: boolean;
  fileData?: string;
  fileDescription?: string;
  fileName?: string;
  fileSize?: number;
  fileType?: FileCategory;
  id?: null | string;
  modifiedBy?: string;
  uploadedDate?: string;
}

export class FileUploadsForm {
  applicationId = new UntypedFormControl();
  deleteFlag = new UntypedFormControl();
  id = new UntypedFormControl();
  fileName = new UntypedFormControl();
  fileDescription = new UntypedFormControl();
  fileType = new UntypedFormControl();
  uploadedDate = new UntypedFormControl();
  modifiedBy = new UntypedFormControl();
  fileData = new UntypedFormControl();
  contentType = new UntypedFormControl();
  fileSize = new UntypedFormControl();
  fileUpload: UntypedFormGroup;
  fileUploads = new UntypedFormControl([]);
  addNewFileUploadIndicator = new UntypedFormControl(false);

  constructor(
    fileUploads: Array<FileUpload>,
    customValidator: CustomValidationService,
    builder: UntypedFormBuilder
  ) {
    this.fileUpload = builder.group({
      deleteFlag: [
        false,
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      applicationId: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      id: [
        '',
      ],

      fileName: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileDescription: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      uploadedDate: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      modifiedBy: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileData: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      contentType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileSize: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ]
    });
  }
}

export class DamagedRoom {
  applicationId?: string;
  deleteFlag?: boolean;
  description?: string;
  id?: null | string;
  otherRoomType?: null | string;
  roomType?: RoomType;
}

export class DamagedRoomsForm {
  applicationId = new UntypedFormControl();
  deleteFlag = new UntypedFormControl();
  id = new UntypedFormControl();
  roomType = new UntypedFormControl();
  otherRoomType = new UntypedFormControl();
  description = new UntypedFormControl();
  damagedRoom: UntypedFormGroup;
  damagedRooms = new UntypedFormControl([]);
  addNewDamagedRoomIndicator = new UntypedFormControl(false);

  constructor(
    damagedRooms: Array<DamagedRoom>,
    customValidator: CustomValidationService,
    builder: UntypedFormBuilder
  ) {
    this.damagedRoom = builder.group({
      deleteFlag: [
        false,
        [
          customValidator
            .conditionalValidation(
              () => this.addNewDamagedRoomIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      applicationId: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewDamagedRoomIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      id: [
        ''
      ],
      roomType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewDamagedRoomIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      otherRoomType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewDamagedRoomIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      description: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewDamagedRoomIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
    });
  }
}

export class SupportingDocuments {
  hasCopyOfARentalAgreementOrLease?: boolean;

  constructor(
   ) {}
}

export class SupportingDocumentsForm {
  hasCopyOfARentalAgreementOrLease = new UntypedFormControl();

  constructor(
    supportingDocuments: SupportingDocuments,
  ) {
    if (supportingDocuments.hasCopyOfARentalAgreementOrLease != null) {
      this.hasCopyOfARentalAgreementOrLease.setValue(supportingDocuments.hasCopyOfARentalAgreementOrLease);
    }
    this.hasCopyOfARentalAgreementOrLease.setValidators(null);
  }
}

export class SignAndSubmit {
  applicantSignature?: null | SignatureBlock;
  secondaryApplicantSignature?: null | SignatureBlock;
}

export class SignAndSubmitForm {
  applicantSignature: UntypedFormGroup;
  secondaryApplicantSignature: UntypedFormGroup;

  constructor(
    signAndSubmit: SignAndSubmit,
    fb: UntypedFormBuilder
  ) {
    this.applicantSignature = fb.group({
      signature: [null, Validators.required],
      dateSigned: [null, Validators.required],
      signedName: [null, Validators.required]
    });
    this.applicantSignature?.controls.signature.setValue(signAndSubmit?.applicantSignature?.signature);
    this.applicantSignature?.controls.dateSigned.setValue(signAndSubmit?.applicantSignature?.dateSigned);
    this.applicantSignature?.controls.signedName.setValue(signAndSubmit?.applicantSignature?.signedName);

    this.secondaryApplicantSignature = fb.group({
      signature: null,
      dateSigned: null,
      signedName: null
    });
    this.secondaryApplicantSignature?.controls.signature.setValue(signAndSubmit?.secondaryApplicantSignature?.signature);
    this.secondaryApplicantSignature?.controls.dateSigned.setValue(signAndSubmit?.secondaryApplicantSignature?.dateSigned);
    this.secondaryApplicantSignature?.controls.signedName.setValue(signAndSubmit?.secondaryApplicantSignature?.signedName);
  }
}

/**
 * DFA Application Main
 **/
export interface DfaApplicationMain {
  cleanUpLog?: CleanUpLog;
  damagedPropertyAddress?: DamagedPropertyAddress;
  id?: string;
  propertyDamage?: PropertyDamage;
  signAndSubmit?: SignAndSubmit;
  supportingDocuments?: SupportingDocuments;
  deleteFlag?: boolean;
}
