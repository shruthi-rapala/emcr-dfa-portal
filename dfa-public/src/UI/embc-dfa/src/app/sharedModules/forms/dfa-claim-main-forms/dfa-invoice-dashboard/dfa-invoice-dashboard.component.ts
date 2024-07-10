import { Component, OnInit, NgModule, Inject, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  AbstractControl,
  FormsModule,
  Validators,
  FormGroup,
  FormControl
} from '@angular/forms';
import { CommonModule, KeyValue } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { FormCreationService } from 'src/app/core/services/formCreation.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DirectivesModule } from '../../../../core/directives/directives.module';
import { CustomValidationService } from 'src/app/core/services/customValidation.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { DFAApplicationMainDataService } from 'src/app/feature-components/dfa-application-main/dfa-application-main-data.service';
import { ApplicantOption, ApplicantSubtypeSubCategories } from 'src/app/core/api/models';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomPipeModule } from 'src/app/core/pipe/customPipe.module';
import { DFADeleteConfirmDialogComponent } from '../../../../core/components/dialog-components/dfa-confirm-delete-dialog/dfa-confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { TextMaskModule } from 'angular2-text-mask';
import { ApplicationService, OtherContactService, ProjectService } from 'src/app/core/api/services';
import { DFAApplicationMainMappingService } from 'src/app/feature-components/dfa-application-main/dfa-application-main-mapping.service';
import { MatSelectModule } from '@angular/material/select';
import { DFAProjectMainDataService } from '../../../../feature-components/dfa-project-main/dfa-project-main-data.service';
import { DFAProjectMainMappingService } from '../../../../feature-components/dfa-project-main/dfa-project-main-mapping.service';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';
import { DashTabModel } from '../../../../feature-components/dashboard/dashboard.component';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { ProjectExtended } from '../../../project-dashboard-components/project/project.component';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 0,
  hideDelay: 0,
  touchendHideDelay: 0,
  disableTooltipInteractivity: true,
  touchGestures: 'on'
};

@Component({
  selector: 'app-dfa-invoice-dashboard',
  templateUrl: './dfa-invoice-dashboard.component.html',
  styleUrls: ['./dfa-invoice-dashboard.component.scss'],
  providers: [{ provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }]
})
export default class DFAInvoiceDashboardComponent implements OnInit, OnDestroy {
  //@ViewChild('projectName') projectName: ElementRef;
  lstInvoices: ProjectExtended[] = [];
  lstFilteredInvoices: ProjectExtended[] = [];
  tabs: DashTabModel[];
  currentProjectsCount = 0;
  closedProjectsCount = 0;
  message: string = '';
  recoveryPlanForm: UntypedFormGroup;
  formBuilder: UntypedFormBuilder;
  recoveryPlanForm$: Subscription;
  formCreationService: FormCreationService;
  remainingLength: number = 200;
  todayDate = new Date().toISOString();
  vieworedit: string = "";
  isReadOnly: boolean = false;
  showDates: boolean = false;
  hideHelp: boolean = true;
  timerID;
  invoicesCount: number = 0;
  public apptype: string;
  public searchTextInput: string = '';
  public stageSelected: string = '';
  public sortfieldSelected: string = '';
  public filterbydaysSelected: number;
  documentSummaryColumnsToDisplay = ['invoicenumber', 'vendorname', 'invoicedate', 'totalclaim', 'icons']
  documentSummaryDataSource = new MatTableDataSource();
  readonly phoneMask = [
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];

  constructor(
    @Inject('formBuilder') formBuilder: UntypedFormBuilder,
    @Inject('formCreationService') formCreationService: FormCreationService,
    public customValidator: CustomValidationService,
    public dfaApplicationMainDataService: DFAApplicationMainDataService,
    public dfaProjectMainDataService: DFAProjectMainDataService,
    private applicationService: ApplicationService,
    private projectService: ProjectService,
    private dfaApplicationMainMapping: DFAApplicationMainMappingService,
    private dfaProjectMainMapping: DFAProjectMainMappingService,
    private otherContactsService: OtherContactService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.formBuilder = formBuilder;
    this.formCreationService = formCreationService;
    this.isReadOnly = (dfaProjectMainDataService.getViewOrEdit() === 'view'
      || dfaProjectMainDataService.getViewOrEdit() === 'edit'
      || dfaProjectMainDataService.getViewOrEdit() === 'viewOnly');
    this.setViewOrEditControls();

    this.dfaProjectMainDataService.changeViewOrEdit.subscribe((vieworedit) => {
      this.isReadOnly = (vieworedit === 'view'
        || vieworedit === 'edit'
        || vieworedit === 'viewOnly');
      this.setViewOrEditControls();
    })
    this.apptype = this.route.snapshot.data["apptype"];

    this.vieworedit = dfaProjectMainDataService.getViewOrEdit();
  }

