import { Injectable } from '@angular/core';
import { DFAApplication, ApplicantOption, InsuranceOption, SmallBusinessOption, FarmOption} from 'src/app/core/model/dfa-application.model';
@Injectable({ providedIn: 'root' })
export class DFAApplicationDataService {
  private _consent: boolean;
  private _profileVerification: boolean;
  private _applicantOption: ApplicantOption;
  private _insuranceOption: InsuranceOption;
  private _smallBusinessOption: SmallBusinessOption;
  private _farmOption: FarmOption;

  constructor(
  ) {}

  public get consent(): boolean {
    return this._consent;
  }
  public set consent(value: boolean) {
    this._consent = value;
  }

  public get profileVerification(): boolean {
    return this._profileVerification;
  }
  public set profileVerification(value: boolean) {
    this._profileVerification = value;
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

  public get farmOption(): FarmOption {
    return this._farmOption;
  }
  public set farmOption(value: FarmOption) {
    this._farmOption = value;
  }
}
