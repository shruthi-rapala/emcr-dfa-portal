import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  AfterViewChecked,
  ChangeDetectorRef
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentCreationService } from '../../core/services/componentCreation.service';
import { ComponentMetaDataModel } from '../../core/model/componentMetaData.model';
import { MatStepper } from '@angular/material/stepper';
import { Subscription } from 'rxjs';
import { FormCreationService } from '../../core/services/formCreation.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { DFAApplicationMainDataService } from './dfa-application-main-data.service';
import { DFAApplicationMainService } from './dfa-application-main.service';
import { ApplicantOption } from 'src/app/core/api/models';
import { ApplicationService, AttachmentService } from 'src/app/core/api/services';

@Component({
  selector: 'app-dfa-application-main',
  templateUrl: './dfa-application-main.component.html',
  styleUrls: ['./dfa-application-main.component.scss']
})
export class DFAApplicationMainComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  @ViewChild('dfaApplicationMainStepper') dfaApplicationMainStepper: MatStepper;
  isEditable = true;
  steps: Array<ComponentMetaDataModel> = new Array<ComponentMetaDataModel>();
  showStep = false;
  dfaApplicationMainFolderPath = 'dfa-application-main-forms';
  path: string;
  form$: Subscription;
  form: UntypedFormGroup;
  stepToDisplay: number;
  currentFlow: string;
  type = 'dfa-application-main';
  dfaApplicationMainHeading: string;
  parentPageName = 'dfa-application-main';
  showLoader = false;
  isSubmitted = false;
  ApplicantOptions = ApplicantOption;
  isApplicantSigned: boolean = false;
  isSecondaryApplicantSigned: boolean = false;
  isSecondaryApplicant: boolean = false;
  isSignaturesValid: boolean = false;
  appTypeInsuranceForm: UntypedFormGroup;
  appTypeInsuranceForm$: Subscription;
  vieworedit: string;
  editstep: string;
  isInsuranceTemplateUploaded = false;
  isTenancyProofUploaded = false;
  isIdentificationUploaded = false;
  isResidentialTenant: boolean = false;
  AppOptions = ApplicantOption;

  constructor(
    private router: Router,
    private componentService: ComponentCreationService,
    private route: ActivatedRoute,
    private formCreationService: FormCreationService,
    private cd: ChangeDetectorRef,
    private alertService: AlertService,
    public dfaApplicationMainDataService: DFAApplicationMainDataService,
    private dfaApplicationMainService: DFAApplicationMainService,
    private applicationService: ApplicationService,
    private fileUploadsService: AttachmentService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation !== null) {
      if (navigation.extras.state !== undefined) {
        const state = navigation.extras.state as { stepIndex: number };
        this.stepToDisplay = state.stepIndex;
      }
    }

    this.dfaApplicationMainDataService.getDfaApplicationStart().subscribe(application => {
      if (application) {
        this.isResidentialTenant = (application.appTypeInsurance.applicantOption == Object.keys(this.AppOptions)[Object.values(this.AppOptions).indexOf(this.AppOptions.ResidentialTenant)]);
        if (this.isResidentialTenant) {
          this.dfaApplicationMainDataService.requiredDocuments = ["Insurance", "TenancyProof", "Identification"];
        } else {
          this.dfaApplicationMainDataService.requiredDocuments = ["Insurance" ];
        }
      }
    });
  }

  ngOnInit(): void {

    this.currentFlow = this.route.snapshot.data.flow ? this.route.snapshot.data.flow : 'verified-registration';
    let applicationId = this.route.snapshot.paramMap.get('id');

    // clear old data
    this.dfaApplicationMainDataService.setApplicationId(applicationId);
    this.dfaApplicationMainDataService.cleanUpLog = null;
    this.dfaApplicationMainDataService.cleanUpLogItems = null;
    this.dfaApplicationMainDataService.damagedPropertyAddress = null;
    this.dfaApplicationMainDataService.damagedRooms = null;
    this.dfaApplicationMainDataService.fileUploads = null;
    this.dfaApplicationMainDataService.fullTimeOccupants = null;
    this.dfaApplicationMainDataService.isSubmitted = false;
    this.dfaApplicationMainDataService.otherContacts = null;
    this.dfaApplicationMainDataService.propertyDamage = null;
    this.dfaApplicationMainDataService.secondaryApplicants = null;
    this.dfaApplicationMainDataService.signAndSubmit = null;
    this.dfaApplicationMainDataService.supportingDocuments = null;
    this.dfaApplicationMainDataService.createDFAApplicationMainDTO();
    this.formCreationService.clearCleanUpLogData();
    this.formCreationService.clearCleanUpLogItemsData();
    this.formCreationService.clearDamagedPropertyAddressData();
    this.formCreationService.clearDamagedRoomsData();
    this.formCreationService.clearFileUploadsData();
    this.formCreationService.clearFullTimeOccupantsData();
    this.formCreationService.clearOtherContactsData();
    this.formCreationService.clearPropertyDamageData();
    this.formCreationService.clearSecondaryApplicantsData();
    this.formCreationService.clearSignAndSubmitData();
    this.formCreationService.clearSupportingDocumentsData();

    this.appTypeInsuranceForm$ = this.formCreationService
      .getAppTypeInsuranceForm()
      .subscribe((appTypeInsurance) => {
        this.appTypeInsuranceForm = appTypeInsurance;
      });

    this.dfaApplicationMainDataService.getDfaApplicationStart().subscribe(application => {
      if (application) {
        if (application.id == applicationId) this.getFileUploadsForApplication(applicationId);
        this.dfaApplicationMainHeading = ApplicantOption[application.appTypeInsurance.applicantOption] + ' Application';
        this.appTypeInsuranceForm.controls.applicantOption.setValue(application.appTypeInsurance.applicantOption);
        this.appTypeInsuranceForm.controls.insuranceOption.setValue(application.appTypeInsurance.insuranceOption);
        this.formCreationService.setAppTypeInsuranceForm(this.appTypeInsuranceForm);
      }
    });

    this.steps = this.componentService.createDFAApplicationMainSteps();
    this.vieworedit = this.dfaApplicationMainDataService.getViewOrEdit();
    this.editstep = this.dfaApplicationMainDataService.getEditStep();

    //this.dfaApplicationMainDataService.setViewOrEdit('');
    this.formCreationService.secondaryApplicantsChanged.subscribe(secondaryApplicants => {
      if (secondaryApplicants?.length > 0) this.isSecondaryApplicant = true;
      else this.isSecondaryApplicant = false;
      this.checkSignaturesValid();
    });
    this.formCreationService.signaturesChanged.subscribe(signAndSubmit => {
      signAndSubmit.get('applicantSignature').get('dateSigned').updateValueAndValidity();
      this.isApplicantSigned = this.formCreationService.signAndSubmitForm.value.controls.applicantSignature.valid;
      this.isSecondaryApplicantSigned = this.formCreationService.signAndSubmitForm.value.controls.secondaryApplicantSignature.valid;
      this.checkSignaturesValid();
    });

  }


  public getFileUploadsForApplication(applicationId: string) {

    this.fileUploadsService.attachmentGetAttachments({applicationId: applicationId}).subscribe({
      next: (attachments) => {
         // initialize list of file uploads
        this.formCreationService.fileUploadsForm.value.get('fileUploads').setValue(attachments);

      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  checkSignaturesValid() {
    if (!this.isSecondaryApplicant && this.isApplicantSigned) this.isSignaturesValid = true; // no secondary applicant and primary applicant signature valid
    else if (this.isSecondaryApplicant && this.isApplicantSigned && this.isSecondaryApplicantSigned) this.isSignaturesValid = true; // secondary and primary signatures valid
    else this.isSignaturesValid = false;
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  ngAfterViewInit(): void {
    if (this.vieworedit == 'view' || this.vieworedit == 'edit') {
      for (var i = 0; i <= 7; i++) {
        this.dfaApplicationMainStepper.selected.completed = true;
        this.dfaApplicationMainStepper.next();
      }

      this.dfaApplicationMainStepper.selectedIndex = 0;

      if (this.vieworedit == 'edit') {
        this.dfaApplicationMainStepper.selectedIndex = Number(this.editstep);
      }
    }
  }

  navigateToStep(stepIndex: number) {
    this.dfaApplicationMainStepper.selectedIndex = stepIndex;
  }

  /**
   * Loads form for every step based on index
   *
   * @param index step index
   */
  currentStep(index: number): void {
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
    if (isLast && component === 'review') {
      this.dfaApplicationMainStepper.selected.completed = true;
      this.submitFile();
    } else {
      this.setFormData(component);
      let application = this.dfaApplicationMainDataService.createDFAApplicationMainDTO();
      this.dfaApplicationMainService.upsertApplication(application).subscribe(x => {

        // determine if step is complete
        switch (component) {
          case 'damaged-property-address':
            if (this.form.valid) stepper.selected.completed = true;
            else stepper.selected.completed = false;
            break;
          case 'property-damage':
            if (this.form.valid) stepper.selected.completed = true;
            else stepper.selected.completed = false;
            break;
          case 'occupants':
            if (this.formCreationService.otherContactsForm.value.valid && this.formCreationService.fullTimeOccupantsForm.value.valid) stepper.selected.completed = true;
            else stepper.selected.completed = false;
            break;
          case 'clean-up-log':
            stepper.selected.completed = true;
            break;
          case 'damaged-items-by-room':
            stepper.selected.completed = true;
            break;
          case 'supporting-documents':
            this.isInsuranceTemplateUploaded = this.formCreationService.fileUploadsForm.getValue().getRawValue()?.fileUploads.filter(x => x.fileType === "Insurance" && x.deleteFlag == false).length == 1 ? true : false;
            this.isTenancyProofUploaded = this.formCreationService.fileUploadsForm.getValue().getRawValue()?.fileUploads.filter(x => x.fileType === "TenancyProof" && x.deleteFlag == false).length == 1 ? true : false;
            this.isIdentificationUploaded = this.formCreationService.fileUploadsForm.getValue().getRawValue()?.fileUploads.filter(x => x.fileType === "Identification" && x.deleteFlag == false).length == 1 ? true : false;
            if (this.isInsuranceTemplateUploaded == true &&
              (this.isResidentialTenant == true ? (this.isIdentificationUploaded == true && this.isTenancyProofUploaded == true) : true))
              stepper.selected.completed = true;
            else stepper.selected.completed = false;
              break;
          case 'sign-and-submit':
            if (this.form.valid) stepper.selected.completed = true;
            else stepper.selected.completed = false;
            break;
          case 'review':
            stepper.selected.completed = true;
            break;
          default:
            break;
        }
        this.form$.unsubscribe();
        stepper.next();
        this.form.markAllAsTouched();
      },
      error => {
        console.error(error);
      });
    }
  }

  /**
   * Sets the form data to the DTO services
   *
   * @param component Name of the component
   */
  setFormData(component: string): void {
    switch (component) {
      case 'damaged-property-address':
        this.dfaApplicationMainDataService.damagedPropertyAddress.addressLine1 = this.form.get('addressLine1').value;
        this.dfaApplicationMainDataService.damagedPropertyAddress.addressLine2 = this.form.get('addressLine2').value;
        this.dfaApplicationMainDataService.damagedPropertyAddress.community = this.form.get('community').value;
        this.dfaApplicationMainDataService.damagedPropertyAddress.firstNationsReserve = this.form.get('firstNationsReserve').value;
        this.dfaApplicationMainDataService.damagedPropertyAddress.landlordEmail = this.form.get('landlordEmail').value;
        this.dfaApplicationMainDataService.damagedPropertyAddress.landlordGivenNames = this.form.get('landlordGivenNames').value;
        this.dfaApplicationMainDataService.damagedPropertyAddress.landlordPhone = this.form.get('landlordPhone').value;
        this.dfaApplicationMainDataService.damagedPropertyAddress.landlordSurname = this.form.get('landlordSurname').value;
        this.dfaApplicationMainDataService.damagedPropertyAddress.postalCode = this.form.get('postalCode').value;
        this.dfaApplicationMainDataService.damagedPropertyAddress.stateProvince = this.form.get('stateProvince').value;
        this.dfaApplicationMainDataService.damagedPropertyAddress.eligibleForHomeOwnerGrant = this.form.get('eligibleForHomeOwnerGrant').value == 'true' ? true : (this.form.get('eligibleForHomeOwnerGrant').value == 'false' ? false : null);
        this.dfaApplicationMainDataService.damagedPropertyAddress.isPrimaryAndDamagedAddressSame = this.form.get('isPrimaryAndDamagedAddressSame').value == 'true' ? true : (this.form.get('isPrimaryAndDamagedAddressSame').value == 'false' ? false : null);
        this.dfaApplicationMainDataService.damagedPropertyAddress.manufacturedHome = this.form.get('manufacturedHome').value == 'true' ? true : (this.form.get('manufacturedHome').value == 'false' ? false : null);
        this.dfaApplicationMainDataService.damagedPropertyAddress.occupyAsPrimaryResidence = this.form.get('occupyAsPrimaryResidence').value == 'true' ? true : (this.form.get('occupyAsPrimaryResidence').value == 'false' ? false : null);
        this.dfaApplicationMainDataService.damagedPropertyAddress.onAFirstNationsReserve = this.form.get('onAFirstNationsReserve').value == 'true' ? true : (this.form.get('onAFirstNationsReserve').value == 'false' ? false : null);
        break;
      case 'property-damage':
        this.dfaApplicationMainDataService.propertyDamage.briefDescription = this.form.get('briefDescription').value;
        this.dfaApplicationMainDataService.propertyDamage.damageFromDate = this.form.get('damageFromDate').value;
        this.dfaApplicationMainDataService.propertyDamage.damageToDate = this.form.get('damageToDate').value;
        this.dfaApplicationMainDataService.propertyDamage.dateReturned = this.form.get('dateReturned').value;
        this.dfaApplicationMainDataService.propertyDamage.floodDamage = this.form.get('floodDamage').value;
        this.dfaApplicationMainDataService.propertyDamage.landslideDamage = this.form.get('landslideDamage').value;
        this.dfaApplicationMainDataService.propertyDamage.otherDamage = this.form.get('otherDamage').value;
        this.dfaApplicationMainDataService.propertyDamage.otherDamageText = this.form.get('otherDamageText').value;
        this.dfaApplicationMainDataService.propertyDamage.stormDamage = this.form.get('stormDamage').value;
        this.dfaApplicationMainDataService.propertyDamage.lossesExceed1000 = this.form.get('lossesExceed1000').value == 'true' ? true : (this.form.get('lossesExceed1000').value == 'false' ? false : null);
        this.dfaApplicationMainDataService.propertyDamage.residingInResidence = this.form.get('residingInResidence').value == 'true' ? true : (this.form.get('residingInResidence').value == 'false' ? false : null);
        this.dfaApplicationMainDataService.propertyDamage.wereYouEvacuated = this.form.get('wereYouEvacuated').value == 'true' ? true : (this.form.get('wereYouEvacuated').value == 'false' ? false : null);
        break;
      case 'occupants':
        break;
      case 'clean-up-log':
        this.dfaApplicationMainDataService.cleanUpLog.haveInvoicesOrReceiptsForCleanupOrRepairs = this.form.get('haveInvoicesOrReceiptsForCleanupOrRepairs').value == 'true' ? true : (this.form.get('haveInvoicesOrReceiptsForCleanupOrRepairs').value == 'false' ? false : null);
        break;
      case 'damaged-items-by-room':
        break;
      case 'supporting-documents':
        this.dfaApplicationMainDataService.supportingDocuments.hasCopyOfARentalAgreementOrLease = this.form.get('hasCopyOfARentalAgreementOrLease').value == true ? true : (this.form.get('hasCopyOfARentalAgreementOrLease').value == 'false' ? false : null);
        break;
      case 'sign-and-submit':
        this.dfaApplicationMainDataService.signAndSubmit.applicantSignature.dateSigned = this.form.get('applicantSignature').get('dateSigned').value;
        this.dfaApplicationMainDataService.signAndSubmit.applicantSignature.signature = this.form.get('applicantSignature').get('signature').value;
        this.dfaApplicationMainDataService.signAndSubmit.applicantSignature.signedName = this.form.get('applicantSignature').get('signedName').value;
        this.dfaApplicationMainDataService.signAndSubmit.secondaryApplicantSignature.dateSigned = this.form.get('secondaryApplicantSignature').get('dateSigned').value;
        this.dfaApplicationMainDataService.signAndSubmit.secondaryApplicantSignature.signature = this.form.get('secondaryApplicantSignature').get('signature').value;
        this.dfaApplicationMainDataService.signAndSubmit.secondaryApplicantSignature.signedName = this.form.get('secondaryApplicantSignature').get('signedName').value;
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
          .getDamagedPropertyAddressForm()
          .subscribe((damagedPropertyAddress) => {
            this.form = damagedPropertyAddress;
          });
        break;
      case 1:
        this.form$ = this.formCreationService
          .getPropertyDamageForm()
          .subscribe((propertyDamage) => {
            this.form = propertyDamage;
          });
        break;
      case 2:
        this.form$ = null;
      case 3:
        this.form$ = this.formCreationService
          .getCleanUpLogForm()
          .subscribe((cleanUpLog) => {
            this.form = cleanUpLog;
          });
        break;
      case 4:
        this.form$ = null;
      case 5:
        this.form$ = this.formCreationService
          .getSupportingDocumentsForm()
          .subscribe((supportingDocuments) => {
            this.form = supportingDocuments;
          });
        break;
      case 7:
        this.form$ = this.formCreationService
          .getSignAndSubmitForm()
          .subscribe((signAndSubmit)=> {
          this.form = signAndSubmit;
        });
        break;
    }

    this.isInsuranceTemplateUploaded = this.formCreationService.fileUploadsForm.getValue().getRawValue()?.fileUploads.filter(x => x.fileType === "Insurance" && x.deleteFlag == false).length == 1 ? true : false;
    this.isTenancyProofUploaded = this.formCreationService.fileUploadsForm.getValue().getRawValue()?.fileUploads.filter(x => x.fileType === "TenancyProof" && x.deleteFlag == false).length == 1 ? true : false;
    this.isIdentificationUploaded = this.formCreationService.fileUploadsForm.getValue().getRawValue()?.fileUploads.filter(x => x.fileType === "Identification" && x.deleteFlag == false).length == 1 ? true : false;
  }

  saveAndBackToDashboard() {
    this.setFormData(this.steps[this.dfaApplicationMainStepper.selectedIndex]?.component.toString());
    let application = this.dfaApplicationMainDataService.createDFAApplicationMainDTO();
    this.dfaApplicationMainService.upsertApplication(application).subscribe(x => {
      this.showLoader = !this.showLoader;
      this.returnToDashboard();
    },
    error => {
      console.error(error);
    });
  }

  returnToDashboard() {
    this.router.navigate(['/verified-registration/dashboard']);
  }

  submitFile(): void {
    let application = this.dfaApplicationMainDataService.createDFAApplicationMainDTO();
    this.dfaApplicationMainService.upsertApplication(application).subscribe(x => {
      this.isSubmitted = !this.isSubmitted;
      this.alertService.clearAlert();
      this.dfaApplicationMainDataService.isSubmitted = true;
      this.dfaApplicationMainDataService.setViewOrEdit('view');
      this.vieworedit = 'view';
    },
    error => {
      console.error(error);
    });
  }

  BackToDashboard(): void {
    this.router.navigate(['/dfa-dashboard']);
  }
}
