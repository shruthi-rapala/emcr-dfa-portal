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

  constructor(
    private router: Router,
    private componentService: ComponentCreationService,
    private route: ActivatedRoute,
    private formCreationService: FormCreationService,
    private cd: ChangeDetectorRef,
    private alertService: AlertService,
    public dfaApplicationMainDataService: DFAApplicationMainDataService,
    private dfaApplicationMainService: DFAApplicationMainService
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
    this.dfaApplicationMainHeading = ApplicantOption[this.dfaApplicationMainDataService.dfaApplicationStart.appTypeInsurance.applicantOption] + ' Application';
    this.steps = this.componentService.createDFAApplicationMainSteps();

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

    // initialize app type insurance form in form creation service to show details in review
    this.appTypeInsuranceForm$ = this.formCreationService
      .getAppTypeInsuranceForm()
      .subscribe((appTypeInsurance) => {
        this.appTypeInsuranceForm = appTypeInsurance;
      });

    this.appTypeInsuranceForm.controls.applicantOption.setValue(this.dfaApplicationMainDataService.dfaApplicationStart.appTypeInsurance.applicantOption);
    this.appTypeInsuranceForm.controls.insuranceOption.setValue(this.dfaApplicationMainDataService.dfaApplicationStart.appTypeInsurance.insuranceOption);
    this.formCreationService.setAppTypeInsuranceForm(this.appTypeInsuranceForm);
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
      const navigationPath = '/' + this.currentFlow + '/dfa-application-start';
      this.router.navigate([navigationPath]);
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
      this.submitFile();
    } else {
      if (isLast) {
        if (this.currentFlow === 'non-verified-registration') {
          // const navigationPath = '/' + this.currentFlow + '/needs-assessment';
          // this.router.navigate([navigationPath]);
        }
      }
      this.setFormData(component);
      this.form$.unsubscribe();
      stepper.selected.completed = true;
      stepper.next();
      this.form.markAllAsTouched();
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
        this.dfaApplicationMainDataService.damagedPropertyAddress = this.form.value;
        break;
      case 'property-damage':
        this.dfaApplicationMainDataService.propertyDamage = this.form.value;
        break;
      case 'occupants':
        this.dfaApplicationMainService.setFullTimeOccupants(this.form.get('fullTimeOccupants').value);
        this.dfaApplicationMainService.setOtherContacts(this.form.get('otherContacts').value);
        this.dfaApplicationMainService.setSecondaryApplicants(this.form.get('secondaryApplicants').value);
        break;
      case 'clean-up-log':
        this.dfaApplicationMainDataService.cleanUpLog = this.form.value;
        break;
      case 'damaged-items-by-room':
        this.dfaApplicationMainDataService.damagedItemsByRoom = this.form.value;
        break;
      case 'supporting-documents':
        this.dfaApplicationMainDataService.supportingDocuments = this.form.value;
        break;
      case 'sign-and-submit':
        this.dfaApplicationMainDataService.signAndSubmit = this.form.value;
        break;
      default:
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
        this.form$ = this.formCreationService
          .getOccupantsForm()
          .subscribe((occupants) => {
            this.form = occupants;
          });
        break;
      case 3:
        this.form$ = this.formCreationService
          .getCleanUpLogForm()
          .subscribe((cleanUpLog) => {
            this.form = cleanUpLog;
          });
        break;
      case 4:
        this.form$ = this.formCreationService
          .getDamagedItemsByRoomForm()
          .subscribe((damagedItemsByRoom) => {
            this.form = damagedItemsByRoom;
          });
        break;
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
  }

  returnToDashboard() {
    this.router.navigate(['/verified-registration/dashboard']);
  }

  submitFile(): void {
    alert("saved");
    this.showLoader = !this.showLoader;
    this.isSubmitted = !this.isSubmitted;
    this.alertService.clearAlert();
    this.dfaApplicationMainDataService.isSubmitted = true;
    // this.dfaStartApplicationService
      // .upsertProfile(this.profileDataService.createProfileDTO())
      // .subscribe({
        // next: (profileId) => {
          // this.profileDataService.setProfileId(profileId);
          // this.router.navigate(['/verified-registration/dashboard']);
        // },
        // error: (error) => {
          // this.showLoader = !this.showLoader;
          // this.isSubmitted = !this.isSubmitted;
          // this.alertService.setAlert('danger', globalConst.saveProfileError);
        // }
      // });
  }
}
