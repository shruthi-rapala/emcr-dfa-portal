import {
  FormArray,
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { RegAddress, Community, Country, StateProvince } from './address';
import { CustomValidationService } from '../services/customValidation.service';

export interface DamagedPropertyAddress extends RegAddress {
  occupyAsPrimaryResidence: boolean;
  onAFirstNationsReserve: boolean;
  firstNationsReserve?: FirstNationsReserve | string;
  manufacturedHome?: boolean;
  eligibleForHomeOwnerGrant?: boolean;
  landlordGivenNames?: string;
  landlordSurname?: string;
  landlordPhone1?: string;
  landlordPhone2?: string;
}

export interface FirstNationsReserve
{
  code?: null | string;
  name?: null | string;
}

export class DamagedPropertyAddress implements DamagedPropertyAddress {

  constructor(
    addressLine1?: string,
    addressLine2?: string,
    community?: Community | string,
    postalCode?: null | string,
    stateProvince?: null | StateProvince,
    country?: Country,
    occupyAsPrimaryResidence?: null | boolean,
    onAFirstNationsReserve?: null | boolean,
    firstNationsReserve?: FirstNationsReserve | string,
    manufacturedHome?: null | boolean,
    eligibleForHomeOwnerGrant?: null | boolean,
    landlordGivenNames?: null | string,
    landlordSurname?: null | string,
    landlordPhone1?: null | string,
    landlordPhone2?: null | string
  ) {}
}

export class DamagedPropertyAddressForm {
  addressLine1 = new UntypedFormControl();
  addressLine2 = new UntypedFormControl();
  community = new UntypedFormControl();
  postalCode = new UntypedFormControl();
  stateProvince = new UntypedFormControl();
  country = new UntypedFormControl();
  occupyAsPrimaryResidence = new UntypedFormControl();
  onAFirstNationsReserve = new UntypedFormControl();
  firstNationsReserve = new UntypedFormControl();
  manufacturedHome = new UntypedFormControl();
  eligibleForHomeOwnerGrant = new UntypedFormControl();
  landlordGivenNames = new UntypedFormControl();
  landlordSurname = new UntypedFormControl();
  landlordPhone1 = new UntypedFormControl();
  landlordPhone2 = new UntypedFormControl();

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

    if (damagedPropertyAddress.country) {
      this.country.setValue(damagedPropertyAddress.country);
    }
    this.country.setValidators([Validators.required]);

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

    if (damagedPropertyAddress.landlordPhone1) {
      this.landlordPhone1.setValue(damagedPropertyAddress.landlordPhone1);
    }
    this.landlordPhone1.setValidators([customValidator.maskedNumberLengthValidator().bind(customValidator)]);

    if (damagedPropertyAddress.landlordPhone2) {
      this.landlordPhone2.setValue(damagedPropertyAddress.landlordPhone2);
    }
    this.landlordPhone2.setValidators([customValidator.maskedNumberLengthValidator().bind(customValidator)]);
  }
}

export class PropertyDamage {
  floodDamage?: boolean;
  landslideDamage?: boolean;
  stormDamage?: boolean;
  otherDamage?: boolean;
  otherDamageText?: string;
  damageFromDate?: Date;
  damageToDate?: Date;
  briefDescription?: string;
  lossesExceed1000?: boolean;
  wereYouEvacuated?: boolean;
  dateReturned?: Date;
  residingInResidence?: boolean;

