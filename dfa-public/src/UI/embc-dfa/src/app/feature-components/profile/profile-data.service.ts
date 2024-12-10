import { Injectable } from '@angular/core';
import {
  Address,
  Profile,
  PersonDetails,
  ContactDetails,
} from 'src/app/core/api/models';
import { RegAddress } from 'src/app/core/model/address';
import { CacheService } from 'src/app/core/services/cache.service';
import { LocationService } from 'src/app/core/services/location.service';

@Injectable({ providedIn: 'root' })
export class ProfileDataService {
  private loginProfile: Profile;
  private profile: Profile;
  private profileId: string;
  private personalDetail: PersonDetails;
  private primaryAddressDetail: RegAddress;
  private mailingAddressDetail: RegAddress;
  private contactDetail: ContactDetails;
  private isMailingAddressSameAsPrimaryAddress: string;

  public get personalDetails(): PersonDetails {
    return this.personalDetail;
  }
  public set personalDetails(value: PersonDetails) {
    this.personalDetail = value;
  }

  public get primaryAddressDetails(): RegAddress {
    return this.primaryAddressDetail;
  }
  public set primaryAddressDetails(value: RegAddress) {
    this.primaryAddressDetail = value;
  }

  public get mailingAddressDetails(): RegAddress {
    return this.mailingAddressDetail;
  }
  public set mailingAddressDetails(value: RegAddress) {
    this.mailingAddressDetail = value;
  }

  public get contactDetails(): ContactDetails {
    return this.contactDetail;
  }
  public set contactDetails(value: ContactDetails) {
    this.contactDetail = value;
  }

  public get IsMailingAddressSameAsPrimaryAddressDetails(): string {
    return this.isMailingAddressSameAsPrimaryAddress;
  }

  public set IsMailingAddressSameAsPrimaryAddressDetails(value: string) {
    this.isMailingAddressSameAsPrimaryAddress = value;
  }

  constructor(
    private cacheService: CacheService,
    private locationService: LocationService
  ) {}

  public getProfile(): Profile {
    if (this.profile === null || undefined) {
      this.profile = JSON.parse(this.cacheService.get('profile'));
    }
    return this.profile;
  }

  public setProfile(profile: Profile): void {
    this.profile = profile;
    this.cacheService.set('profile', profile);
  }

  public getLoginProfile(): Profile {
    if (this.loginProfile === null || undefined) {
      this.loginProfile = JSON.parse(this.cacheService.get('loginProfile'));
    }
    return this.loginProfile;
  }
  public setLoginProfile(loginProfile: Profile): void {
    this.loginProfile = loginProfile;
    //this.cacheService.set('loginProfile', loginProfile);
  }

  public setProfileId(profileId: string): void {
    this.profileId = profileId;
  }

  public getProfileId(): string {
    return this.profileId;
  }


  public createProfileDTO(): Profile {
    return {
      contactDetails: this.contactDetails,
      mailingAddress: this.locationService.setAddressObjectForDTO(
        this.mailingAddressDetails
      ),
      personalDetails: this.personalDetails,
      primaryAddress: this.locationService.setAddressObjectForDTO(
        this.primaryAddressDetails
      ),
      isMailingAddressSameAsPrimaryAddress: this.isMailingAddressSameAsPrimaryAddress,
      id: this.profileId
    };
  }
}
