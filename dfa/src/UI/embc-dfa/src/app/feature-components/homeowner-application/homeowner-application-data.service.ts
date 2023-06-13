import { Injectable } from '@angular/core';
import { HomeOwnerApplication, FirstNationsReserve} from 'src/app/core/model/homeowner-application.model';
import { Community, Country, StateProvince } from 'src/app/core/model/address';

@Injectable({ providedIn: 'root' })
export class HomeOwnerApplicationDataService {
  private _addressLine1: string;
  private _addressLine2?: string;
  private _community: Community | string;
  private _postalCode: string;
  private _stateProvince: StateProvince;
  private _country: Country;
  private _occupyAsPrimaryResidence: boolean;
  private _onAFirstNationsReserve: boolean;
  private _firstNationsReserve?: FirstNationsReserve | string | null;
  private _manufacturedHome?: null | boolean;
  private _eligibleForHomeOwnerGrant: null | boolean;

  constructor(
  ) {}

  public get addressLine1(): string {
    return this._addressLine1;
  }
  public set addressLine1(value: string) {
    this._addressLine1 = value;
  }

  public get addressLine2(): string | null {
    return this._addressLine2;
  }
  public set addressLine2(value: string) {
    this._addressLine2 = value;
  }

  public get community(): Community | string {
    return this._community;
  }
  public set community(value: Community | string) {
    this._community = value;
  }

  public get postalCode(): string {
    return this._postalCode;
  }
  public set postalCode(value: string) {
    this._postalCode = value;
  }

  public get stateProvince(): StateProvince {
    return this._stateProvince;
  }
  public set stateProvince(value: StateProvince) {
    this._stateProvince = value;
  }

  public get country(): Country {
    return this._country;
  }
  public set country(value: Country) {
    this._country = value;
  }

  public get occupyAsPrimaryResidence(): boolean {
    return this._occupyAsPrimaryResidence;
  }
  public set occupyAsPrimaryResidence(value: boolean) {
    this._occupyAsPrimaryResidence = value;
  }

  public get onAFirstNationsReserve(): boolean {
    return this._onAFirstNationsReserve;
  }
  public set onAFirstNationsReserve(value: boolean) {
    this._onAFirstNationsReserve = value;
  }

  public get firstNationsReserve(): FirstNationsReserve | string | null {
    return this._firstNationsReserve;
  }
  public set firstNationsReserve(value: FirstNationsReserve | string | null) {
    this._firstNationsReserve = value;
  }

  public get manufacturedHome(): null | boolean {
    return this._manufacturedHome;
  }
  public set manufacturedHome(value: null | boolean) {
    this._manufacturedHome = value;
  }

  public get eligibleForHomeOwnerGrant(): boolean {
    return this._eligibleForHomeOwnerGrant;
  }
  public set eligibleForHomeOwnerGrant(value: boolean) {
    this._eligibleForHomeOwnerGrant = value;
  }
}