  numericOnly(event): boolean {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }

  setFocus() {
    //this.projectName.nativeElement.focus();
  }

  setViewOrEditControls() {
    if (!this.recoveryPlanForm) return;
    if (this.isReadOnly) {
      this.hideHelp = true;
      this.recoveryPlanForm.controls.estimatedCompletionDate.disable();
    } else {
      this.recoveryPlanForm.controls.estimatedCompletionDate.enable();
    }
  }

  ngOnInit(): void {
    this.recoveryPlanForm$ = this.formCreationService
      .getRecoveryPlanForm()
      .subscribe((recoveryPlan) => {
        this.recoveryPlanForm = recoveryPlan;
        this.setViewOrEditControls();
        this.dfaProjectMainDataService.recoveryPlan = {
          sitelocationdamageFromDate: null,
          sitelocationdamageToDate: null,
          projectName: null,
          projectNumber: null,
          isdamagedDateSameAsApplication: null
        }
        //this.propertyDamageForm.addValidators([this.validateFormCauseOfDamage]);
        //if (this.propertyDamageForm.get('otherDamage').value === 'true') {
        //  this.propertyDamageForm.get('otherDamageText').setValidators([Validators.required, Validators.maxLength(100)]);
        //} else {
        //  this.propertyDamageForm.get('otherDamageText').setValidators([Validators.maxLength(100)]);
        //}
        //this.propertyDamageForm.get('otherDamageText').updateValueAndValidity();
        //this.propertyDamageForm.updateValueAndValidity();
      });

    this.documentSummaryDataSource.data = [
      { invoicenumber: 'IN.001', vendorname: 'ABC Company', invoicedate: '03-JUL-2013', totalclaim: '$22,200' },
      { invoicenumber: 'IN.002', vendorname: 'Brick & Co.', invoicedate: '04-JUL-2013', totalclaim: '$18,900' },
      { invoicenumber: 'IN.003', vendorname: 'Home Depot', invoicedate: '15-JUL-2013', totalclaim: '$35,675' }

    ];

    let projectId = this.dfaProjectMainDataService.getProjectId();

    if (projectId) {
      this.getRecoveryPlan(projectId);
    }

    this.dfaProjectMainDataService.stepSelected.subscribe((stepSelected) => {
      if (stepSelected == "0" && this.dfaProjectMainDataService.getViewOrEdit() != 'viewOnly') {
        setTimeout(
          function () {
            this.hideHelp = false;
          }.bind(this),
          1000
        );
      }
      else {
        this.hideHelp = true;
      }
    })

    if (this.dfaProjectMainDataService.getViewOrEdit() == 'viewOnly') {
      this.recoveryPlanForm.disable();
    }
    else {
      setTimeout(
        function () {
          this.hideHelp = false;
        }.bind(this),
        1000
      );
    }

    //this.otherContactsForm.get('onlyOtherContact').setValue(this.onlyOtherContact);
    this.message = "Click on any field in the form to view detailed information " +
      "about what information is required and tips on how to fill " +
      "it out.\r\n" +
      "If you need more guidance, select the field and the " +
      "relevant details will be displayed to assist you.";


    this.tabs = [
      {
        label: 'Invoices',
        route: 'invoices',
        activeImage: '/assets/images/past-evac-active.svg',
        inactiveImage: '/assets/images/past-evac.svg',
        count: this.currentProjectsCount.toString()
      }
    ];

  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

  calcRemainingChars() {
    this.remainingLength = 200 - this.recoveryPlanForm.get('subtypeOtherDetails').value?.length;
  }

  selectDamageDates(choice: any) {
    if (choice.value == 'true') {
      this.showDates = false;
    }
    else if (choice.value == 'false') {
      this.showDates = true;
    }
  }

  ApplyFilter(type: number, searchText: string): void {
    var lstInvoicesFilterting = this.lstInvoices;

    if (searchText != null) {
      this.searchTextInput = searchText;
    }

    if (this.stageSelected != '' && this.stageSelected != null) {

      if (this.stageSelected == 'All') {
        lstInvoicesFilterting = lstInvoicesFilterting;
      }
      else if (this.stageSelected == 'Approved') {
        lstInvoicesFilterting = lstInvoicesFilterting.filter(m => m.status.toLowerCase() == 'decision made' && m.stage.toLowerCase() == 'approved');
      } else if (this.stageSelected == 'Closed') {
        lstInvoicesFilterting = lstInvoicesFilterting.filter(m => m.status.toLowerCase() == 'decision made' && m.stage.toLowerCase() != 'approved');
      }
      else {
        lstInvoicesFilterting = lstInvoicesFilterting.filter(m => m.status.toLowerCase().indexOf(this.stageSelected.toLowerCase()) > -1);
      }
    }

    if (this.filterbydaysSelected && this.filterbydaysSelected != -1) {
      var backdate = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * this.filterbydaysSelected));
      lstInvoicesFilterting = lstInvoicesFilterting.filter(m => (backdate <= new Date(m.createdDate)));
    }

