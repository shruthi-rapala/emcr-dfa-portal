import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DisasterEvent, EffectedRegionCommunity } from 'src/app/core/api/models';
import { EligibilityService } from 'src/app/core/api/services';
import { DFAApplicationMainDataService } from 'src/app/feature-components/dfa-application-main/dfa-application-main-data.service';
import { ProfileDataService } from 'src/app/feature-components/profile/profile-data.service';

@Component({
  selector: 'app-dfa-events',
  templateUrl: './dfa-events.component.html',
  styleUrls: ['./dfa-events.component.scss']
})
export class DfaEventsComponent implements OnInit {
  openDisasterEvents: DisasterEvent[] = [];
  effectedRegionCommunities: EffectedRegionCommunity[] = [];
  effectedRegionCommunitiesColumnsToDisplay = ['communityName', 'regionName'];
  effectedRegionCommunitiesDataSource = new MatTableDataSource();

  constructor (
     public eligibilityService: EligibilityService,
     private router: Router,
     private profileDataService: ProfileDataService,
     private dfaApplicationMainDataService: DFAApplicationMainDataService,
    )
    { }

  ngOnInit(): void {
    this.getOpenDisasterEvents();
    this.getEffectedRegionCommunities();
  }

  getOpenDisasterEvents() {
    this.eligibilityService.eligibilityGetOpenEvents().subscribe((openDisasterEvents: DisasterEvent[]) => {
      this.openDisasterEvents = openDisasterEvents;
    });
  }

  getEffectedRegionCommunities() {
    this.eligibilityService.eligibilityGetRegionCommunties().subscribe((effectedRegionCommunities: EffectedRegionCommunity[]) => {
      this.effectedRegionCommunities = effectedRegionCommunities;
      this.effectedRegionCommunitiesDataSource.data = effectedRegionCommunities;
    })
  }

  getEffectedRegionCommuntiesForEvent(eventId: string): EffectedRegionCommunity[] {
    return this.effectedRegionCommunities.filter(x => x.eventId == eventId);
  }

  checkEligibility() {
    this.dfaApplicationMainDataService.setViewOrEdit('add');
    var profileId = this.profileDataService.getProfileId();
    this.router.navigate(['/dfa-prescreening']);
  }
}
