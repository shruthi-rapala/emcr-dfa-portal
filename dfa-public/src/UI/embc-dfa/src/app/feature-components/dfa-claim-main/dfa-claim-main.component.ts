import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  AfterViewChecked,
  ChangeDetectorRef,
  ViewEncapsulation,
  ElementRef
} from '@angular/core';
import { AbstractControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentCreationService } from '../../core/services/componentCreation.service';
import * as globalConst from '../../core/services/globalConstants';
import { ComponentMetaDataModel } from '../../core/model/componentMetaData.model';
import { MatStepper } from '@angular/material/stepper';
import { Subscription, distinctUntilChanged, mapTo } from 'rxjs';
import { FormCreationService } from '../../core/services/formCreation.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { ApplicantOption, FarmOption, ProjectStageOptionSet, SmallBusinessOption } from 'src/app/core/api/models';
import { ApplicationService, AttachmentService } from 'src/app/core/api/services';
import { MatDialog } from '@angular/material/dialog';
import { DFAConfirmSubmitDialogComponent } from 'src/app/core/components/dialog-components/dfa-confirm-submit-dialog/dfa-confirm-submit-dialog.component';
import { SecondaryApplicant } from 'src/app/core/model/dfa-application-main.model';
import { AddressChangeComponent } from 'src/app/core/components/dialog-components/address-change-dialog/address-change-dialog.component';
import { DFAClaimMainMappingService } from './dfa-claim-main-mapping.service';
import RecoveryPlanComponent from '../../sharedModules/forms/dfa-project-main-forms/recovery-plan/recovery-plan.component';
import { DFAClaimMainDataService } from './dfa-claim-main-data.service';
import { DFAClaimMainService } from './dfa-claim-main.service';