    if (this.sortfieldSelected != '' && this.sortfieldSelected != null) {
      if (this.sortfieldSelected == 'claimnumber') {
        lstInvoicesFilterting = lstInvoicesFilterting.sort((a, b) => (a.projectName > b.projectName) ? 1 : ((b.projectName > a.projectName) ? -1 : 0))
      } else if (this.sortfieldSelected == 'submitteddate') {
        lstInvoicesFilterting = lstInvoicesFilterting.sort((a, b) => (a.projectNumber > b.projectNumber) ? 1 : ((b.projectNumber > a.projectNumber) ? -1 : 0))
      } else if (this.sortfieldSelected == 'claimpaiddate') {
        lstInvoicesFilterting = lstInvoicesFilterting.sort((a, b) => (new Date(a.estimatedCompletionDate) > new Date(b.estimatedCompletionDate)) ? 1 : (new Date(b.estimatedCompletionDate) > new Date(a.estimatedCompletionDate) ? -1 : 0))
      }
    }

    if (this.searchTextInput != null) {
      lstInvoicesFilterting = lstInvoicesFilterting.filter(m => m.projectName.toLowerCase().indexOf(this.searchTextInput.toLowerCase()) > -1
        || m.projectNumber.toLowerCase().indexOf(this.searchTextInput.toLowerCase()) > -1
        || m.siteLocation.toLowerCase().indexOf(this.searchTextInput.toLowerCase()) > -1);
    }

