import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationService as Service } from '../../../core/api/services/application.service';
import { AppSessionService } from 'src/app/core/services/appSession.service';

@Component({
  selector: 'app-dfa-profile',
  templateUrl: './dfa-profile.component.html',
  styleUrls: ['./dfa-profile.component.scss']
})
export class DfaProfileComponent implements OnInit {
  type = 'profile';
  profileHeading: string;
  parentPageName = 'dfa-dashboard';
  currentFlow: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: Service,
    private appSessionService: AppSessionService,
  ) {
  }

  ngOnInit(): void {
    this.currentFlow = this.route.snapshot.data.flow;

    this.appService.applicationGetDfaApplications().subscribe({
      next: (lstData) => {
        if (lstData != null) {
          this.mapData(lstData);
        }
      },
      error: (error) => {
        document.location.href = 'https://dfa.gov.bc.ca/error.html';
      }
    });
  }

  mapData(lstApp: Object): void {
    var res = JSON.parse(JSON.stringify(lstApp));
    this.appSessionService.appNumber = res.length.toString() != null ? res.length.toString() : "0";
  }
}
