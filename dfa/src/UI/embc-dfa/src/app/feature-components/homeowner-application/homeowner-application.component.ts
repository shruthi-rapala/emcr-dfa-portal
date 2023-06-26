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
import { HomeOwnerApplicationDataService } from './homeowner-application-data.service';
import { HomeOwnerApplicationService } from './homeowner-application.service';

@Component({
  selector: 'app-homeowner-application',
  templateUrl: './homeowner-application.component.html',
  styleUrls: ['./homeowner-application.component.scss']
})
export class HomeOwnerApplicationComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  @ViewChild('homeOwnerApplicationStepper') homeOwnerApplicationStepper: MatStepper;
  isEditable = true;
  steps: Array<ComponentMetaDataModel> = new Array<ComponentMetaDataModel>();
  showStep = false;
  homeOwnerApplicationFolderPath = 'homeowner-application-forms';
  path: string;
  form$: Subscription;
  form: UntypedFormGroup;
  stepToDisplay: number;
  currentFlow: string;
  type = 'homeowner-application';
  homeOwnerApplicationHeading: string;
  parentPageName = 'homeowner-application';
  showLoader = false;
  isSubmitted = false;

  constructor(
    private router: Router,
    private componentService: ComponentCreationService,
    private route: ActivatedRoute,
    private formCreationService: FormCreationService,
    private cd: ChangeDetectorRef,
    private alertService: AlertService,
    private homeOwnerApplicationDataService: HomeOwnerApplicationDataService,
    private homeOwnerApplicationService: HomeOwnerApplicationService
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
    this.homeOwnerApplicationHeading = 'Home Owner Application';
    this.steps = this.componentService.createHomeOwnerApplicationSteps();
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
      const navigationPath = '/' + this.currentFlow + '/dfa-application';
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
        this.homeOwnerApplicationDataService.damagedPropertyAddress = this.form.value;
        break;
      case 'property-damage':
        this.homeOwnerApplicationDataService.propertyDamage = this.form.value;
        break;
      case 'occupants':
        break;
      case 'clean-up-log':
        break;
      case 'damaged-items-by-room':
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
