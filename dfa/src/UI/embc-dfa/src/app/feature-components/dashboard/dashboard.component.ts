import { Component, OnInit, OnDestroy } from '@angular/core';
import { TabModel } from 'src/app/core/model/tab.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormCreationService } from 'src/app/core/services/formCreation.service';
import { ApplicationService as Service } from '../../core/api/services/application.service';
import { ProfileService } from '../profile/profile.service';
import { ProfileDataService } from 'src/app/feature-components/profile/profile-data.service';
import { tap } from 'rxjs/internal/operators/tap';
import { AppSessionService } from 'src/app/core/services/appSession.service';
import { DFAApplicationMainDataService } from 'src/app/feature-components/dfa-application-main/dfa-application-main-data.service';
import { Observable, Subject } from 'rxjs';
import { EligibilityService } from 'src/app/core/api/services';
import { DisasterEvent } from 'src/app/core/api/models';
//import {
//  DfaAppapplication
//} from 'src/app/core/api/models';

@Component({
  selector: 'app-dfa-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentFlow: string;
  currentApplicationsCount = "0";
  pastApplicationsCount = "0";
  eventsCount = "0";
  isLoading = false;
  bgColor = 'transparent';
  intervalId;

  tabs: DashTabModel[];
  openDisasterEvents: DisasterEvent[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public formCreationService: FormCreationService,
    private appService: Service,
    private eligibilityService: EligibilityService,
    private profService: ProfileService,
    private profileDataService: ProfileDataService,
    private appSessionService: AppSessionService,
    private dfaApplicationMainDataService: DFAApplicationMainDataService,
  ) { }

  ngOnInit(): void {
    this.currentFlow = this.route.snapshot.data.flow;
    this.profService.getProfile();
    //alert(this.appSessionService.appNumber);
    this.currentApplicationsCount = this.appSessionService.appNumber;

    this.isLoading = true;

    this.intervalId = setInterval(() => {
      this.currentApplicationsCount = this.appSessionService.appNumber;
      if (this.appSessionService.appNumber != null && this.appSessionService.appNumber != 'null') {
        clearInterval(this.intervalId);
        this.appSessionService.appNumber = null;
      }
    }, 100);

    this.eligibilityService.eligibilityGetOpenEvents().subscribe((openDisasterEvents: DisasterEvent[]) => {
      this.eventsCount = (openDisasterEvents ? openDisasterEvents.length : 0).toString();
    })

    setTimeout(
      function () {

        this.tabs = [
          {
            label: 'Current Applications',
            route: 'current',
            activeImage: '/assets/images/past-evac-active.svg',
            inactiveImage: '/assets/images/past-evac.svg',
            count: this.currentApplicationsCount
          },
          {
           label: 'DFA Events',
           route: 'eventlist',
           activeImage: '/assets/images/curr-evac-active.svg',
           inactiveImage: '/assets/images/curr-evac.svg',
           count: this.eventsCount
          },
          //{
          //  label: 'Past Applications',
          //  route: 'past',
          //  activeImage: '/assets/images/past-evac-active.svg',
          //  inactiveImage: '/assets/images/past-evac.svg',
          //  count: this.pastApplicationsCount
          //},
          {
            label: 'Profile',
            route: 'profile',
            activeImage: '/assets/images/profile-active.svg',
            inactiveImage: '/assets/images/profile.svg',
            count: ""
          }
        ];

        this.isLoading = false;
      }.bind(this),
      2000
    );
  }

  navigateToDFAPrescreening(): void {
    this.dfaApplicationMainDataService.setViewOrEdit('add');
    var profileId = this.profileDataService.getProfileId();
    this.router.navigate(['/dfa-prescreening']);
    //this.appService.applicationGetDfaApplications({ profileId: profileId }).subscribe({
    //  next: (loginProfile) => {
    //    //this.profileMapping.mapLoginProfile(loginProfile);
    //  },
    //  error: (error) => {
    //  }
    //});
  }

}
export interface DashTabModel {
  label: string;
  route: string;
  activeImage?: string | null;
  inactiveImage?: string | null;
  count: string;
}
