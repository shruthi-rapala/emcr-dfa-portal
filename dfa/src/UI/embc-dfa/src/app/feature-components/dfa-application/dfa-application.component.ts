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
import { DFAApplicationDataService } from './dfa-application-data.service';
import { DFAApplicationService } from './dfa-application.service';
import { InsuranceOption } from 'src/app/core/model/dfa-application.model';

@Component({
  selector: 'app-dfa-application',
  templateUrl: './dfa-application.component.html',
  styleUrls: ['./dfa-application.component.scss']
})
export class DFAApplicationComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  @ViewChild('dfaApplicationStepper') dfaApplicationStepper: MatStepper;
  isEditable = true;
  fullInsurance: boolean = false;
  steps: Array<ComponentMetaDataModel> = new Array<ComponentMetaDataModel>();
  showStep = false;
  dfaApplicationFolderPath = 'dfa-application-forms';
  path: string;
  form$: Subscription;
  form: UntypedFormGroup;
  stepToDisplay: number;
  currentFlow: string;
  type = 'dfa-application';
  dfaApplicationHeading: string;
  parentPageName = 'dfa-application';
  showLoader = false;
  isSubmitted = false;

  constructor(
    private router: Router,
    private componentService: ComponentCreationService,
    private route: ActivatedRoute,
    private formCreationService: FormCreationService,
    private cd: ChangeDetectorRef,
    private alertService: AlertService,
    private dfaApplicationDataService: DFAApplicationDataService,
    private dfaApplicationService: DFAApplicationService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation !== null) {
      if (navigation.extras.state !== undefined) {
        const state = navigation.extras.state as { stepIndex: number };
        this.stepToDisplay = state.stepIndex;
      }
    }
    this.formCreationService.insuranceOptionChanged.subscribe((value) => {
      let enumKey = Object.keys(InsuranceOption)[Object.values(InsuranceOption).indexOf(InsuranceOption.Yes)];
      if (value === enumKey) this.fullInsurance = true; else this.fullInsurance = false;
    });
  }

  ngOnInit(): void {
    this.currentFlow = this.route.snapshot.data.flow ? this.route.snapshot.data.flow : 'verified-registration';
    this.dfaApplicationHeading = 'Create Your Application';
    this.steps = this.componentService.createDFAApplicationSteps();
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  ngAfterViewInit(): void {
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
      const navigationPath = '/' + this.currentFlow + '/collection-notice';
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
    } else if (this.form.status === 'VALID') {
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
    } else {
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
      case 'consent':
        this.dfaApplicationDataService.consent = this.form.value;
        break;
      case 'profile-verification':
        this.dfaApplicationDataService.profileVerification = this.form.value;
        break;
      case 'app-type-insurance':
        this.dfaApplicationDataService.applicantOption = this.form.value;
        this.dfaApplicationDataService.insuranceOption = this.form.value;
        this.dfaApplicationDataService.smallBusinessOption = this.form.value;
        this.dfaApplicationDataService.farmOption = this.form.value;
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
          .getConsentForm()
          .subscribe((consent) => {
            this.form = consent;
          });
        break;
      case 1:
        this.form$ = this.formCreationService
          .getProfileVerificationForm()
          .subscribe((profileVerification) => {
            this.form = profileVerification;
          });
        break;
      case 2:
        this.form$ = this.formCreationService
          .getAppTypeInsuranceForm()
          .subscribe((appTypeInsurance) => {
            this.form = appTypeInsurance;
          });
        break;
    }
  }

  submitFile(): void {
    this.showLoader = !this.showLoader;
    this.isSubmitted = !this.isSubmitted;
    this.alertService.clearAlert();
    // this.dfaApplicationService
      // .upsertProfile(this.profileDataService.createProfileDTO())
      // .subscribe({
        // next: (profileId) => {
          // this.profileDataService.setProfileId(profileId);
          this.router.navigate(['/verified-registration/dashboard']);
        // },
        // error: (error) => {
          // this.showLoader = !this.showLoader;
          // this.isSubmitted = !this.isSubmitted;
          // this.alertService.setAlert('danger', globalConst.saveProfileError);
        // }
      // });
  }
}
