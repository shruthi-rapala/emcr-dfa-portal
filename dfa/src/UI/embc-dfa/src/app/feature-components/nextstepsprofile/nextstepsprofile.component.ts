import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileDataService } from '../profile/profile-data.service';

@Component({
  selector: 'app-nextstepsprofile',
  templateUrl: './nextstepsprofile.component.html',
  styleUrls: ['./nextstepsprofile.component.scss']
})
export class NextstepsprofileComponent implements OnInit {
  profileId: string;

  constructor(
    private router: Router,
    profileDataService: ProfileDataService
  ) {
    var profileId = profileDataService.getProfileId();
   }

  ngOnInit(): void {
  }

  navigateToDFAApplicationStart(): void {
    this.router.navigate(['/dfa-application-start']);
  }

  navigateToDashboard(): void {
    this.router.navigate(['/dfa-dashboard']);
  }

}
