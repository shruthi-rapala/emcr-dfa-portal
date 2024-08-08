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
import {MatNativeDateModule} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { FormCreationService } from 'src/app/core/services/formCreation.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DirectivesModule } from '../../../../core/directives/directives.module';
import { CustomValidationService } from 'src/app/core/services/customValidation.service';
import { distinctUntilChanged, first } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { DFAApplicationMainDataService } from 'src/app/feature-components/dfa-application-main/dfa-application-main-data.service';
import { ApplicantOption, ApplicantSubtypeSubCategories } from 'src/app/core/api/models';
import { MatTableModule } from '@angular/material/table';
import { CustomPipeModule } from 'src/app/core/pipe/customPipe.module';
import { DFADeleteConfirmDialogComponent } from '../../../../core/components/dialog-components/dfa-confirm-delete-dialog/dfa-confirm-delete.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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
import { DFAClaimMainDataService } from '../../../../feature-components/dfa-claim-main/dfa-claim-main-data.service';
import { Invoice } from '../../../../core/model/dfa-invoice.model';
import { DFAClaimMainMappingService } from '../../../../feature-components/dfa-claim-main/dfa-claim-main-mapping.service';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 0,
  hideDelay: 0,
  touchendHideDelay: 0,
  disableTooltipInteractivity: true,
  touchGestures: 'on'
};

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  providers: [{ provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }]
})
export default class InvoiceComponent implements OnInit, OnDestroy {
  //@ViewChild('projectName') projectName: ElementRef;
  message : string = '';
  invoiceForm: UntypedFormGroup;
  formBuilder: UntypedFormBuilder;
  invoiceForm$: Subscription;
  formCreationService: FormCreationService;
  remainingLength: number = 200;
  todayDate = new Date().toISOString();
  vieworedit: string = "";
  addeditInvoiceText: string = "Add";
  isReadOnly: boolean = false;
  showDates: boolean = false;
  hideHelp: boolean = true;
  eligibleGST: boolean = false;
  timerID;
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
    //@Inject('formBuilder') formBuilder: UntypedFormBuilder,
    //@Inject('formCreationService') formCreationService: FormCreationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<InvoiceComponent>,
    private formBuilderObj: UntypedFormBuilder,
    private formCreationServiceObj: FormCreationService,
    public customValidator: CustomValidationService,
    public dfaApplicationMainDataService: DFAApplicationMainDataService,
    public dfaProjectMainDataService: DFAProjectMainDataService,
    private dfaClaimMainDataService: DFAClaimMainDataService,
    private projectService: ProjectService,
    private dfaApplicationMainMapping: DFAApplicationMainMappingService,
    private dfaProjectMainMapping: DFAProjectMainMappingService,
    private dfaClaimMainMapping: DFAClaimMainMappingService,
    private otherContactsService: OtherContactService,
    public dialog: MatDialog
  ) {
    this.formBuilder = formBuilderObj;
    this.formCreationService = formCreationServiceObj;
    //this.isReadOnly = (dfaProjectMainDataService.getViewOrEdit() === 'view'
    //  || dfaProjectMainDataService.getViewOrEdit() === 'edit'
    //  || dfaProjectMainDataService.getViewOrEdit() === 'viewOnly');
    //this.setViewOrEditControls();

    //this.dfaProjectMainDataService.changeViewOrEdit.subscribe((vieworedit) => {
    //  this.isReadOnly = (vieworedit === 'view'
    //  || vieworedit === 'edit'
    //    || vieworedit === 'viewOnly');
    //  this.setViewOrEditControls();
    //})

    //this.vieworedit = dfaProjectMainDataService.getViewOrEdit();
  }

  numericOnly(event): boolean {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }

  CalculateInvoice(event): void {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);

    var netInvoice = Number(this.invoiceForm.controls.netInvoiceBeingClaimed.value);
    var PST = Number(this.invoiceForm.controls.PST.value);
    var GrossGST = Number(this.invoiceForm.controls.grossGST.value);
    var EligibleGST = Number(this.invoiceForm.controls.eligibleGST.value);

    this.invoiceForm.controls.totalBeingClaimed.setValue(netInvoice + PST + EligibleGST);
    this.invoiceForm.controls.actualInvoiceTotal.setValue(netInvoice + PST + GrossGST);
  }

  setFocus() {
    //this.projectName.nativeElement.focus();
  }

  setViewOrEditControls() {
    if (!this.invoiceForm) return;
    if (this.isReadOnly) {
      this.hideHelp = true;
      this.invoiceForm.controls.estimatedCompletionDate.disable();
    } else {
      this.invoiceForm.controls.estimatedCompletionDate.enable();
    }
  }

  ngOnInit(): void {
    var passData = this.data;
    var objInvData = passData.content;
    this.invoiceForm$ = this.formCreationService
      .getInvoiceForm()
      .subscribe((invoice) => {
        //if (objInvData != null) {
        //  invoice.setValue({
        //    objInvData
        //  });
        //}
        this.invoiceForm = invoice;
        //this.setViewOrEditControls();
        //this.propertyDamageForm.addValidators([this.validateFormCauseOfDamage]);
        //if (this.propertyDamageForm.get('otherDamage').value === 'true') {
        //  this.propertyDamageForm.get('otherDamageText').setValidators([Validators.required, Validators.maxLength(100)]);
        //} else {
        //  this.propertyDamageForm.get('otherDamageText').setValidators([Validators.maxLength(100)]);
        //}
        //this.propertyDamageForm.get('otherDamageText').updateValueAndValidity();
        //this.propertyDamageForm.updateValueAndValidity();
      });

    if (objInvData != null) {
      this.dfaClaimMainMapping.mapDFAInvoiceMain({ invoice: objInvData });
      //this.formCreationService.setInvoiceForm(objInvData);
      this.addeditInvoiceText = "Update";
    }

    let projectId = this.dfaProjectMainDataService.getProjectId();

    this.eligibleGST = this.dfaClaimMainDataService.getEligibleGST();

    if (this.eligibleGST) {
      this.invoiceForm.controls.eligibleGST.enable();
    } else {
      this.invoiceForm.controls.eligibleGST.disable();
    }

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
      this.invoiceForm.disable();
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
  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

  calcRemainingChars() {
    this.remainingLength = 200 - this.invoiceForm.get('subtypeOtherDetails').value?.length;
  }

  selectDamageDates(choice: any) {
    if (choice.value == 'true') {
      this.showDates = false;
    }
    else if (choice.value == 'false') {
      this.showDates = true;
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

  cancel() {
    this.dialogRef.close('cancel');
    this.formCreationService.clearInvoiceData();
  }

  AddInvoice() {
    var invObj = this.invoiceForm.getRawValue();
    this.dialogRef.close({ event: 'confirm', invData: invObj });
    this.formCreationService.clearInvoiceData();
  }

  /**
   * Returns the control of the form
   */
  get propertyDamageFormControl(): { [key: string]: AbstractControl } {
    return this.invoiceForm.controls;
  }

  ngOnDestroy(): void {
    this.invoiceForm$.unsubscribe();
  }

  setHelpText(inputSelection, tooltip: MatTooltip): void {
    switch (inputSelection) {
      case 1:
        this.message = "Invoice date\r\n\r\nAn invoice may include a bill of sale, receipt, or other documentation";
        break;
      case 2:
        this.message = "Please state why you are claiming only a portion of the total invoice.\r\n\r\nIf the invoice is for more than one project, include the project number and name of all the other projects this invoice is being shared with";
        break;
      case 3:
        this.message = "Net invoiced being claimed\r\n\r\nYou may claim a portion of the invoice amount.";
        break;
      case 4:
        this.message = "PST\r\n\r\nIf claiming a portion of the invoice amount, you must calculate and provide the proportion of PST.";
        break;
      case 5:
        this.message = "Gross GST\r\n\r\nIf claiming a portion of the invoice amount, you must calculate and provide the proportion of Gross GST.";
        break;
      case 6:
        this.message = "Eligible GST\r\n\r\nGST is reimbursed at the portion not recoverable by the GST rebate, as per the Public Service Body Rebate (GST) Regulations: municipalities 0%, public hospitals 17%, schools 32% and universities/public colleges 33%."
          + "\r\n\r\nIf claiming a portion of the invoice amount, you must calculate and provide the proportion of GST.";
        break;
      case 7:
        this.message = "Total being claimed\r\n\r\nTotal being claimed is the total of (Net invoiced costs) + (PST) + (Eligible GST)";
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
    MatTooltipModule
  ],
  declarations: [InvoiceComponent]
})
class InvoiceModule {}

