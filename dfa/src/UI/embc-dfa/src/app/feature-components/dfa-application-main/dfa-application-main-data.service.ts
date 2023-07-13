import { Injectable } from '@angular/core';
import { DFAApplicationMain, DamagedPropertyAddress, PropertyDamage, DamagedItemsByRoom, CleanUpLog, OtherContact, SecondaryApplicant, Occupants, SignAndSubmit} from 'src/app/core/model/dfa-application-main.model';
import { DFAApplicationStart } from 'src/app/core/model/dfa-application-start.model';
import { CacheService } from 'src/app/core/services/cache.service';
import { ApplicantOption, InsuranceOption } from 'src/app/core/api/models';
import { DFAApplicationStartModule } from '../dfa-application-start/dfa-application-start.module';

@Injectable({ providedIn: 'root' })
export class DFAApplicationMainDataService {
  private _damagedPropertyAddress: DamagedPropertyAddress;
  private _propertyDamage: PropertyDamage;
  private _occupants: Occupants;
  private _cleanUpLog: CleanUpLog;
  private _damagedItemsByRoom: DamagedItemsByRoom;
  private _dfaApplicationMain: DFAApplicationMain;
  private _dfaApplicationStart: DFAApplicationStart;
  private _dfaApplicationMainId: string;
  private ApplicantOptions = ApplicantOption;
  private InsuranceOptions = InsuranceOption;
  private _signAndSubmit: SignAndSubmit;

  constructor(
    private cacheService: CacheService
  ) {
      // TODO: Retrieve actual app start data instead of hard coded
      this._dfaApplicationStart = {
        consent: {consent: true},
        profileVerification: {profileVerification: true},
        appTypeInsurance: {
          applicantOption: this.ApplicantOptions.ResidentialTenant,
          insuranceOption: this.InsuranceOptions.Unsure,
          smallBusinessOption: null,
          farmOption: null,
          applicantSignature: null,
          secondaryApplicantSignature: null
        }};
  }

  public getDFAApplicationMain(): DFAApplicationMain {
    if (this._dfaApplicationMain === null || undefined) {
      this._dfaApplicationMain = JSON.parse(this.cacheService.get('dfa-application-main'));
    }
    return this._dfaApplicationMain;
  }

  public get dfaApplicationStart(): DFAApplicationStart {
    return this._dfaApplicationStart;
  }

  public setDFAApplicationMain(dfaApplicationMain: DFAApplicationMain): void {
    this._dfaApplicationMain = dfaApplicationMain;
    this.cacheService.set('dfa-application-main', dfaApplicationMain);
  }

  public setDFAApplicationMainId(id: string): void {
    this._dfaApplicationMainId = id;
  }

  public get damagedPropertyAddress(): DamagedPropertyAddress {
    return this._damagedPropertyAddress;
  }

  public set damagedPropertyAddress(value: DamagedPropertyAddress) {
    this._damagedPropertyAddress = value;
  }

  public get signAndSubmit(): SignAndSubmit {
    return this._signAndSubmit;
  }

  public set signAndSubmit(value: SignAndSubmit) {
    this._signAndSubmit = value;
  }

  public get propertyDamage(): PropertyDamage {
    return this._propertyDamage;
  }

  public set propertyDamage(value: PropertyDamage) {
    this._propertyDamage = value;
  }

  public get occupants(): Occupants {
    return this._occupants;
  }

  public set occupants(value: Occupants) {
    this._occupants = value;
  }
  public get cleanUpLog(): CleanUpLog {
    return this._cleanUpLog;
  }

  public set cleanUpLog(value: CleanUpLog) {
    this._cleanUpLog = value;
  }
  public get damagedItemsByRoom(): DamagedItemsByRoom {
    return this._damagedItemsByRoom;
  }

  public set damagedItemsByRoom(value: DamagedItemsByRoom) {
    this._damagedItemsByRoom = value;
  }
   public createDFAApplicationMainDTO(): DFAApplicationMain {
    return {
      damagedPropertyAddress: this._damagedPropertyAddress,
      propertyDamage: this._propertyDamage,
      occupants: this._occupants,
      cleanUpLog: this._cleanUpLog,
      damagedItemsByRoom: this._damagedItemsByRoom,
      signAndSubmit: this._signAndSubmit
    };
  }
}
