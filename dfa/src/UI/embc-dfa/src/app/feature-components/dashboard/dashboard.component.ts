import { Component, OnInit } from '@angular/core';
import { TabModel } from 'src/app/core/model/tab.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormCreationService } from 'src/app/core/services/formCreation.service';
import { ProfileService as Service } from '../../core/api/services/profile.service';
import { ProfileService } from '../profile/profile.service';
import { tap } from 'rxjs/internal/operators/tap';
import {
  DfaAppapplication
} from 'src/app/core/api/models';

@Component({
  selector: 'app-dfa-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentFlow: string;
  currentApplicationsCount = 0;
  pastApplicationsCount = 0;
  eventsCount = 0;
  

  tabs: DashTabModel[] = [
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
    {
      label: 'Past Applications',
      route: 'past',
      activeImage: '/assets/images/past-evac-active.svg',
      inactiveImage: '/assets/images/past-evac.svg',
      count: this.pastApplicationsCount
    },
    {
      label: 'Profile',
      route: 'profile',
      activeImage: '/assets/images/profile-active.svg',
      inactiveImage: '/assets/images/profile.svg',
      count: 0
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public formCreationService: FormCreationService,
    private profileService: Service,
    private profService: ProfileService,
  ) { }

  ngOnInit(): void {
    this.currentFlow = this.route.snapshot.data.flow;
    this.profService.getProfile();
  }

  navigateToDFAApplicationStart(): void {
    this.router.navigate(['/dfa-application-start']);
    //this.profileService.profileGetDfaApplications().pipe(
    //  tap((c: DfaAppapplication) => {
    //    alert('response')
    //  })
    //);;
  }

}
export interface DashTabModel {
  label: string;
  route: string;
  activeImage?: string | null;
  inactiveImage?: string | null;
  count: number;
}
