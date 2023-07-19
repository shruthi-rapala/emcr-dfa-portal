import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DashboardComponent } from '../../../feature-components/dashboard/dashboard.component'

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

  lstApplications = [{
                "dfa_applicanttype": "Small Business",
                "dfa_damagedpropertyaddress": "1600 Riverside, Courtenay",
                "dfa_caseid": "1101",
                "dfa_dateofdamage": "13-Jul-2023",
                "dfa_eventid": "Atmospheric River"
              },
              {
                "dfa_applicanttype": "Home Owner",
                "dfa_damagedpropertyaddress": "8900 Fitzgerald, Victoria",
                "dfa_caseid": "2204",
                "dfa_dateofdamage": "13-Jul-2023",
                "dfa_eventid": "Atmospheric River"
              }];

  constructor() { }

  ngOnInit(): void {
    //DashboardComponent.currentApplicationsCount = 2
    //this.addNewItem(3);
  }

}
