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
  lstApplications: ApplicationExtended[] = [];
  isLinear = true;
  current = 1;
  public appType: string;
  private sixtyOneDaysAgo: number;
  public isLoading: boolean = true;
  public color: string = "'#169BD5";

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
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
      }
    });

  }

  mapData(lstApp: Object): void {
    var res = JSON.parse(JSON.stringify(lstApp));
    this.lstApplications = res;
    this.lstApplications.forEach(x => {
      if ((x.applicationStatusPortal.toLowerCase() === "dfa decision made"
        || x.applicationStatusPortal.toLowerCase() === "closed: inactive" || x.applicationStatusPortal.toLowerCase() === "closed: withdrawn")
        && (x.dateFileClosed && (this.sixtyOneDaysAgo <= new Date(x.dateFileClosed).getDate()))) { // TODO: uncomment
          x.currentApplication = false;
      } else x.currentApplication = true;
    })
    if (this.appType === "current") {
      this.lstApplications = this.lstApplications
         .filter(x => x.currentApplication === true);
      this.appSessionService.currentApplicationsCount?.emit(this.lstApplications.length);
    } else {
      this.lstApplications = this.lstApplications
        .filter(x => x.currentApplication === false);
      this.appSessionService.pastApplicationsCount?.emit(this.lstApplications.length);
    }
  }

  ViewApplication(applItem: ApplicationExtended): void {
    this.dfaApplicationMainDataService.setApplicationId(applItem.applicationId);
    this.dfaApplicationStartDataService.setApplicationId(applItem.applicationId);

    if (applItem.primaryApplicantSignedDate == null) {
      this.dfaApplicationMainDataService.setViewOrEdit('update');
    }
    else if (applItem.currentApplication === true) {
      this.dfaApplicationMainDataService.setViewOrEdit('view');
    } else if (applItem.currentApplication === false) {
      this.dfaApplicationMainDataService.setViewOrEdit('viewOnly');
    }

    this.router.navigate(['/dfa-application-main/'+applItem.applicationId]);
  }

  EditApplication(applicationId: string, tabId: string): void {
    this.dfaApplicationMainDataService.setApplicationId(applicationId);
    this.dfaApplicationStartDataService.setApplicationId(applicationId);
    this.dfaApplicationMainDataService.setViewOrEdit('edit');
    this.dfaApplicationMainDataService.setEditStep(tabId);
    this.router.navigate(['/dfa-application-main/'+applicationId]);
  }

}

export interface ApplicationExtended extends CurrentApplication {
  currentApplication: boolean;
}
