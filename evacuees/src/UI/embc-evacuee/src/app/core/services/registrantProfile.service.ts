import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserProfile } from '../api/models/user-profile';
import { ProfileService } from '../api/services';

@Injectable({ providedIn: 'root' })
export class RegistrantProfileService {

  userType: boolean

  constructor(private profileService: ProfileService) { }

  public getExistingProfile(): Observable<UserProfile> {
    return this.profileService.profileGetProfileConflicts();
  }
}