import { Injectable } from '@angular/core';
import { DfaApplicationStart } from 'src/app/core/api/models';
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

  constructor(
  ) {}

  public get consent(): boolean {
    return this._consent;
  }
  public set consent(value: boolean) {
    this._consent = value;
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
      profileVerification: { profileVerified: this.profileVerified, profileId: this.profileId },
      appTypeInsurance: {
        applicantOption: this.applicantOption,
        insuranceOption: this.insuranceOption,
        smallBusinessOption: this.smallBusinessOption,
        farmOption: this.farmOption,
        applicantSignature: this.applicantSignature,
        secondaryApplicantSignature: this.secondaryApplicantSignature
       }
    };
  }
}
