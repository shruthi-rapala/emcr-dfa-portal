import { Injectable } from '@angular/core';
import { DfaApplicationStart, Profile } from 'src/app/core/api/models';
import { SmallBusinessOption, ApplicantOption, SignatureBlock, InsuranceOption, FarmOption } from 'src/app/core/api/models';

@Injectable({ providedIn: 'root' })
export class DFAApplicationStartDataService {
  private _consent: boolean;
  private _profileVerified: boolean;
  private _applicantOption: ApplicantOption;
  private _insuranceOption: InsuranceOption;
  private _smallBusinessOption: SmallBusinessOption;
  private _farmOption: FarmOption;
  private _applicantSignature: SignatureBlock;
  private _secondaryApplicantSignature: SignatureBlock;
  private _applicationId: string;
  private _profileId: string;
  private _profile: Profile;
  private _addressLine1: string;
  private _addressLine2: string;
  private _city: string;
  private _postalCode: string;
  private _stateProvince: string;
  private _damageCausedByDisaster: boolean;
  private _lossesExceed1000: boolean;
  private _damageFromDate: string;
  private _eventId: string;
  private _isPrimaryAndDamagedAddressSame: boolean;

  constructor(
  ) {}

  public get addressLine1(): string {
    return this._addressLine1;
  }
  public set addressLine1(value: string) {
    this._addressLine1 = value;
  }

  public get addressLine2(): string {
    return this._addressLine2;
  }
  public set addressLine2(value: string) {
    this._addressLine2 = value;
  }

  public get city(): string {
    return this._city;
  }
  public set city(value: string) {
    this._city = value;
  }

  public get postalCode(): string {
    return this._postalCode;
  }
  public set postalCode(value: string) {
    this._postalCode = value;
  }

  public get stateProvince(): string {
    return this._stateProvince;
  }
  public set stateProvince(value: string) {
    this._stateProvince = value;
  }

  public get damageFromDate(): string {
    return this._damageFromDate;
  }
  public set damageFromDate(value: string) {
    this._damageFromDate = value;
  }

  public get eventId(): string {
    return this._eventId;
  }
  public set eventId(value: string) {
    this._eventId = value;
  }

  public get damageCausedByDisaster(): boolean {
    return this._damageCausedByDisaster;
  }
  public set damageCausedByDisaster(value: boolean) {
    this._damageCausedByDisaster = value;
  }

  public get lossesExceed1000(): boolean {
    return this._lossesExceed1000;
  }
  public set lossesExceed1000(value: boolean) {
    this._lossesExceed1000 = value;
  }

  public get isPrimaryAndDamagedAddressSame(): boolean {
    return this._isPrimaryAndDamagedAddressSame;
  }
  public set isPrimaryAndDamagedAddressSame(value: boolean) {
    this._isPrimaryAndDamagedAddressSame = value;
  }

  public get consent(): boolean {
    return this._consent;
  }
  public set consent(value: boolean) {
    this._consent = value;
  }

  public get profile(): Profile {
    return this._profile;
  }

  public set profile(value: Profile) {
    this._profile = value;
  }

  public get profileVerified(): boolean {
    return this._profileVerified;
  }
  public set profileVerified(value: boolean) {
    this._profileVerified = value;
  }

  public get applicantOption(): ApplicantOption {
    return this._applicantOption;
  }
  public set applicantOption(value: ApplicantOption) {
    this._applicantOption = value;
  }

  public get insuranceOption(): InsuranceOption {
    return this._insuranceOption;
  }
  public set insuranceOption(value: InsuranceOption) {
    this._insuranceOption = value;
  }

  public get smallBusinessOption(): SmallBusinessOption {
    return this._smallBusinessOption;
  }
  public set smallBusinessOption(value: SmallBusinessOption) {
    this._smallBusinessOption = value;
  }

  public get profileId(): string {
    return this._profileId;
  }
  public set profileId(value: string) {
    this._profileId = value;
  }

  public get farmOption(): FarmOption {
    return this._farmOption;
  }
  public set farmOption(value: FarmOption) {
    this._farmOption = value;
  }

  public get applicantSignature(): SignatureBlock {
    return this._applicantSignature;
  }
  public set applicantSignature(value: SignatureBlock) {
    this._applicantSignature = value;
  }

  public get secondaryApplicantSignature(): SignatureBlock {
   return this._secondaryApplicantSignature;
  }
  public set secondaryApplicantSignature(value: SignatureBlock) {
    this._secondaryApplicantSignature = value;
  }

  public setApplicationId(applicationId: string): void {
    this._applicationId = applicationId;
  }
  public getApplicationId(): string {
    return this._applicationId;
  }

  public createDFAApplicationStartDTO(): DfaApplicationStart {
    return {
      consent: { consent: this.consent },
      id: this._applicationId,
      profileVerification: { profileVerified: this.profileVerified, profileId: this.profileId, profile: this._profile },
      appTypeInsurance: {
        applicantOption: this.applicantOption,
        insuranceOption: this.insuranceOption,
        smallBusinessOption: this.smallBusinessOption,
        farmOption: this.farmOption,
        applicantSignature: this.applicantSignature,
        secondaryApplicantSignature: this.secondaryApplicantSignature
       },
      otherPreScreeningQuestions: {
        addressLine1: this.addressLine1,
        addressLine2: this.addressLine2,
        city: this.city,
        postalCode: this.postalCode,
        stateProvince: this.stateProvince,
        isPrimaryAndDamagedAddressSame: this.isPrimaryAndDamagedAddressSame,
        damageCausedByDisaster: this.damageCausedByDisaster,
        lossesExceed1000: this.lossesExceed1000,
        damageFromDate: this.damageFromDate,
        eventId: this.eventId
      }
    };
  }
}