@Component({
  selector: 'app-dfa-claim-main',
  templateUrl: './dfa-claim-main.component.html',
  styleUrls: ['./dfa-claim-main.component.scss']
})
export class DFAClaimMainComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  @ViewChild('dfaClaimMainStepper') dfaClaimMainStepper: MatStepper;
  @ViewChild(RecoveryPlanComponent) recPlan: RecoveryPlanComponent;
  @ViewChild('backtodash') backtodash: ElementRef;

  isEditable = true;
  steps: Array<ComponentMetaDataModel> = new Array<ComponentMetaDataModel>();
  showStep = false;
  dfaClaimMainFolderPath = 'dfa-claim-main-forms';
  path: string;
  form$: Subscription;
  form: UntypedFormGroup;
  stepToDisplay: number;
  currentFlow: string;
  type = 'dfa-claim-main';
  dfaClaimMainHeading: string;
  parentPageName = 'dfa-claim-main';
  showLoader = false;
  isSubmitted = false;
  vieworedit: string;
  editstep: string;
  ninetyDayDeadline: string;
  daysToApply: number;
  showStepper: boolean = false;
  selectedStepIndex: number;
  prevStepIndex: number;

  constructor(
    private router: Router,
    private componentService: ComponentCreationService,
    private route: ActivatedRoute,
    public formCreationService: FormCreationService,
    private cd: ChangeDetectorRef,
    private alertService: AlertService,
    private applicationService: ApplicationService,
    public dialog: MatDialog,
    private fileUploadsService: AttachmentService,
    private dfaClaimMainMapping: DFAClaimMainMappingService,
    private dfaClaimMainDataService: DFAClaimMainDataService,
    private dfaClaimMainService: DFAClaimMainService,
  ) {
    const navigation = this.router.getCurrentNavigation();
    
    if (navigation !== null) {
      if (navigation.extras.state !== undefined) {
        const state = navigation.extras.state as { stepIndex: number };
        this.stepToDisplay = state.stepIndex;
      }
    }

  }

  ngOnInit(): void {
    this.currentFlow = this.route.snapshot.data.flow ? this.route.snapshot.data.flow : 'verified-registration';
    let projectId = this.dfaClaimMainDataService.getProjectId();
    
    if (projectId) {
      this.dfaClaimMainDataService.setProjectId(projectId);
      this.getFileUploadsForProject(projectId);
    }
    this.formCreationService.clearRecoveryPlanData();
    //this.formCreationService.clearOtherContactsData();

    this.steps = this.componentService.createDFAClaimMainSteps();
    this.vieworedit = this.dfaClaimMainDataService.getViewOrEdit();
    this.editstep = this.dfaClaimMainDataService.getEditStep();
    
    //this.showStepper = true;
    this.dfaClaimMainHeading = 'Claim Details'

  }



  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  ngAfterViewInit(): void {
    //this.recPlan.setFocus();
    //debugger
    //this.projectName.nativeElement.focus();
    //this.formCreationService.recoveryPlanForm.value.markAsUntouched();

    //this.dfaProjectMainStepper.steps.forEach((step, idx) => {
    //  //if (idx == 1 && this.formCreationService.recoveryPlanForm.value.get('projectNumber').invalid) {
    //  //  step.editable = false;
    //  //}
      
    //  step.select = () => {
    //    this.selectedStepIndex = idx;
        
    //    switch (idx) {
    //      case 1:
    //        this.setFormData('recovery-plan')
    //        break;
    //    }
    //  };
    //});
  }

  navigateToStep(stepIndex: number) {
    this.dfaClaimMainStepper.selectedIndex = stepIndex;
  }

  /**
   * Loads form for every step based on index
   *
   * @param index step index
   */
  currentStep(index: number, stepper: MatStepper): void {
    this.prevStepIndex = index;
    this.loadStepForm(index);
    this.cd.detectChanges();
  }

  /**
   * Triggered on the step change animation event
   *
   * @param event animation event
   * @param stepper stepper instance
   */
  stepChanged(event: any, stepper: MatStepper): void {
    stepper.selected.interacted = false;
    
    if (event.previouslySelectedIndex == 0) {
      this.setFormData('recovery-plan');
    }

    this.dfaClaimMainDataService.setCurrentStepSelected(event.selectedIndex);
    /*stepper.steps.toArray()[1].editable = false;*/
    //if ((this.form.get('projectNumber').invalid == true || this.form.get('projectName').invalid == true)) {
    //  stepper.steps.toArray()[1].editable = false;
    //  this.cd.detectChanges();
    //}
    //else {

    //}
  }

  /**
   * Custom back stepper function
   *
   * @param stepper stepper instance
   * @param lastStep stepIndex
   */
  goBack(stepper: MatStepper, lastStep): void {
    if (lastStep === 0) {
      stepper.previous();
    } else if (lastStep === -1) {
      this.showStep = !this.showStep;
    } else if (lastStep === -2) {
      this.returnToDashboard();
    }
  }

  /**
   * Custom next stepper function
   *
   * @param stepper stepper instance
   * @param isLast stepperIndex
   * @param component current component name
   */
  goForward(stepper: MatStepper, isLast: boolean, component: string): void {
    
    if (isLast && component === 'property-damage') {
      this.setFormData(component);
      this.dfaClaimMainStepper.selected.completed = true;
      //this.submitFile();
      this.form$.unsubscribe();
      stepper.next();
      this.form.markAllAsTouched();
    } else if (component === 'recovery-plan') {
      if (this.form.get('projectNumber').invalid == true && this.form.get('projectName').invalid == true) {

        this.form.addValidators([ValidateProjectMandatoryFields.isRequired(this.form.get('projectNumber'))]);
        this.form.get('projectNumber').markAsTouched();
        this.form.get('projectNumber').updateValueAndValidity();

        //this.form.addValidators([ValidateProjectMandatoryFields.isRequired(this.form.get('projectName'))]);
        //this.form.get('projectName').markAsTouched();
        //this.form.get('projectName').updateValueAndValidity();
        document.getElementById("backtodash").scrollIntoView({ behavior: 'smooth', block: 'center' });

      } else {
        this.form.get('projectNumber').setErrors(null);
        this.form.get('projectNumber').markAsTouched();
        this.form.get('projectNumber').updateValueAndValidity();
        this.setFormData(component);
        let project = this.dfaClaimMainDataService.createDFAClaimMainDTO();
        this.dfaClaimMainMapping.mapDFAClaimMain(project);
        //this.form$.unsubscribe();
        //stepper.next();
        //this.form.markAllAsTouched();
        //this.dfaProjectMainService.upsertProject(project).subscribe(x => {

        //  // determine if step is complete
        //  //switch (component) {
        //  //  case 'property-damage':
        //  //    if (this.form.valid) stepper.selected.completed = true;
        //  //    else stepper.selected.completed = false;
        //  //    break;
        //  //  case 'review':
        //  //    stepper.selected.completed = true;
        //  //    break;
        //  //  default:
        //  //    break;
        //  //}
        //  this.form$.unsubscribe();
        //  stepper.next();
        //  this.form.markAllAsTouched();
        //},
        //  error => {
        //    console.error(error);
        //    document.location.href = 'https://dfa.gov.bc.ca/error.html';
        //  });
      }

      this.form$.unsubscribe();
      stepper.next();
      this.form.markAllAsTouched();
    }
    else {
      this.form$.unsubscribe();
      stepper.next();
      this.form.markAllAsTouched();
    }
  }

  saveAsDraft(): void {
    this.setFormData(this.steps[this.dfaClaimMainStepper.selectedIndex]?.component.toString());
    this.dfaClaimMainDataService.recoveryClaim.claimStatus = ProjectStageOptionSet.DRAFT;
    let project = this.dfaClaimMainDataService.createDFAClaimMainDTO();

    this.dfaClaimMainService.upsertClaim(project).subscribe(x => {
        this.BackToDashboard();
    },
      error => {
        console.error(error);
        document.location.href = 'https://dfa.gov.bc.ca/error.html';
      });
  }

  requiredDocumentsSupplied(): boolean {
    let isPreEventUploaded = this.formCreationService.fileUploadsForm.getValue().getRawValue()?.fileUploads.filter(x => x.requiredDocumentType === "PreEvent" && x.deleteFlag == false).length >= 1 ? true : false;
    let isPostEventUploaded = this.formCreationService.fileUploadsForm.getValue().getRawValue()?.fileUploads.filter(x => x.requiredDocumentType === "PostEvent" && x.deleteFlag == false).length >= 1 ? true : false;
   
    if (isPreEventUploaded == true
      && isPostEventUploaded) return true;
    else return false;
  }

  /**
   * Sets the form data to the DTO services
   *
   * @param component Name of the component
   */
  setFormData(component: string): void {
    
    switch (component) {
      case 'recovery-plan':
        //this.dfaClaimMainDataService.recoveryPlan.projectName = this.form.get('projectName').value;
        //this.dfaClaimMainDataService.recoveryPlan.projectNumber = this.form.get('projectNumber').value;
        //this.dfaClaimMainDataService.recoveryPlan.projectStatus = this.form.get('projectStatus').value;
        //this.dfaClaimMainDataService.recoveryPlan.isdamagedDateSameAsApplication = this.form.get('isdamagedDateSameAsApplication').value == 'true' ? true : (this.form.get('isdamagedDateSameAsApplication').value == 'false' ? false : null);
        //this.dfaClaimMainDataService.recoveryPlan.sitelocationdamageFromDate = this.form.get('sitelocationdamageFromDate').value;
        //this.dfaClaimMainDataService.recoveryPlan.sitelocationdamageToDate = this.form.get('sitelocationdamageToDate').value;
        //this.dfaClaimMainDataService.recoveryPlan.differentDamageDatesReason = this.form.get('differentDamageDatesReason').value;
        //this.dfaClaimMainDataService.recoveryPlan.siteLocation = this.form.get('siteLocation').value;
        //this.dfaClaimMainDataService.recoveryPlan.infraDamageDetails = this.form.get('infraDamageDetails').value;
        //this.dfaClaimMainDataService.recoveryPlan.causeofDamageDetails = this.form.get('causeofDamageDetails').value;
        //this.dfaClaimMainDataService.recoveryPlan.describeDamageDetails = this.form.get('describeDamageDetails').value;
        //this.dfaClaimMainDataService.recoveryPlan.describeDamagedInfrastructure = this.form.get('describeDamagedInfrastructure').value;
        //this.dfaClaimMainDataService.recoveryPlan.repairWorkDetails = this.form.get('repairWorkDetails').value;
        //this.dfaClaimMainDataService.recoveryPlan.repairDamagedInfrastructure = this.form.get('repairDamagedInfrastructure').value;
        //this.dfaClaimMainDataService.recoveryPlan.estimatedCompletionDate = this.form.get('estimatedCompletionDate').value;
        //this.dfaClaimMainDataService.recoveryPlan.estimateCostIncludingTax = this.form.get('estimateCostIncludingTax').value;

        break;
      default:
        break;
    }
  }

  /**
   * Loads appropriate forms based on the current step
   *
   * @param index Step index
   */
  loadStepForm(index: number): void {
    
    switch (index) {
      case 0:
        this.form$ = this.formCreationService
          .getRecoveryPlanForm()
          .subscribe((recoveryPlanForm) => {
            this.form = recoveryPlanForm;
          });

        break;
      case 1:
        this.form$ = this.formCreationService
          .getSupportingDocumentsForm()
          .subscribe((supportingDocuments) => {
            this.form = supportingDocuments;
          });
        break;

    }
  }

  saveAndBackToDashboard() {
    this.returnToDashboard();
  }

  returnToDashboard() {
    //this.dfaProjectMainDataService.setApplicationId(null);
    this.router.navigate(['/verified-registration/dashboard']);
  }

  submitFile(): void {
    var contentDialog = globalConst.confirmSubmitApplicationBody;
    var height = '350px';
    if (this.dfaClaimMainDataService.getApplicationId()) {
      contentDialog = globalConst.confirmUpdateApplicationBody;
      height = '250px';
    }

    this.dialog
      .open(DFAConfirmSubmitDialogComponent, {
        data: {
          content: contentDialog
        },
        height: height,
        width: '700px',
        disableClose: true
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'confirm') {
          //let application = this.dfaApplicationMainDataService.createDFAApplicationMainDTO();
          //this.dfaApplicationMainMapping.mapDFAApplicationMain(application);
          this.setFormData(this.steps[this.dfaClaimMainStepper.selectedIndex]?.component.toString());
          this.dfaClaimMainDataService.recoveryClaim.claimStatus = ProjectStageOptionSet.SUBMIT;

          let project = this.dfaClaimMainDataService.createDFAClaimMainDTO();

          this.dfaClaimMainService.upsertClaim(project).subscribe(x => {
            this.BackToDashboard();
          },
            error => {
              console.error(error);
              document.location.href = 'https://dfa.gov.bc.ca/error.html';
            });
          
          //this.dfaProjectMainService.upsertApplication(application).subscribe(x => {
          //  this.isSubmitted = !this.isSubmitted;
          //  this.alertService.clearAlert();
          //  this.dfaProjectMainDataService.isSubmitted = true;
          //  this.dfaProjectMainDataService.setViewOrEdit('view');
          //  this.vieworedit = 'view';
          //  this.returnToDashboard();
          //},
          //error => {
          //  console.error(error);
          //  //document.location.href = 'https://dfa.gov.bc.ca/error.html';
          //});
        }
      });
  }

  public getFileUploadsForProject(projectId: string) {

    this.fileUploadsService.attachmentGetAttachments({ projectId: projectId }).subscribe({
      next: (attachments) => {
        // initialize list of file uploads
        this.formCreationService.fileUploadsForm.value.get('fileUploads').setValue(attachments);

      },
      error: (error) => {
        console.error(error);
        document.location.href = 'https://dfa.gov.bc.ca/error.html';
      }
    });
  }

  BackToDashboard(): void {
    var projId = this.dfaClaimMainDataService.getProjectId();
    this.router.navigate(['/dfa-project/' + projId + '/claims']);
  }

  notifyAddressChange(): void {
    this.dialog
      .open(AddressChangeComponent, {
        data: {
          content: globalConst.notifyBCSCAddressChangeBody
        },
        height: '300px',
        width: '700px',
        disableClose: true
      })
      .afterClosed()
      .subscribe((result) => {
        //if (result === 'confirm') {

        //}
      });
  }
}

export class ValidateProjectMandatoryFields {
  static isRequired(control: AbstractControl): ValidatorFn {

    return (controls: AbstractControl) => {
      //const control = controls.get(controlName);

      if (control.invalid == true) { 
        control.setErrors({ isRequired: true });
        return { isRequired: true };
      }
      else {
        return null;
      }
    };
  }
}