    this.lstFilteredInvoices = lstInvoicesFilterting;

  }

  getRecoveryPlan(projectId: string) {
    if (projectId) {
      this.projectService.projectGetProjectMain({ projectId: projectId }).subscribe({
        next: (dfaProjectMain) => {
          //console.log('dfaApplicationMain: ' + JSON.stringify(dfaApplicationMain))
          //if (dfaApplicationMain.notifyUser == true) {
          //  //this.notifyAddressChange();
          //}
          //debugger
          if (dfaProjectMain && dfaProjectMain.project && dfaProjectMain.project.isdamagedDateSameAsApplication == false) {
            this.showDates = true;
          }
          this.dfaProjectMainMapping.mapDFAProjectMain(dfaProjectMain);

        },
        error: (error) => {
          //console.error(error);
          //document.location.href = 'https://dfa.gov.bc.ca/error.html';
        }
      });
    }
  }

  validateFormCauseOfDamage(form: FormGroup) {
    if (form.controls.stormDamage.value !== true &&
      form.controls.landslideDamage.value !== true &&
      form.controls.otherDamage.value !== true &&
      form.controls.floodDamage.value !== true) {
      return { noCauseOfDamage: true };
    }
    return null;
  }

  /**
   * Returns the control of the form
   */
  get propertyDamageFormControl(): { [key: string]: AbstractControl } {
    return this.recoveryPlanForm.controls;
  }

  ngOnDestroy(): void {
    this.recoveryPlanForm$.unsubscribe();
  }

  setHelpText(inputSelection, tooltip: MatTooltip): void {
    switch (inputSelection) {
      case 1:
        this.message = "Project number\r\n\r\nThe project number is the unique project identifier that your organization assigned to the project's site location where damage has occurred.\r\nThe project identifier may be a number, letter, or any combination of letters and numbers.\r\nThis project number is specific to the site and is often referred to when discussing the location.";
        break;
      case 2:
        this.message = "Project name\r\n\r\nThe project name is the unique name that your organization assigned to the the project's site location where damage has occurred.\r\nThis project name is specific to the site and may also referenced when discussing the location.";
        break;
      case 3:
        this.message = "Are the dates of damage the same dates provided on the application?";
        break;
      case 4:
        this.message = "What is this site location's date(s) of damage:\r\n\r\nFrom date";
        break;
      case 5:
        this.message = "What is this site location's date(s) of damage:\r\n\r\nTo date";
        break;
      case 6:
        this.message = "Why is this site location's date(s) of damage different from dates provided on the application?";
        break;
      case 7:
        this.message = "Site location\r\n\r\nInclude the address of the building, road, bridge, dam, river, breakwater, wharf, dyke, levee, drainage facility, parking lot, or culvert that was damaged.";
        break;
      case 8:
        this.message = "What infrastructure was damaged?\r\n\r\nInclude the name or type of building, road, bridge, dam, river, breakwater, wharf, dyke, levee, drainage facility, parking lot, or culvert that was damaged.\r\nThis is referred to as the infrastructure in later questions.";
        break;
      case 9:
        this.message = "What caused the damage?\r\n\r\nProvide a brief explanation of how the damage was caused.";
        break;
      case 10:
        this.message = "Describe the damage\r\n\r\nDescribe what part(s) of the infrastructure were damaged.";
        break;
      case 11:
        this.message = "Describe the materials, including quantities and measurements, of the damaged infrastructure\r\n\r\nFor the damaged infrastructure provide a clear detailed description of what was damaged including the type of materials, quantities, and measurements that were damaged.";
        break;
      case 12:
        this.message = "Describe the repair work\r\n\r\nDescribe what needs to be done to restore the infrastructure to pre - event condition.";
        break;
      case 13:
        this.message = "Describe the materials, including quantities and measurements, to repair damaged infrastructure\r\nProvide a clear detailed description of the materials, quantities and measurements that are required to repair the damage.";
        break;
      case 14:
        this.message = "Estimated completion date (month/year)\r\n\r\nProvide the date you expect to complete the project.\r\nIf you don't have an exact date, select the last day of the expected month and year.";
        break;
      case 15:
        this.message = "Estimate or actual cost of total project (include taxes)\r\n\r\nA total cost of all activities associated with the overall project.";
        break;
      default:
        this.message = "Click on any field in the form to view detailed information " +
          "about what information is required and tips on how to fill " +
          "it out.\r\n" +
          "If you need more guidance, select the field and the " +
          "relevant details will be displayed to assist you.";
    }

    clearTimeout(this.timerID);
    tooltip.show();

    this.timerID = setTimeout(
      function () {
        tooltip.hide();
      }.bind(this),
      3000
    );
  }
}

const routes: Routes = [{
  path: 'invoices', component: DFAInvoiceDashboardComponent,
  children: [
    {
      path: '',
      redirectTo: 'invoices',
      pathMatch: 'full'
    },
    {
      path: 'invoices',
      loadChildren: () =>
        import(
          'src/app/sharedModules/invoice-dashboard-components/invoice/invoice.module'
        ).then((m) => m.DFADashInvoiceModule),
      data: { flow: 'dfa-invoice-dashboard', apptype: 'open' }
    }
  ]
}];

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    DirectivesModule,
    MatTableModule,
    CustomPipeModule,
    TextMaskModule,
    MatSelectModule,
    MatTooltipModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DFAInvoiceDashboardComponent],
  exports: [RouterModule]
})
class PropertyDamageModule { }

