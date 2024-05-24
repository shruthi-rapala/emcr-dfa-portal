import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DashboardComponent } from '../../../feature-components/dashboard/dashboard.component';
import { ProfileDataService } from 'src/app/feature-components/profile/profile-data.service';
import { ApplicationService as Service } from '../../../core/api/services/application.service';
import { ProjectService } from '../../../core/api/services/project.service';
import { AppSessionService } from 'src/app/core/services/appSession.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DFAApplicationMainDataService } from 'src/app/feature-components/dfa-application-main/dfa-application-main-data.service';
import { DFAApplicationStartDataService } from 'src/app/feature-components/dfa-application-start/dfa-application-start-data.service';
import { CurrentApplication, CurrentProject } from 'src/app/core/api/models';

@Component({
  selector: 'app-dfadashboard-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class DfaDashProjectComponent implements OnInit {

  addNewItem(value: number) {
    this.appSessionService.currentProjectsCount.emit(value);
  }

  items = [
    { status: "", stage: "", statusColor: "", isCompleted: false, currentStep: false, isFinalStep: false, isErrorInStatus: false },
    { status: "Draft", stage: "", statusColor: "#639DD4" , isCompleted: false, currentStep: false, isFinalStep: false, isErrorInStatus: false },
    { status: "", stage: "", statusColor: "", isCompleted: false, currentStep: false, isFinalStep: false, isErrorInStatus: false },
    { status: "", stage: "", statusColor: "", isCompleted: false, currentStep: false, isFinalStep: false, isErrorInStatus: false },
    { status: "Submitted", stage: "", statusColor: "#FDCB52", isCompleted: false, currentStep: false, isFinalStep: false, isErrorInStatus: false },
    { status: "", stage: "", statusColor: "", isCompleted: false, currentStep: false, isFinalStep: false, isErrorInStatus: false },
    { status: "", stage: "", statusColor: "", isCompleted: false, currentStep: false, isFinalStep: false, isErrorInStatus: false },
    { status: "Under Review", stage: "", statusColor: "#FDCB52", isCompleted: false, currentStep: false, isFinalStep: false, isErrorInStatus: false },
    { status: "", stage: "", statusColor: "", isCompleted: false, currentStep: false, isFinalStep: false, isErrorInStatus: false },
    { status: "", stage: "", statusColor: "", isCompleted: false, currentStep: false, isFinalStep: false, isErrorInStatus: false },
    { status: "Approval Pending", stage: "", statusColor: "#FDCB52", isCompleted: false, currentStep: false, isFinalStep: false, isErrorInStatus: false },
    { status: "", stage: "", statusColor: "", isCompleted: false, currentStep: false, isFinalStep: false, isErrorInStatus: false },
    { status: "", stage: "", statusColor: "", isCompleted: false, currentStep: false, isFinalStep: false, isErrorInStatus: false },
    { status: "Decision Made", stage: "", statusColor: "#62A370", isCompleted: false, currentStep: false, isFinalStep: true, isErrorInStatus: false },
    { status: "", stage: "", statusColor: "", isCompleted: false, currentStep: false, isFinalStep: false, isErrorInStatus: false },

  ];
  lstProjects: ProjectExtended[] = [];
  lstFilteredProjects: ProjectExtended[] = [];
  matchStatusFound = false;
  isLinear = true;
  current = 1;
  public apptype: string;
  private sixtyOneDaysAgo: number;
  public isLoading: boolean = true;
  public color: string = "'#169BD5";
  public searchTextInput: string = '';
  public stageSelected: string = '';
  public sortfieldSelected: string = '';
  public filterbydaysSelected: number;

  constructor(
    private profileDataService: ProfileDataService,
    private appService: Service,
    private projService: ProjectService,
    private appSessionService: AppSessionService,
    private router: Router,
    private dfaApplicationMainDataService: DFAApplicationMainDataService,
    private dfaApplicationStartDataService: DFAApplicationStartDataService,
    private route: ActivatedRoute
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.apptype = this.route.snapshot.data["apptype"];
    this.sixtyOneDaysAgo = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 61)).getTime()
  }

  ngOnInit(): void {
    var applicationId = '807d7779-2113-ef11-b84d-00505683fbf4'; //this.dfaApplicationMainDataService.getApplicationId();

    this.projService.projectGetDfaProjects({ applicationId: applicationId }).subscribe({
      next: (lstData) => {
        if (lstData != null) {
          var lstDataModified = [];
          var lstDataUnModified = [];
          var initialList = lstData;
          lstDataUnModified.push(initialList);
          lstData.forEach(objApp => {
            var isFound = false;
            var jsonVal = JSON.stringify(this.items);
            objApp.isErrorInStatus = false;
            objApp.statusBar = JSON.parse(jsonVal);
            objApp.statusBar.forEach(objStatItem => {
              if (objApp.status != null && objStatItem.status.toLowerCase() == objApp.status.toLowerCase()) {
                objStatItem.currentStep = true;
                isFound = true
                this.matchStatusFound = true;

                if (objApp.stage) {
                  objStatItem.stage = objApp.stage;
                }

                objApp.statusColor = objStatItem.statusColor;

                if (objApp.stage == 'Ineligible' || objApp.stage == 'Withdrwan') {
                  objApp.statusColor = '#E25E63';
                }
              }

              if (isFound == false) {
                objStatItem.isCompleted = true;
              }

              if (objStatItem.isFinalStep == true) {
                if (isFound == false) {
                  objApp.isErrorInStatus = true;
                }
                else if (objStatItem.status.toLowerCase() == objApp.status.toLowerCase()) {
                  objStatItem.isCompleted = true;
                }
              }

            });

            lstDataModified.push(objApp);
          })

          this.mapData(lstDataModified);
        }
            //this.mapData(lstData);
        this.isLoading = false;
      },
      error: (error) => {
        document.location.href = 'https://dfa.gov.bc.ca/error.html';
        this.isLoading = false;
      }
    });
    this.isLoading = false;
  }

  Toggle(applItem): void {
    if (applItem.isHidden) {
      applItem.isHidden = false;
    }
    else {
      applItem.isHidden = true;
    }
  }

  getItems(lst) {
    return lst.filter((item) => item.status !== '');
  }

  getStatusBarItems(lst) {
    return lst.filter((item) => item.status !== '');
  }

  mapData(lstApp: Object): void {
    var res = JSON.parse(JSON.stringify(lstApp));
    this.lstProjects = res;
    //dfa decision made
    this.lstProjects.forEach(x => {
      if (
        (x.status.toLowerCase() === "decision made"
          || x.status.toLowerCase() === "closed: inactive" || x.status.toLowerCase() === "closed: withdrawn")
        )
      {
          x.currentProject = false;
      } else x.currentProject = true;
    })
    if (this.apptype === "current") {
      this.lstProjects = this.lstProjects
        .filter(x => x.currentProject === true);
      this.appSessionService.currentProjectsCount?.emit(this.lstProjects.length);
    } else {
      this.lstProjects = this.lstProjects
        .filter(x => x.currentProject === false);
      this.appSessionService.pastProjectsCount?.emit(this.lstProjects.length);
    }

    this.lstFilteredProjects = this.lstProjects;
  }

  ApplyFilter(type: number, searchText: string): void {
    var lstProjectsFilterting = this.lstProjects;

    if (searchText != null){
      this.searchTextInput = searchText;
    }

    if (this.stageSelected != '' && this.stageSelected != null) {

      if (this.stageSelected == 'All') {
        lstProjectsFilterting = lstProjectsFilterting;
      }
      else if (this.stageSelected == 'Approved') {
        lstProjectsFilterting = lstProjectsFilterting.filter(m => m.status.toLowerCase() == 'decision made' && m.stage.toLowerCase() == 'approved');
      } else if (this.stageSelected == 'Closed') {
        lstProjectsFilterting = lstProjectsFilterting.filter(m => m.status.toLowerCase() == 'decision made' && m.stage.toLowerCase() != 'approved');
      }
      else {
        lstProjectsFilterting = lstProjectsFilterting.filter(m => m.status.toLowerCase().indexOf(this.stageSelected.toLowerCase()) > -1);
      }
    }

    if (this.filterbydaysSelected && this.filterbydaysSelected != -1) {
      var backdate = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * this.filterbydaysSelected));
      lstProjectsFilterting = lstProjectsFilterting.filter(m => (backdate <= new Date(m.createdDate)));
    }

    if (this.sortfieldSelected != '' && this.sortfieldSelected != null) {
      if (this.sortfieldSelected == 'projectname') {
        lstProjectsFilterting = lstProjectsFilterting.sort((a, b) => (a.projectName > b.projectName) ? 1 : ((b.projectName > a.projectName) ? -1 : 0))
      } else if (this.sortfieldSelected == 'projectnumber') {
        lstProjectsFilterting = lstProjectsFilterting.sort((a, b) => (a.projectNumber > b.projectNumber) ? 1 : ((b.projectNumber > a.projectNumber) ? -1 : 0))
      } else if (this.sortfieldSelected == 'sitelocation') {
        lstProjectsFilterting = lstProjectsFilterting.sort((a, b) => (a.siteLocation > b.siteLocation) ? 1 : ((b.siteLocation > a.siteLocation) ? -1 : 0))
      } else if (this.sortfieldSelected == 'completiondate') {
        lstProjectsFilterting = lstProjectsFilterting.sort((a, b) => (new Date(a.estimatedCompletionDate) > new Date(b.estimatedCompletionDate)) ? 1 : (new Date(b.estimatedCompletionDate) > new Date(a.estimatedCompletionDate) ? -1 : 0))
      } else if (this.sortfieldSelected == '18monthdeadline') {
        lstProjectsFilterting = lstProjectsFilterting.sort((a, b) => (new Date(a.deadline18Month) > new Date(b.deadline18Month)) ? 1 : (new Date(b.deadline18Month) > new Date(a.deadline18Month) ? -1 : 0))
      }
    }
    
    if (this.searchTextInput != null) {
      lstProjectsFilterting = lstProjectsFilterting.filter(m => m.projectName.toLowerCase().indexOf(this.searchTextInput.toLowerCase()) > -1
        || m.projectNumber.toLowerCase().indexOf(this.searchTextInput.toLowerCase()) > -1
        || m.siteLocation.toLowerCase().indexOf(this.searchTextInput.toLowerCase()) > -1);
    }

    this.lstFilteredProjects = lstProjectsFilterting;
        
  }

  ViewProject(applItem: ProjectExtended): void {
    //this.dfaApplicationMainDataService.setApplicationId(applItem.applicationId);
    //this.dfaApplicationStartDataService.setApplicationId(applItem.applicationId);
    
    ////if (applItem.primaryApplicantSignedDate == null && applItem.currentApplication != false) {
    ////  this.dfaApplicationMainDataService.setViewOrEdit('update');
    ////}
    ////else
    //if(applItem.currentApplication === true) {
    //  this.dfaApplicationMainDataService.setViewOrEdit('view');
    //} else if (applItem.currentApplication === false) {
    //  this.dfaApplicationMainDataService.setViewOrEdit('viewOnly');
    //}

    //this.router.navigate(['/dfa-application-main/'+applItem.applicationId]);
  }

  //ViewProjects(applItem: ProjectExtended): void {
  //  this.dfaApplicationMainDataService.setApplicationId(applItem.applicationId);
  //  this.dfaApplicationStartDataService.setApplicationId(applItem.applicationId);

  //  if (applItem.currentApplication === true) {
  //    this.dfaApplicationMainDataService.setViewOrEdit('view');
  //  } else if (applItem.currentApplication === false) {
  //    this.dfaApplicationMainDataService.setViewOrEdit('viewOnly');
  //  }

  //  this.router.navigate(['/dfa-application/' + applItem.applicationId + '/projects']);
  //}

  //EditProject(applicationId: string, tabId: string): void {
  //  this.dfaApplicationMainDataService.setApplicationId(applicationId);
  //  this.dfaApplicationStartDataService.setApplicationId(applicationId);
  //  this.dfaApplicationMainDataService.setViewOrEdit('edit');
  //  this.dfaApplicationMainDataService.setEditStep(tabId);
  //  this.router.navigate(['/dfa-application-main/'+applicationId]);
  //}

}

export interface ProjectExtended extends CurrentProject {
  currentProject: boolean;
}
