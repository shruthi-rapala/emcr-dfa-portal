import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  AfterViewChecked,
  ChangeDetectorRef,
  ViewEncapsulation
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentCreationService } from '../../core/services/componentCreation.service';
import * as globalConst from '../../core/services/globalConstants';
import { ComponentMetaDataModel } from '../../core/model/componentMetaData.model';
import { MatStepper } from '@angular/material/stepper';
import { Subscription, distinctUntilChanged, mapTo } from 'rxjs';
import { FormCreationService } from '../../core/services/formCreation.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { DFAApplicationMainDataService } from './dfa-application-main-data.service';
import { DFAApplicationMainService } from './dfa-application-main.service';
import { ApplicantOption, FarmOption, SmallBusinessOption } from 'src/app/core/api/models';
import { ApplicationService, AttachmentService } from 'src/app/core/api/services';
import { MatDialog } from '@angular/material/dialog';
import { DFAConfirmSubmitDialogComponent } from 'src/app/core/components/dialog-components/dfa-confirm-submit-dialog/dfa-confirm-submit-dialog.component';
import { SecondaryApplicant } from 'src/app/core/model/dfa-application-main.model';
import { AddressChangeComponent } from 'src/app/core/components/dialog-components/address-change-dialog/address-change-dialog.component';
import { DFAApplicationMainMappingService } from './dfa-application-main-mapping.service';

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
  secondaryApplicants: SecondaryApplicant[] = [];
  isSignaturesValid: boolean = false;
  appTypeInsuranceForm: UntypedFormGroup;
  appTypeInsuranceForm$: Subscription;
  vieworedit: string;
  editstep: string;
  ninetyDayDeadline: string;
  daysToApply: number;
  isResidentialTenant: boolean = false;
  isGeneral: boolean = false;
  isCorporate: boolean = false;
  isLandlord: boolean = false;
  isHomeowner: boolean = false;
  isSmallBusinessOwner: boolean = false;
  isFarmOwner: boolean = false;
  isCharitableOrganization: boolean = false;
  AppOptions = ApplicantOption;
  SmallBusinessOptions = SmallBusinessOption;
  FarmOptions = FarmOption;
  signAndSubmitForm: UntypedFormGroup;
  showStepper: boolean = false;

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
    public dialog: MatDialog,
    private fileUploadsService: AttachmentService,
    private dfaApplicationMainMapping: DFAApplicationMainMappingService,
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
    let applicationId = this.route.snapshot.paramMap.get('id');

    if (applicationId) {
      this.dfaApplicationMainDataService.setApplicationId(applicationId);
    }
    this.formCreationService.clearPropertyDamageData();
    this.formCreationService.clearOtherContactsData();

    this.steps = this.componentService.createDFAApplicationMainSteps();
    this.vieworedit = this.dfaApplicationMainDataService.getViewOrEdit();
    this.editstep = this.dfaApplicationMainDataService.getEditStep();
    this.showStepper = false;
    this.dfaApplicationMainHeading = 'Application Details'
  }



  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  ngAfterViewInit(): void {
    
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
      this.dfaApplicationMainMapping.mapDFAApplicationMain(application);

      this.dfaApplicationMainService.upsertApplication(application).subscribe(x => {

        // determine if step is complete
        switch (component) {
          case 'property-damage':
            if (this.form.valid) stepper.selected.completed = true;
            else stepper.selected.completed = false;
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
        document.location.href = 'https://dfa.gov.bc.ca/error.html';
      });
    }
  }

  requiredDocumentsSupplied(): boolean {
    let isInsuranceTemplateUploaded = this.formCreationService.fileUploadsForm.getValue().getRawValue()?.fileUploads.filter(x => x.requiredDocumentType === "InsuranceTemplate" && x.deleteFlag == false).length >= 1 ? true : false;
    let isTenancyProofUploaded = this.formCreationService.fileUploadsForm.getValue().getRawValue()?.fileUploads.filter(x => x.requiredDocumentType === "TenancyAgreement" && x.deleteFlag == false).length >= 1 ? true : false;
    let isIdentificationUploaded = this.formCreationService.fileUploadsForm.getValue().getRawValue()?.fileUploads.filter(x => x.requiredDocumentType === "Identification" && x.deleteFlag == false).length >= 1 ? true : false;
    let isT1GeneralIncomeTaxReturnUploaded = this.formCreationService.fileUploadsForm.getValue().getRawValue()?.fileUploads.filter(x => x.requiredDocumentType === "T1GeneralIncomeTaxReturn" && x.deleteFlag == false).length >= 1 ? true : false;
    let isFinancialStatementsUploaded = this.formCreationService.fileUploadsForm.getValue().getRawValue()?.fileUploads.filter(x => x.requiredDocumentType === "FinancialStatements" && x.deleteFlag == false).length >= 1 ? true : false;
    let isT776Uploaded = this.formCreationService.fileUploadsForm.getValue().getRawValue()?.fileUploads.filter(x => x.requiredDocumentType === "T776" && x.deleteFlag == false).length >= 1 ? true : false;
    let isResidentialTenancyAgreementUploaded = this.formCreationService.fileUploadsForm.getValue().getRawValue()?.fileUploads.filter(x => x.requiredDocumentType === "ResidentialTenancyAgreement" && x.deleteFlag == false).length >= 1 ? true : false;
    let isT2CorporateIncomeTaxReturnUploaded = this.formCreationService.fileUploadsForm.getValue().getRawValue()?.fileUploads.filter(x => x.requiredDocumentType === "T2CorporateIncomeTaxReturn" && x.deleteFlag == false).length >= 1 ? true : false;
    let isProofOfOwnershipUploaded = this.formCreationService.fileUploadsForm.getValue().getRawValue()?.fileUploads.filter(x => x.requiredDocumentType === "ProofOfOwnership" && x.deleteFlag == false).length >= 1 ? true : false;
    let isDirectorsListingUploaded = this.formCreationService.fileUploadsForm.getValue().getRawValue()?.fileUploads.filter(x => x.requiredDocumentType === "DirectorsListing" && x.deleteFlag == false).length >= 1 ? true : false;
    let isRegistrationProofUploaded = this.formCreationService.fileUploadsForm.getValue().getRawValue()?.fileUploads.filter(x => x.requiredDocumentType === "RegistrationProof" && x.deleteFlag == false).length >= 1 ? true : false;
    let isStructureAndPurposeUploaded = this.formCreationService.fileUploadsForm.getValue().getRawValue()?.fileUploads.filter(x => x.requiredDocumentType === "StructureAndPurpose" && x.deleteFlag == false).length >= 1 ? true : false;

    if (isInsuranceTemplateUploaded == true
      && (this.isResidentialTenant == true ? (isIdentificationUploaded == true && isTenancyProofUploaded == true) : true)
      && ((this.isSmallBusinessOwner == true  && this.isGeneral == true) ? (isT1GeneralIncomeTaxReturnUploaded == true && isFinancialStatementsUploaded == true) : true )
      && ((this.isSmallBusinessOwner == true  && this.isCorporate == true) ? (isT2CorporateIncomeTaxReturnUploaded == true && isFinancialStatementsUploaded == true && isProofOfOwnershipUploaded) : true )
      && ((this.isSmallBusinessOwner == true  && this.isLandlord == true) ? (isT1GeneralIncomeTaxReturnUploaded == true && isT776Uploaded == true && isResidentialTenancyAgreementUploaded == true) : true )
      && ((this.isFarmOwner == true  && this.isGeneral == true) ? (isT1GeneralIncomeTaxReturnUploaded == true && isFinancialStatementsUploaded == true) : true )
      && ((this.isFarmOwner == true  && this.isCorporate == true) ? (isT2CorporateIncomeTaxReturnUploaded == true && isFinancialStatementsUploaded == true && isProofOfOwnershipUploaded) : true )
      && ((this.isCharitableOrganization == true) ? (isDirectorsListingUploaded == true && isRegistrationProofUploaded == true && isStructureAndPurposeUploaded) : true )
      ) return true;
    else return false;
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
        this.dfaApplicationMainDataService.damagedPropertyAddress.businessLegalName = this.form.get('businessLegalName').value;
        this.dfaApplicationMainDataService.damagedPropertyAddress.businessManagedByAllOwnersOnDayToDayBasis = this.form.get('businessManagedByAllOwnersOnDayToDayBasis').value == 'true' ? true : (this.form.get('businessManagedByAllOwnersOnDayToDayBasis').value == 'false' ? false : null);
        this.dfaApplicationMainDataService.damagedPropertyAddress.employLessThan50EmployeesAtAnyOneTime = this.form.get('employLessThan50EmployeesAtAnyOneTime').value == 'true' ? true : (this.form.get('employLessThan50EmployeesAtAnyOneTime').value == 'false' ? false : null);
        this.dfaApplicationMainDataService.damagedPropertyAddress.lossesExceed1000 = this.form.get('lossesExceed1000').value == 'true' ? true : (this.form.get('lossesExceed1000').value == 'false' ? false : null);
        this.dfaApplicationMainDataService.damagedPropertyAddress.farmoperation = this.form.get('farmoperation').value == 'true' ? true : (this.form.get('farmoperation').value == 'false' ? false : null);
        this.dfaApplicationMainDataService.damagedPropertyAddress.ownedandoperatedbya = this.form.get('ownedandoperatedbya').value == 'true' ? true : (this.form.get('ownedandoperatedbya').value == 'false' ? false : null);
        this.dfaApplicationMainDataService.damagedPropertyAddress.farmoperationderivesthatpersonsmajorincom = this.form.get('farmoperationderivesthatpersonsmajorincom').value == 'true' ? true : (this.form.get('farmoperationderivesthatpersonsmajorincom').value == 'false' ? false : null);
        this.dfaApplicationMainDataService.damagedPropertyAddress.grossRevenues100002000000BeforeDisaster = this.form.get('grossRevenues100002000000BeforeDisaster').value == 'true' ? true : (this.form.get('grossRevenues100002000000BeforeDisaster').value == 'false' ? false : null);
        this.dfaApplicationMainDataService.damagedPropertyAddress.charityRegistered = this.form.get('charityRegistered').value == 'true' ? true : (this.form.get('charityRegistered').value == 'false' ? false : null);
        this.dfaApplicationMainDataService.damagedPropertyAddress.charityExistsAtLeast12Months = this.form.get('charityExistsAtLeast12Months').value == 'true' ? true : (this.form.get('charityExistsAtLeast12Months').value == 'false' ? false : null);
        this.dfaApplicationMainDataService.damagedPropertyAddress.charityProvidesCommunityBenefit = this.form.get('charityProvidesCommunityBenefit').value == 'true' ? true : (this.form.get('charityExistsAtLeast12Months').value == 'false' ? false : null);
        this.dfaApplicationMainDataService.damagedPropertyAddress.isDamagedAddressVerified = this.form.get('isDamagedAddressVerified').value == 'true' ? true : (this.form.get('isDamagedAddressVerified').value == 'false' ? false : null);
        break;
      case 'property-damage':
        this.dfaApplicationMainDataService.propertyDamage.damageFromDate = this.form.get('damageFromDate').value;
        this.dfaApplicationMainDataService.propertyDamage.damageToDate = this.form.get('damageToDate').value;
        this.dfaApplicationMainDataService.propertyDamage.floodDamage = this.form.get('floodDamage').value;
        this.dfaApplicationMainDataService.propertyDamage.landslideDamage = this.form.get('landslideDamage').value;
        this.dfaApplicationMainDataService.propertyDamage.otherDamage = this.form.get('otherDamage').value;
        this.dfaApplicationMainDataService.propertyDamage.otherDamageText = this.form.get('otherDamageText').value;
        this.dfaApplicationMainDataService.propertyDamage.stormDamage = this.form.get('stormDamage').value;
        this.dfaApplicationMainDataService.propertyDamage.wildfireDamage = this.form.get('wildfireDamage').value;
        this.dfaApplicationMainDataService.propertyDamage.guidanceSupport = this.form.get('guidanceSupport').value == 'true' ? true : (this.form.get('guidanceSupport').value == 'false' ? false : null);
        //this.dfaApplicationMainDataService.otherContacts = 
        //this.otherContactsForm.get('otherContact').getRawValue()
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
          .getPropertyDamageForm()
          .subscribe((propertyDamage) => {
            this.form = propertyDamage;
          });

        break;
    }
  }

  saveAndBackToDashboard() {
    //this.setFormData(this.steps[this.dfaApplicationMainStepper.selectedIndex]?.component.toString());
    //let application = this.dfaApplicationMainDataService.createDFAApplicationMainDTO();
    //this.dfaApplicationMainService.upsertApplication(application).subscribe(x => {
    //  this.showLoader = !this.showLoader;
    //  this.returnToDashboard();
    //},
    //error => {
    //  console.error(error);
    //  document.location.href = 'https://dfa.gov.bc.ca/error.html';
    //  });

    this.returnToDashboard();
  }

  returnToDashboard() {
    this.dfaApplicationMainDataService.setApplicationId(null);
    this.router.navigate(['/verified-registration/dashboard']);
  }

  submitFile(): void {
    var contentDialog = globalConst.confirmSubmitApplicationBody;
    if (this.dfaApplicationMainDataService.getApplicationId()) {
      contentDialog = globalConst.confirmUpdateApplicationBody;
    }

    this.dialog
      .open(DFAConfirmSubmitDialogComponent, {
        data: {
          content: contentDialog
        },
        height: '250px',
        width: '700px',
        disableClose: true
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'confirm') {
          //let application = this.dfaApplicationMainDataService.createDFAApplicationMainDTO();
          //this.dfaApplicationMainMapping.mapDFAApplicationMain(application);
          this.setFormData(this.steps[this.dfaApplicationMainStepper.selectedIndex]?.component.toString());
          let application = this.dfaApplicationMainDataService.createDFAApplicationMainDTO();

          this.dfaApplicationMainService.upsertApplication(application).subscribe(x => {
            this.isSubmitted = !this.isSubmitted;
            this.alertService.clearAlert();
            this.dfaApplicationMainDataService.isSubmitted = true;
            this.dfaApplicationMainDataService.setViewOrEdit('view');
            this.vieworedit = 'view';
            this.returnToDashboard();
          },
          error => {
            console.error(error);
            //document.location.href = 'https://dfa.gov.bc.ca/error.html';
          });
        }
      });
  }

  BackToDashboard(): void {
    this.router.navigate(['/dfa-dashboard']);
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
