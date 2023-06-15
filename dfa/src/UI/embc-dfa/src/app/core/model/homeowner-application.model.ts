import {
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { RegAddress, Community, Country, StateProvince } from '../model/address';

export interface DamagedPropertyAddress extends RegAddress {
  occupyAsPrimaryResidence: boolean;
  onAFirstNationsReserve: boolean;
  firstNationsReserve?: FirstNationsReserve | string;
  manufacturedHome?: boolean;
  eligibleForHomeOwnerGrant: boolean;
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
    eligibleForHomeOwnerGrant?: null | boolean
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

  constructor(
    damagedPropertyAddress: DamagedPropertyAddress
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
    this.eligibleForHomeOwnerGrant.setValidators([Validators.required]);
  }
}

export class PropertyDamage {
  field: boolean;

  constructor(
    field?: boolean
  ) {}
}

export class PropertyDamageForm {
  field = new UntypedFormControl();

  constructor(
    propertyDamage: PropertyDamage
  ) {
    if (propertyDamage.field) {
      this.field.setValue(propertyDamage.field);
    }
    this.field.setValidators(null);
  }
}

export class Occupants {
  field: boolean;

  constructor(
    field?: boolean
  ) {}
}

export class OccupantsForm {
  field = new UntypedFormControl();

  constructor(
    propertyDamage: PropertyDamage
  ) {
    if (propertyDamage.field) {
      this.field.setValue(propertyDamage.field);
    }
    this.field.setValidators(null);
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
    propertyDamage: PropertyDamage
  ) {
    if (propertyDamage.field) {
      this.field.setValue(propertyDamage.field);
    }
    this.field.setValidators(null);
  }
}


export class DamagedItemsByRoom {
  field: boolean;

  constructor(
    field?: boolean
  ) {}
}

export class DamagedItemsByRoomForm {
  field = new UntypedFormControl();

  constructor(
    propertyDamage: PropertyDamage
  ) {
    if (propertyDamage.field) {
      this.field.setValue(propertyDamage.field);
    }
    this.field.setValidators(null);
  }
}

// TODO This should be coming in from the API in api/models
/**
 * Homeowner Application
 */
export interface HomeOwnerApplication {
  id?: string;
  damagedPropertyAddress?: DamagedPropertyAddress;
  propertyDamage?: PropertyDamage;
  occupants?: Occupants;
  cleanUpLog?: CleanUpLog;
  damagedItemsByRoom?: DamagedItemsByRoom;
}

// TODO This should be coming in from the API in api/models
/* tslint:disable */
/* eslint-disable */
/**
 * Base class for dfa application data conflicts
 */
export interface HomeOwnerApplicationDataConflict {
  dataElementName: string;
}
