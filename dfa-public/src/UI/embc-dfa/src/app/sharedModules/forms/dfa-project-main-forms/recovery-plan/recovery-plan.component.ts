import { Component, OnInit, NgModule, Inject, OnDestroy } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  AbstractControl,
  FormsModule,
  Validators,
  FormGroup
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
import { distinctUntilChanged } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { DFAApplicationMainDataService } from 'src/app/feature-components/dfa-application-main/dfa-application-main-data.service';
import { ApplicantOption, ApplicantSubtypeSubCategories } from 'src/app/core/api/models';
import { MatTableModule } from '@angular/material/table';
import { CustomPipeModule } from 'src/app/core/pipe/customPipe.module';
import { DFADeleteConfirmDialogComponent } from '../../../../core/components/dialog-components/dfa-confirm-delete-dialog/dfa-confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { TextMaskModule } from 'angular2-text-mask';
import { ApplicationService, OtherContactService } from 'src/app/core/api/services';
import { DFAApplicationMainMappingService } from 'src/app/feature-components/dfa-application-main/dfa-application-main-mapping.service';
import { MatSelectModule } from '@angular/material/select';
import { DFAProjectMainDataService } from '../../../../feature-components/dfa-project-main/dfa-project-main-data.service';


@Component({
  selector: 'app-recovery-plan',
  templateUrl: './recovery-plan.component.html',
  styleUrls: ['./recovery-plan.component.scss']
})
export default class RecoveryPlanComponent implements OnInit, OnDestroy {
  recoveryPlanForm: UntypedFormGroup;
  formBuilder: UntypedFormBuilder;
  recoveryPlanForm$: Subscription;
  formCreationService: FormCreationService;
  remainingLength: number = 200;
  todayDate = new Date().toISOString();
  vieworedit: string = "";
  isReadOnly: boolean = false;
  showDates: boolean = true;
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
    private dfaApplicationMainMapping: DFAApplicationMainMappingService,
    private otherContactsService: OtherContactService,
    public dialog: MatDialog
  ) {
    this.formBuilder = formBuilder;
    this.formCreationService = formCreationService;
    this.isReadOnly = (dfaApplicationMainDataService.getViewOrEdit() === 'view'
    || dfaApplicationMainDataService.getViewOrEdit() === 'edit'
    || dfaApplicationMainDataService.getViewOrEdit() === 'viewOnly');
    this.setViewOrEditControls();

    this.dfaApplicationMainDataService.changeViewOrEdit.subscribe((vieworedit) => {
      this.isReadOnly = (vieworedit === 'view'
      || vieworedit === 'edit'
        || vieworedit === 'viewOnly');
      this.setViewOrEditControls();
    })

    this.vieworedit = dfaApplicationMainDataService.getViewOrEdit();
  }

  setViewOrEditControls() {
    //if (!this.propertyDamageForm) return;
    //if (this.isReadOnly) {
    //  this.propertyDamageForm.controls.floodDamage.disable();
    //  this.propertyDamageForm.controls.landslideDamage.disable();
    //  this.propertyDamageForm.controls.stormDamage.disable();
    //  this.propertyDamageForm.controls.otherDamage.disable();
    //  this.propertyDamageForm.controls.wildfireDamage.disable();
    //  this.propertyDamageForm.controls.subtypeOtherDetails.disable();
    //  this.propertyDamageForm.controls.estimatedPercent.disable();
    //  this.propertyDamageForm.controls.subtypeDFAComment.disable();
    //} else {
    //  this.propertyDamageForm.controls.floodDamage.enable();
    //  this.propertyDamageForm.controls.landslideDamage.enable();
    //  this.propertyDamageForm.controls.stormDamage.enable();
    //  this.propertyDamageForm.controls.wildfireDamage.enable();
    //  this.propertyDamageForm.controls.otherDamage.enable();
    //  this.propertyDamageForm.controls.subtypeOtherDetails.enable();
    //  this.propertyDamageForm.controls.estimatedPercent.enable();
    //  this.propertyDamageForm.controls.subtypeDFAComment.enable();
    //}
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

    //this.getPropertyDamageForApplication(this.dfaApplicationMainDataService.getApplicationId());

    if (this.dfaApplicationMainDataService.getViewOrEdit() == 'viewOnly') {
      this.recoveryPlanForm.disable();
    }

    //this.otherContactsForm.get('onlyOtherContact').setValue(this.onlyOtherContact);
  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

  calcRemainingChars() {
    this.remainingLength = 200 - this.recoveryPlanForm.get('subtypeOtherDetails').value?.length;
  }

  getRecoveryPlan(projectId: string) {
    if (projectId) {
      //this.applicationService.applicationGetApplicationMain({ applicationId: applicationId }).subscribe({
      //  next: (dfaApplicationMain) => {
      //    //console.log('dfaApplicationMain: ' + JSON.stringify(dfaApplicationMain))
      //    //if (dfaApplicationMain.notifyUser == true) {
      //    //  //this.notifyAddressChange();
      //    //}
      //    //debugger
      //    this.dfaApplicationMainMapping.mapDFAApplicationMain(dfaApplicationMain);
          
      //    var objSelected = this.ApplicantSubCategories.filter(m => m.subType == dfaApplicationMain.propertyDamage.applicantSubtype);
      //    if (objSelected && objSelected.length > 0) {
      //      this.onSelectApplicantSubType(objSelected[0]);
      //    }
          
      //  },
      //  error: (error) => {
      //    //console.error(error);
      //    //document.location.href = 'https://dfa.gov.bc.ca/error.html';
      //  }
      //});
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
    TextMaskModule,
    MatSelectModule
  ],
  declarations: [RecoveryPlanComponent]
})
class PropertyDamageModule {}

