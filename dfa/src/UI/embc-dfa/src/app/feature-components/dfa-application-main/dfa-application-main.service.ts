import { EventEmitter, Injectable } from '@angular/core';
import { FullTimeOccupant, DFAApplicationMain, OtherContact, SecondaryApplicant } from 'src/app/core/model/dfa-application-main.model';
import { DFAApplicationMainMappingService } from './dfa-application-main-mapping.service';
import { DFAApplicationMainDataService } from './dfa-application-main-data.service';
import { FileUpload } from 'src/app/core/model/dfa-application-main.model';

@Injectable({ providedIn: 'root' })
export class DFAApplicationMainService {
  private _fullTimeOccupants: Array<FullTimeOccupant> = [];
  private _otherContacts: Array<OtherContact> = [];
  private _secondaryApplicants: Array<SecondaryApplicant> = [];
  public deleteDamagePhoto = new EventEmitter<FileUpload>();
  public deleteCleanupLog = new EventEmitter<FileUpload>();

  constructor(
    private dfaApplicationMainMapping: DFAApplicationMainMappingService,
    private dfaApplicationMainDataService: DFAApplicationMainDataService
  ) {}

  public get fullTimeOccupants(): Array<FullTimeOccupant> {
    return this._fullTimeOccupants;
  }

  public set fullTimeOccupants(value: Array<FullTimeOccupant>) {
    this._fullTimeOccupants = value;
  }

  public setFullTimeOccupants(occupants: FullTimeOccupant[]): void {
    const fullTimeOccupantsArray: Array<FullTimeOccupant> = [];
    for (const occupant of occupants) {
      const fullTimeOccupant: FullTimeOccupant = {
        firstName: occupant.firstName,
        lastName: occupant.lastName,
        relationship: occupant.relationship
      };

      fullTimeOccupantsArray.push(fullTimeOccupant);
    }
    this.fullTimeOccupants = fullTimeOccupantsArray;
    this.dfaApplicationMainDataService.occupants = {
      fullTimeOccupants: this.fullTimeOccupants,
      otherContacts: this.otherContacts,
      secondaryApplicants: this.secondaryApplicants
    }
  }

  public get otherContacts(): Array<OtherContact> {
    return this._otherContacts;
  }

  public set otherContacts(value: Array<OtherContact>) {
    this._otherContacts = value;
  }

  public setOtherContacts(contacts: OtherContact[]): void {
    const otherContactsArray: Array<OtherContact> = [];
    for (const contact of contacts) {
      const otherContact: OtherContact = {
        firstName: contact.firstName,
        lastName: contact.lastName,
        phoneNumber: contact.phoneNumber,
        email: contact.email,
      };

      otherContactsArray.push(otherContact);
    }
    this.otherContacts = otherContactsArray;
    this.dfaApplicationMainDataService.occupants = {
      fullTimeOccupants: this.fullTimeOccupants,
      otherContacts: this.otherContacts,
      secondaryApplicants: this.secondaryApplicants
    }

  }

  public get secondaryApplicants(): Array<SecondaryApplicant> {
    return this._secondaryApplicants;
  }

  public set secondaryApplicants(value: Array<SecondaryApplicant>) {
    this._secondaryApplicants = value;
  }

  public setSecondaryApplicants(contacts: SecondaryApplicant[]): void {
    const secondaryApplicantsArray: Array<SecondaryApplicant> = [];
    for (const contact of contacts) {
      const secondaryApplicant: SecondaryApplicant = {
        applicantType: contact.applicantType,
        firstName: contact.firstName,
        lastName: contact.lastName,
        phoneNumber: contact.phoneNumber,
        email: contact.email
      };

      secondaryApplicantsArray.push(secondaryApplicant);
    }
    this.secondaryApplicants = secondaryApplicantsArray;
    this.dfaApplicationMainDataService.occupants = {
      fullTimeOccupants: this.fullTimeOccupants,
      otherContacts: this.otherContacts,
      secondaryApplicants: this.secondaryApplicants
    }
  }
 }
