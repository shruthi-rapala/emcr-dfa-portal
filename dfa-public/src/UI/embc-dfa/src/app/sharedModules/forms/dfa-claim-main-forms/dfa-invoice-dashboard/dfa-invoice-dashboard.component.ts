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
import { ApplicantOption, ApplicantSubtypeSubCategories, CurrentInvoice } from 'src/app/core/api/models';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomPipeModule } from 'src/app/core/pipe/customPipe.module';
import { DFADeleteConfirmDialogComponent } from '../../../../core/components/dialog-components/dfa-confirm-delete-dialog/dfa-confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
// 2024-07-31 EMCRI-216 waynezen; upgrade to Angular 18 - TextMaskModule not compatible
//import { TextMaskModule } from 'angular2-text-mask';
import { NgxMaskDirective, NgxMaskPipe, NgxMaskService, provideNgxMask } from 'ngx-mask';
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
import InvoiceComponent from '../invoice/invoice.component';
import { DFADeleteConfirmInvoiceDialogComponent } from '../../../../core/components/dialog-components/dfa-confirm-delete-invoice-dialog/dfa-confirm-delete-invoice.component';
import { Invoice } from '../../../../core/model/dfa-invoice.model';

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
  lstInvoices: CurrentInvoice[] = [];
  lstFilteredInvoices: CurrentInvoice[] = [];
  tabs: DashTabModel[];
  currentProjectsCount = 0;
  closedProjectsCount = 0;
  message: string = '';
  recoveryClaimForm: UntypedFormGroup;
  formBuilder: UntypedFormBuilder;
  recoveryClaimForm$: Subscription;
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
  documentSummaryColumnsToDisplay = ['invoiceNumber', 'vendorName', 'invoiceDate', 'totalBeingClaimed', 'icons']
  documentSummaryDataSource = new MatTableDataSource<Invoice>();
  documentSummaryDataSourceFiltered = new MatTableDataSource<Invoice>();
  noInvoiceText = 'To begin adding invoices, click the "+ Add Invoice" button.';
  
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
    //this.setViewOrEditControls();

    this.dfaProjectMainDataService.changeViewOrEdit.subscribe((vieworedit) => {
      this.isReadOnly = (vieworedit === 'view'
        || vieworedit === 'edit'
        || vieworedit === 'viewOnly');
      //this.setViewOrEditControls();
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

  ngOnInit(): void {
    this.recoveryClaimForm$ = this.formCreationService
      .getRecoveryClaimForm()
      .subscribe((recoveryClaim) => {
        this.recoveryClaimForm = recoveryClaim;
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
      //{ invoiceNumber: 'IN.001', vendorName: 'ABC Company', invoiceDate: '03-JUL-2024', totalBeingClaimed: '20000' },
      //{ invoiceNumber: 'IN.002', vendorName: 'Brick & Co.', invoiceDate: '04-JUL-2013', totalBeingClaimed: '18000' },
      //{ invoiceNumber: 'IN.003', vendorName: 'Home Depot', invoiceDate: '15-JUL-2013', totalBeingClaimed: '37000' }

    ];

    //this.recoveryClaimForm.controls.totalInvoicesBeingClaimed.disable();
    //this.recoveryClaimForm.controls.claimPST.disable();
    //this.recoveryClaimForm.controls.claimGrossGST.disable();
    //this.recoveryClaimForm.controls.totalActualClaim.disable();

    this.SummaryClaimCalc();

    this.documentSummaryDataSourceFiltered.data = this.documentSummaryDataSource.data;
    this.formCreationService.recoveryClaimForm.value.get('invoices').setValue(this.documentSummaryDataSource.data);
    this.formCreationService.recoveryClaimForm.value.updateValueAndValidity();

    this.invoicesCount = this.documentSummaryDataSource.data.length;

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
      this.recoveryClaimForm.disable();
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

  SummaryClaimCalc() {
    var sumOfNetInvoiceBeingClaimed = this.documentSummaryDataSource.data.reduce((acc, val) => {
      return acc + Number(val.netInvoiceBeingClaimed);
    }, 0);

    var sumOfClaimPST = this.documentSummaryDataSource.data.reduce((acc, val) => {
      return acc + Number(val.PST);
    }, 0);

    var sumOfClaimGrossGST = this.documentSummaryDataSource.data.reduce((acc, val) => {
      return acc + Number(val.grossGST);
    }, 0);

    var sumOfTotalActualClaim = this.documentSummaryDataSource.data.reduce((acc, val) => {
      return acc + Number(val.actualInvoiceTotal);
    }, 0);

    this.formCreationService.recoveryClaimForm.value.get('totalInvoicesBeingClaimed').setValue(sumOfNetInvoiceBeingClaimed);
    this.formCreationService.recoveryClaimForm.value.get('claimPST').setValue(sumOfClaimPST);
    this.formCreationService.recoveryClaimForm.value.get('claimGrossGST').setValue(sumOfClaimGrossGST);
    this.formCreationService.recoveryClaimForm.value.get('totalActualClaim').setValue(sumOfTotalActualClaim);
    
    this.formCreationService.recoveryClaimForm.value.updateValueAndValidity();
  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

  calcRemainingChars() {
    this.remainingLength = 200 - this.recoveryClaimForm.get('subtypeOtherDetails').value?.length;
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
    
    this.lstInvoices = this.documentSummaryDataSource.data;
    var lstInvoicesFilterting = this.lstInvoices;

    if (searchText != null) {
      this.searchTextInput = searchText;
    }
    
    if (this.filterbydaysSelected && this.filterbydaysSelected != -1) {
      var backdate = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * this.filterbydaysSelected));
      lstInvoicesFilterting = lstInvoicesFilterting.filter(m => (backdate <= new Date(m.invoiceDate)));
    }

    if (this.sortfieldSelected != '' && this.sortfieldSelected != null) {
      if (this.sortfieldSelected == 'vendorname') {
        lstInvoicesFilterting = lstInvoicesFilterting.sort((a, b) => (a.vendorName > b.vendorName) ? 1 : ((b.vendorName > a.vendorName) ? -1 : 0))
      } else if (this.sortfieldSelected == 'invoicenumber') {
        lstInvoicesFilterting = lstInvoicesFilterting.sort((a, b) => (a.invoiceNumber > b.invoiceNumber) ? 1 : ((b.invoiceNumber > a.invoiceNumber) ? -1 : 0))
      } else if (this.sortfieldSelected == 'totaleligible') {
        lstInvoicesFilterting = lstInvoicesFilterting.sort((a, b) => (a.totalBeingClaimed > b.totalBeingClaimed) ? 1 : ((b.totalBeingClaimed > a.totalBeingClaimed) ? -1 : 0))
      } else if (this.sortfieldSelected == 'claimpaiddate') {
        lstInvoicesFilterting = lstInvoicesFilterting.sort((a, b) => (new Date(a.invoiceDate) > new Date(b.invoiceDate)) ? 1 : (new Date(b.invoiceDate) > new Date(a.invoiceDate) ? -1 : 0))
      }
    }

    if (this.searchTextInput != null) {
      lstInvoicesFilterting = lstInvoicesFilterting.filter(m => m.vendorName.toLowerCase().indexOf(this.searchTextInput.toLowerCase()) > -1
       );
    }

    //this.lstFilteredInvoices = lstInvoicesFilterting;
    this.documentSummaryDataSourceFiltered.data = lstInvoicesFilterting;

    if (this.documentSummaryDataSourceFiltered.data.length <= 0) {
      this.noInvoiceText = 'No invoices found matching the filter condition.';
    }
    else {
      this.noInvoiceText = 'To begin adding invoices, click the "+ Add Invoice" button.';
    }

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
    return this.recoveryClaimForm.controls;
  }

  ngOnDestroy(): void {
    this.recoveryClaimForm$.unsubscribe();
  }

  editInvoiceRow(element, index): void {
    this.openInvoiceCreatePopup(element, index);
  }

  confirmDeleteInvoiceRow(index: number): void {
    this.dialog
      .open(DFADeleteConfirmInvoiceDialogComponent, {
        data: {
          content: "Are you certain you wish to proceed with deleting the invoice?"
        },
        width: '500px',
        disableClose: true
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'confirm') {
          //this.deleteOtherContactRow(index);
          this.documentSummaryDataSource.data.splice(index, 1);
          let cloned = this.documentSummaryDataSource.data.slice()
          this.documentSummaryDataSource.data = cloned;
          this.documentSummaryDataSourceFiltered.data = this.documentSummaryDataSource.data;
          this.invoicesCount = this.documentSummaryDataSource.data.length;
          this.SummaryClaimCalc();
          this.formCreationService.recoveryClaimForm.value.get('invoices').setValue(this.documentSummaryDataSource.data);
          this.formCreationService.recoveryClaimForm.value.updateValueAndValidity();
        }
      });
  }

  openInvoiceCreatePopup(objInvoice, index): void {
    this.dialog
      .open(InvoiceComponent, {
        data: {
          content: objInvoice
        },
        height: '750px',
        width: '1000px',
        disableClose: true
      })
      .afterClosed()
      .subscribe((result) => {
        //debugger;
        if (result.event === 'confirm') {
          if (result.invData) {
            var objInv = result.invData;
            //this.documentSummaryDataSource.data.push(
            //  { invoiceNumber: objInv.invoiceNumber, vendorName: objInv.vendorName, invoiceDate: objInv.invoiceDate, totalBeingClaimed: objInv.totalBeingClaimed }
            //);
            if (index != null) {
              this.documentSummaryDataSource.data.splice(index, 1, objInv);
            }
            else {
              this.documentSummaryDataSource.data.push(objInv);
            }

            let cloned = this.documentSummaryDataSource.data.slice()
            this.documentSummaryDataSource.data = cloned;
            this.documentSummaryDataSourceFiltered.data = this.documentSummaryDataSource.data;
            this.invoicesCount = this.documentSummaryDataSource.data.length;
            this.SummaryClaimCalc();
            this.formCreationService.recoveryClaimForm.value.get('invoices').setValue(this.documentSummaryDataSource.data);
            this.formCreationService.recoveryClaimForm.value.updateValueAndValidity();
          }
        }
        //(this.formCreationService.invoiceForm$ | async)?.value
        
        //}
      });
  }

  setHelpText(inputSelection, tooltip: MatTooltip): void {
    switch (inputSelection) {
      case 1:
        this.message = "Project number\r\n\r\nThe project number is the unique project identifier that your organization assigned to the project's site location where damage has occurred.\r\nThe project identifier may be a number, letter, or any combination of letters and numbers.\r\nThis project number is specific to the site and is often referred to when discussing the location.";
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
    // 2024-07-31 EMCRI-216 waynezen; upgrade to Angular 18 - new text mask provider
    NgxMaskDirective, NgxMaskPipe,
    MatSelectModule,
    MatTooltipModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DFAInvoiceDashboardComponent],
  exports: [RouterModule]
})
class PropertyDamageModule { }