  constructor(
    floodDamage?: null | boolean,
    landslideDamage?: null | boolean,
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

// TODO This should be coming in from the API in api/models
/* tslint:disable */
/* eslint-disable */
export enum SecondaryApplicantTypeOption {
  Contact = 'Contact',
  Organization = 'Organization',
}


export interface FullTimeOccupant {
  firstName: string;
  lastName: string;
  relationship: string;
}

export interface OtherContact {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export interface SecondaryApplicant {
  applicantType: SecondaryApplicantTypeOption;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export class Occupants {
  fullTimeOccupants: Array<FullTimeOccupant>;
  otherContacts: Array<OtherContact>;
  secondaryApplicants: Array<SecondaryApplicant>;

  constructor(
  ) {}
}

export class OccupantsForm {
  firstName = new UntypedFormControl();
  lastName = new UntypedFormControl();
  relationship = new UntypedFormControl();
  phoneNumber = new UntypedFormControl();
  email = new UntypedFormControl();
  secondaryApplicantType = new UntypedFormControl();
  fullTimeOccupant: UntypedFormGroup;
  fullTimeOccupants = new UntypedFormControl([]);
  addNewFullTimeOccupantIndicator = new UntypedFormControl(false);
  addNewOtherContactIndicator = new UntypedFormControl(false);
  addNewSecondaryApplicantIndicator = new UntypedFormControl(false);
  otherContact: UntypedFormGroup;
  secondaryApplicant: UntypedFormGroup;
  otherContacts = new UntypedFormControl([]);
  secondaryApplicants = new UntypedFormControl([]);

  constructor(
    occupants: Occupants,
    customValidator: CustomValidationService,
    builder: UntypedFormBuilder
  ) {
    this.fullTimeOccupant = builder.group({
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
    this.otherContact = builder.group({
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
    this.secondaryApplicant = builder.group({
      secondaryApplicantType: [
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

export class CleanUpLog {
  field: boolean;

  constructor(
    field?: boolean
  ) {}
}

export class CleanUpLogForm {
  field = new UntypedFormControl();

  constructor(
    cleanUpLog: CleanUpLog
  ) {
    if (cleanUpLog.field) {
      this.field.setValue(cleanUpLog.field);
    }
    this.field.setValidators(null);
  }
}

export enum FileCategory {
  Insurance = "Insurance",
  Financial = "Financial",
  ThirdPartyConsent = "Third party consent",
  TenancyProof = "Tenancy proof",
  DamagePhoto = "Damage photo",
  Cleanup = "Cleanup",
  Appeal = "Appeal"
}

export interface FileUpload {
  fileName: string,
  fileDescription: string,
  fileType: FileCategory,
  uploadedDate: Date,
  modifiedBy: string
  fileData: string,
  contentType: string // for preview
  fileSize: number
}


export enum RoomType {
  Bathroom = 'Bathroom',
  Bedroom = 'Bedroom',
  Dining = 'Dining room',
  Family = 'Family room',
  Garage = 'Garage',
  Kitchen = 'Kitchen',
  Laundry = 'Laundry room',
  Living = 'Living room',
  Other = 'Other',
}

export interface DamagedRoom {
  roomType: RoomType;
  otherRoomType: string;
  description: string;
}


export class DamagedItemsByRoom {
  damagedRooms: Array<DamagedRoom>;
  fileAttachments: Array<FileUpload>;

  constructor(
  ) {}
}

export class DamagedItemsByRoomForm {
  roomType = new UntypedFormControl();
  otherRoomType = new UntypedFormControl();
  description = new UntypedFormControl();
  damagedRoom: UntypedFormGroup;
  damagedRooms = new UntypedFormControl([]);
  fileName = new UntypedFormControl();
  fileDescription = new UntypedFormControl();
  fileType = new UntypedFormControl();
  uploadedDate = new UntypedFormControl();
  modifiedBy = new UntypedFormControl();
  fileData = new UntypedFormControl();
  fileAttachment: UntypedFormGroup;
  fileAttachments = new UntypedFormControl([]);
  contentType = new UntypedFormControl();
  fileSize = new UntypedFormControl();
  addNewDamagedRoomIndicator = new UntypedFormControl(false);
  addNewFileAttachmentIndicator = new UntypedFormControl(false);

  constructor(
    damagedItemsByRoom: DamagedItemsByRoom,
    customValidator: CustomValidationService,
    builder: UntypedFormBuilder
  ) {
    this.damagedRoom = builder.group({
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
    this.fileAttachment = builder.group({
      fileName: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileAttachmentIndicator.value,
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
              () => this.addNewFileAttachmentIndicator.value,
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
              () => this.addNewFileAttachmentIndicator.value,
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
              () => this.addNewFileAttachmentIndicator.value,
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
              () => this.addNewFileAttachmentIndicator.value,
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
              () => this.addNewFileAttachmentIndicator.value,
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
              () => this.addNewFileAttachmentIndicator.value,
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
              () => this.addNewFileAttachmentIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ]
    });
  }
}

// TODO This should be coming in from the API in api/models
/**
 * DFA Application Main
 */
export interface DFAApplicationMain {
  id?: string;
  damagedPropertyAddress?: DamagedPropertyAddress;
  propertyDamage?: PropertyDamage;
  occupants?: Occupants;
  cleanUpLog?: CleanUpLog;
  damagedItemsByRoom?: DamagedItemsByRoom;
}
