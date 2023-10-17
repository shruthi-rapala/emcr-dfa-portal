import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DashboardComponent } from '../../../feature-components/dashboard/dashboard.component';
import { ProfileDataService } from 'src/app/feature-components/profile/profile-data.service';
import { ApplicationService as Service } from '../../../core/api/services/application.service';
import { AppSessionService } from 'src/app/core/services/appSession.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DFAApplicationMainDataService } from 'src/app/feature-components/dfa-application-main/dfa-application-main-data.service';
import { DFAApplicationStartDataService } from 'src/app/feature-components/dfa-application-start/dfa-application-start-data.service';
import { CurrentApplication } from 'src/app/core/api/models';

@Component({
  selector: 'app-dfadashboard-application',
  templateUrl: './dfa-application.component.html',
  styleUrls: ['./dfa-application.component.scss']
})
export class DfaApplicationComponent implements OnInit {

  addNewItem(value: number) {
    this.appSessionService.currentApplicationsCount.emit(value);
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
  lstApplications: CurrentApplication[] = [];
  isLinear = true;
  current = 1;
  public appType: string;
  private sixtyOneDaysAgo: number;

  constructor(
    private profileDataService: ProfileDataService,
    private appService: Service,
    private appSessionService: AppSessionService,
    private router: Router,
    private dfaApplicationMainDataService: DFAApplicationMainDataService,
    private dfaApplicationStartDataService: DFAApplicationStartDataService,
    private route: ActivatedRoute
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.appType = this.route.snapshot.data["apptype"];
    this.sixtyOneDaysAgo = new Date().getDate()-61;
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
    if (this.appType === "current") {
      this.lstApplications = this.lstApplications
         .filter(x => (x.applicationStatusPortal != "DFA Decision Made"
         && x.applicationStatusPortal != "Closed: Inactive" && x.applicationStatusPortal != "Closed: Withdrawn")
         || (!x.dateFileClosed || (this.sixtyOneDaysAgo > new Date(x.dateFileClosed).getDate())));
      this.appSessionService.currentApplicationsCount?.emit(this.lstApplications.length);
    } else {
      this.lstApplications = this.lstApplications
        .filter(x => (x.applicationStatusPortal === "DFA Decision Made"
        || x.applicationStatusPortal === "Closed: Inactive" || x.applicationStatusPortal === "Closed: Withdrawn")
        && (x.dateFileClosed && (this.sixtyOneDaysAgo <= new Date(x.dateFileClosed).getDate())));
      this.appSessionService.pastApplicationsCount?.emit(this.lstApplications.length);
    }
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
