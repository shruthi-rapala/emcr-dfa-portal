import { Injectable } from '@angular/core';
import { DFAApplicationMain, DamagedPropertyAddress, PropertyDamage, DamagedItemsByRoom, CleanupLog, OtherContact, SecondaryApplicant, Occupants, SignAndSubmit, SupportingDocuments} from 'src/app/core/model/dfa-application-main.model';
import { CacheService } from 'src/app/core/services/cache.service';
import { ApplicantOption, InsuranceOption, DfaApplicationStart } from 'src/app/core/api/models';
import { DFAApplicationStartDataService } from '../dfa-application-start/dfa-application-start-data.service';

@Injectable({ providedIn: 'root' })
export class DFAApplicationMainDataService {
  private _damagedPropertyAddress: DamagedPropertyAddress;
  private _propertyDamage: PropertyDamage;
  private _occupants: Occupants;
  private _cleanUpLog: CleanupLog;
  private _damagedItemsByRoom: DamagedItemsByRoom;
  private _dfaApplicationMain: DFAApplicationMain;
  private _dfaApplicationStart: DfaApplicationStart;
  private _supportingDocuments: SupportingDocuments;
  private _dfaApplicationMainId: string;
  private ApplicantOptions = ApplicantOption;
  private InsuranceOptions = InsuranceOption;
  private _signAndSubmit: SignAndSubmit;
  private _isSubmitted: boolean = false;

  constructor(
    private cacheService: CacheService,
    private dfaApplicationStartDataService: DFAApplicationStartDataService
  ) {
      this._dfaApplicationStart = this.dfaApplicationStartDataService.createDFAApplicationStartDTO();
  }

  public getDFAApplicationMain(): DFAApplicationMain {
    if (this._dfaApplicationMain === null || undefined) {
      this._dfaApplicationMain = JSON.parse(this.cacheService.get('dfa-application-main'));
    }
    return this._dfaApplicationMain;
  }

  public get isSubmitted(): boolean {
    return this._isSubmitted;
  }
  public set isSubmitted(value: boolean) {
    this._isSubmitted = value;
  }

  public get dfaApplicationStart(): DfaApplicationStart {
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

  public get supportingDocuments(): SupportingDocuments {
    return this._supportingDocuments;
  }

  public set supportingDocuments(value: SupportingDocuments) {
    this._supportingDocuments = value;
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
  public get cleanUpLog(): CleanupLog {
    return this._cleanUpLog;
  }

  public set cleanUpLog(value: CleanupLog) {
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
      supportingDocuments: this._supportingDocuments,
      signAndSubmit: this._signAndSubmit
    };
  }
}
