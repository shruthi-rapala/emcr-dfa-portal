import { Injectable } from '@angular/core';
import { FullTimeOccupant, HomeOwnerApplication, OccupantContact } from 'src/app/core/model/homeowner-application.model';
// import { DFAApplicationService as Service } from '../../core/api/services/dfa-application.service';
import { HomeOwnerApplicationMappingService } from './homeowner-application-mapping.service';
import { HomeOwnerApplicationDataService } from './homeowner-application-data.service';

@Injectable({ providedIn: 'root' })
export class HomeOwnerApplicationService {
  private _fullTimeOccupants: Array<FullTimeOccupant> = [];
  private _otherContacts: Array<OccupantContact> = [];
  private _secondaryApplicants: Array<OccupantContact> = [];

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

  public get otherContacts(): Array<OccupantContact> {
    return this._otherContacts;
  }

  public set otherContacts(value: Array<OccupantContact>) {
    this._otherContacts = value;
  }

  public setOtherContacts(contacts: OccupantContact[]): void {
    const otherContactsArray: Array<OccupantContact> = [];
    for (const contact of contacts) {
      const otherContact: OccupantContact = {
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

  public get secondaryApplicants(): Array<OccupantContact> {
    return this._secondaryApplicants;
  }

  public set secondaryApplicants(value: Array<OccupantContact>) {
    this._secondaryApplicants = value;
  }

  public setSecondaryApplicants(contacts: OccupantContact[]): void {
    const secondaryApplicantsArray: Array<OccupantContact> = [];
    for (const contact of contacts) {
      const secondaryApplicant: OccupantContact = {
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
