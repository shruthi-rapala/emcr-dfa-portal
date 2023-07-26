import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DashboardComponent } from '../../../feature-components/dashboard/dashboard.component';
import { ProfileDataService } from 'src/app/feature-components/profile/profile-data.service';
import { ApplicationService as Service } from '../../../core/api/services/application.service';

@Component({
  selector: 'app-dfadashboard-application',
  templateUrl: './dfa-application.component.html',
  styleUrls: ['./dfa-application.component.scss']
})
export class DfaApplicationComponent implements OnInit {
  @Output() currentApplicationsCount = new EventEmitter<number>();

  addNewItem(value: number) {
    this.currentApplicationsCount.emit(value);
  }

  lstApplications = [];

  constructor(
    private profileDataService: ProfileDataService,
    private appService: Service
  ) {  }

  ngOnInit(): void {
    
    this.appService.applicationGetDfaApplications().subscribe({
      next: (lstData) => {
        if (lstData != null) {
          this.mapData(lstData);
        }
      },
      error: (error) => {
      }
    });

  }

  mapData(lstApp: Object): void {
    var res = JSON.parse(JSON.stringify(lstApp));
    this.lstApplications = res;
  }

}
