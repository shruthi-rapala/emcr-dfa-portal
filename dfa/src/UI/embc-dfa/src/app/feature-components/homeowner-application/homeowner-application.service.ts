import { Injectable } from '@angular/core';
import { FullTimeOccupant, HomeOwnerApplication, OtherContact, SecondaryApplicant } from 'src/app/core/model/homeowner-application.model';
// import { DFAApplicationStartService as Service } from '../../core/api/services/dfa-application-start.service';
import { HomeOwnerApplicationMappingService } from './homeowner-application-mapping.service';
import { HomeOwnerApplicationDataService } from './homeowner-application-data.service';

@Injectable({ providedIn: 'root' })
export class HomeOwnerApplicationService {
  private _fullTimeOccupants: Array<FullTimeOccupant> = [];
  private _otherContacts: Array<OtherContact> = [];
  private _secondaryApplicants: Array<SecondaryApplicant> = [];

  constructor(
    private homeOwnerApplicationMapping: HomeOwnerApplicationMappingService,
    private homeOwnerApplicationDataService: HomeOwnerApplicationDataService
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
    this.homeOwnerApplicationDataService.occupants = {
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
    this.homeOwnerApplicationDataService.occupants = {
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
    this.homeOwnerApplicationDataService.occupants = {
      fullTimeOccupants: this.fullTimeOccupants,
      otherContacts: this.otherContacts,
      secondaryApplicants: this.secondaryApplicants
    }
  }
 }
