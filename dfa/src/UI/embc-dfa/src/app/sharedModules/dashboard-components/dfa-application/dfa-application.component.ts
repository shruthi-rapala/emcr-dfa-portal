import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DashboardComponent } from '../../../feature-components/dashboard/dashboard.component';
import { ProfileDataService } from 'src/app/feature-components/profile/profile-data.service';
import { ApplicationService as Service } from '../../../core/api/services/application.service';
import { AppSessionService } from 'src/app/core/services/appSession.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { DFAApplicationMainDataService } from 'src/app/feature-components/dfa-application-main/dfa-application-main-data.service';
import { DFAApplicationStartDataService } from 'src/app/feature-components/dfa-application-start/dfa-application-start-data.service';
import {
  bookIcon,
  eyeIcon,
  fileAddIcon,
  paperclipIcon,
  userIcon,
} from "@progress/kendo-svg-icons";

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

  items = [
    { label: "Draft Application", isCompleted : true, currentStep : false },
    { label: "Submitted Application", isCompleted: true, currentStep: false },
    { label: "Reviewing Application", isCompleted: true, currentStep: false },
    { label: "Creating Case File", isCompleted: true, currentStep: false },
    { label: "Confirming Eligibility", isCompleted: false, currentStep: true },
    { label: "Assessing Damage", isCompleted: false, currentStep: false },
    { label: "Reviewing Damage Report", isCompleted: false, currentStep: false },
    { label: "DFA Decision made", isCompleted: false, currentStep: false },
  ];
  lstApplications = [];
  isLinear = true;
  current = 1;

  constructor(
    private profileDataService: ProfileDataService,
    private appService: Service,
    private appSessionService: AppSessionService,
    private router: Router,
    private dfaApplicationMainDataService: DFAApplicationMainDataService,
    private dfaApplicationStartDataService: DFAApplicationStartDataService,
  ) {
    const navigation = this.router.getCurrentNavigation();
  }

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
    this.appSessionService.appNumber = res.length.toString() != null ? res.length.toString() : "0" ;
    this.lstApplications = res;
  }

  ViewApplication(applicationId: string, primaryApplicantSignedDate: string): void {
    this.dfaApplicationMainDataService.setApplicationId(applicationId);
    this.dfaApplicationStartDataService.setApplicationId(applicationId);

    if (primaryApplicantSignedDate == null) {
      this.dfaApplicationMainDataService.setViewOrEdit('update');
    }
    else {
      this.dfaApplicationMainDataService.setViewOrEdit('view');
    }

    this.router.navigate(['/dfa-application-main/'+applicationId]);
  }

  EditApplication(applicationId: string, tabId: string): void {
    this.dfaApplicationMainDataService.setApplicationId(applicationId);
    this.dfaApplicationStartDataService.setApplicationId(applicationId);
    this.dfaApplicationMainDataService.setViewOrEdit('edit');
    this.dfaApplicationMainDataService.setEditStep(tabId);
    this.router.navigate(['/dfa-application-main/'+applicationId]);
  }

}
