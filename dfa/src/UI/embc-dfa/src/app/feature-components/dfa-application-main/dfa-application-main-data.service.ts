import { Injectable } from '@angular/core';
import { CacheService } from 'src/app/core/services/cache.service';
import { DfaApplicationStart,  } from 'src/app/core/api/models';
import { DFAApplicationStartDataService } from '../dfa-application-start/dfa-application-start-data.service';
import { CleanUpLog, DfaApplicationMain, DamagedPropertyAddress, PropertyDamage, SupportingDocuments, SignAndSubmit, FullTimeOccupant, OtherContact, SecondaryApplicant, DamagedRoom, FileUpload, CleanUpLogItem } from 'src/app/core/model/dfa-application-main.model';
import { AttachmentService } from 'src/app/core/api/services';

@Injectable({ providedIn: 'root' })
export class DFAApplicationMainDataService {
  private _damagedPropertyAddress: DamagedPropertyAddress;
  private _propertyDamage: PropertyDamage;
  private _cleanUpLog: CleanUpLog;
  private _supportingDocuments: SupportingDocuments;
  private _signAndSubmit: SignAndSubmit;
  private _fullTimeOccupants: Array<FullTimeOccupant>;
  private _otherContacts: Array<OtherContact>;
  private _secondaryApplicants: Array<SecondaryApplicant>;
  private _cleanUpLogItems: Array<CleanUpLogItem>;
  private _damagedRooms: Array<DamagedRoom>;
  private _fileUploads: Array<FileUpload>;
  private _dfaApplicationMain: DfaApplicationMain;
  private _dfaApplicationStart: DfaApplicationStart;
  private _isSubmitted: boolean = false;

  constructor(
    private cacheService: CacheService,
    private dfaApplicationStartDataService: DFAApplicationStartDataService,
    private fileUploadsService: AttachmentService
  ) {
      this._dfaApplicationStart = this.dfaApplicationStartDataService.createDFAApplicationStartDTO();
      this.getFileUploadsForApplication(this.dfaApplicationStart.id);
  }

  public getFileUploadsForApplication(applicationId: string) {
    this.fileUploadsService.attachmentGetAttachments({applicationId: applicationId}).subscribe({
      next: (attachments) => {
        this.fileUploads = attachments;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  public get fullTimeOccupants(): Array<FullTimeOccupant> {
    return this._fullTimeOccupants;
  }
  public set fullTimeOccupants(value: Array<FullTimeOccupant>) {
    this._fullTimeOccupants = value;
  }

  public get otherContacts(): Array<OtherContact> {
    return this._otherContacts;
  }
  public set otherContacts(value: Array<OtherContact>) {
    this._otherContacts = value;
  }

  public get secondaryApplicants(): Array<SecondaryApplicant> {
    return this._secondaryApplicants;
  }
  public set secondaryApplicants(value: Array<SecondaryApplicant>) {
    this._secondaryApplicants = value;
  }

  public get cleanUpLogItems(): Array<CleanUpLogItem> {
    return this._cleanUpLogItems;
  }
  public set cleanUpLogItems(value: Array<CleanUpLogItem>) {
    this._cleanUpLogItems = value;
  }

  public get damagedRooms(): Array<DamagedRoom> {
    return this._damagedRooms;
  }
  public set damagedRooms(value: Array<DamagedRoom>) {
    this._damagedRooms = value;
  }

  public get fileUploads(): Array<FileUpload> {
    return this._fileUploads;
  }
  public set fileUploads(value: Array<FileUpload>) {
    this._fileUploads = value;
  }

  public getDFAApplicationMain(): DfaApplicationMain {
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

  public setDFAApplicationMain(dfaApplicationMain: DfaApplicationMain): void {
    this._dfaApplicationMain = dfaApplicationMain;
    this.cacheService.set('dfa-application-main', dfaApplicationMain);
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

  public get cleanUpLog(): CleanUpLog {
    return this._cleanUpLog;
  }

  public set cleanUpLog(value: CleanUpLog) {
    this._cleanUpLog = value;
  }
   public createDFAApplicationMainDTO(): DfaApplicationMain {
    return {
      id: this.dfaApplicationStart.id,
      cleanUpLog: this.cleanUpLog,
      damagedPropertyAddress: this._damagedPropertyAddress,
      propertyDamage: this._propertyDamage,
      supportingDocuments: this._supportingDocuments,
      signAndSubmit: this._signAndSubmit,
      deleteFlag: false
    };
  }
}
