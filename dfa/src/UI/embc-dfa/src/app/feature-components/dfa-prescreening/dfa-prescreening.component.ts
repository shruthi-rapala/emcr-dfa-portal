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
import * as globalConst from '../../core/services/globalConstants';
import { MatStepper } from '@angular/material/stepper';
import { Subscription } from 'rxjs';
import { FormCreationService } from '../../core/services/formCreation.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { DFAPrescreeningDataService } from './dfa-prescreening-data.service';
import { DFAPrescreeningService } from './dfa-prescreening.service';
import { ApplicantOption } from 'src/app/core/api/models';
import { ApplicationService } from 'src/app/core/api/services';
import { MatDialog } from '@angular/material/dialog';
import { DFAConfirmPrescreeningDialogComponent } from 'src/app/core/components/dialog-components/dfa-confirm-prescreening-dialog/dfa-confirm-prescreening-dialog.component';

@Component({
  selector: 'app-dfa-prescreening',
  templateUrl: './dfa-prescreening.component.html',
  styleUrls: ['./dfa-prescreening.component.scss']
})
export class DFAPrescreeningComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  dfaPrescreeningFolderPath = 'dfa-prescreening-forms';
  path: string;
  form$: Subscription;
  form: UntypedFormGroup;
  currentFlow: string;
  type = 'dfa-prescreening';
  parentPageName = 'dfa-dashboard';
  showLoader = false;
  ApplicantOptions = ApplicantOption;
  dfaPrescreeningForm: UntypedFormGroup;
  dfaPrescreeningForm$: Subscription;
  isResidentialTenant: boolean = false;
  isHomeowner: boolean = false;
  isSmallBusinessOwner: boolean = false;
  isFarmOwner: boolean = false;
  isCharitableOrganization: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formCreationService: FormCreationService,
    private cd: ChangeDetectorRef,
    private alertService: AlertService,
    public dfaPrescreeningDataService: DFAPrescreeningDataService,
    private dfaPrescreeningService: DFAPrescreeningService,
    private applicationService: ApplicationService,
    public dialog: MatDialog,
  ) {
    const navigation = this.router.getCurrentNavigation();

    if (this.dfaPrescreeningDataService.dfaPrescreening) {
      this.isResidentialTenant = (this.dfaPrescreeningDataService.dfaPrescreening.applicantOption == Object.keys(this.ApplicantOptions)[Object.values(this.ApplicantOptions).indexOf(this.ApplicantOptions.ResidentialTenant)]);
      this.isHomeowner = (this.dfaPrescreeningDataService.dfaPrescreening.applicantOption == Object.keys(this.ApplicantOptions)[Object.values(this.ApplicantOptions).indexOf(this.ApplicantOptions.Homeowner)]);
      this.isSmallBusinessOwner = (this.dfaPrescreeningDataService.dfaPrescreening.applicantOption == Object.keys(this.ApplicantOptions)[Object.values(this.ApplicantOptions).indexOf(this.ApplicantOptions.SmallBusinessOwner)]);
      this.isFarmOwner = (this.dfaPrescreeningDataService.dfaPrescreening.applicantOption == Object.keys(this.ApplicantOptions)[Object.values(this.ApplicantOptions).indexOf(this.ApplicantOptions.FarmOwner)]);
      this.isCharitableOrganization = (this.dfaPrescreeningDataService.dfaPrescreening.applicantOption == Object.keys(this.ApplicantOptions)[Object.values(this.ApplicantOptions).indexOf(this.ApplicantOptions.CharitableOrganization)]);
    }
  }

  clearAnswers() {

  }

  ngOnInit(): void {

    this.currentFlow = this.route.snapshot.data.flow ? this.route.snapshot.data.flow : 'verified-registration';
    let applicationId = this.route.snapshot.paramMap.get('id');

    // clear old data
    this.dfaPrescreeningDataService.dfaPrescreening = null;
    this.formCreationService.clearDfaPrescreeningData();

    this.dfaPrescreeningForm$ = this.formCreationService
      .getDfaPrescreeningForm()
      .subscribe((prescreening) => {
        this.dfaPrescreeningForm = prescreening;
      });
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  ngAfterViewInit(): void {
  }

  /**
   * Custom back stepper function
   *
   * @param stepper stepper instance
   * @param lastStep stepIndex
   */
  goBack(stepper: MatStepper, lastStep): void {
    this.returnToDashboard();
  }

  /**
   * Custom next stepper function
   *
   * @param stepper stepper instance
   * @param isLast stepperIndex
   * @param component current component name
   */
  goForward(component: string): void {
    if (this.form.valid) {
      this.setFormData();
      this.submitFile();
    }
    this.form$.unsubscribe();
    this.form.markAllAsTouched();
  }

  /**
   * Sets the form data to the DTO services
   *
   * @param component Name of the component
   */
  setFormData(): void {
    this.dfaPrescreeningDataService.dfaPrescreening.addressLine1 = this.form.get('addressLine1').value;
    this.dfaPrescreeningDataService.dfaPrescreening.addressLine2 = this.form.get('addressLine2').value;
    this.dfaPrescreeningDataService.dfaPrescreening.city = this.form.get('city').value;
    this.dfaPrescreeningDataService.dfaPrescreening.postalCode = this.form.get('postalCode').value;
    this.dfaPrescreeningDataService.dfaPrescreening.stateProvince = this.form.get('stateProvince').value;
    this.dfaPrescreeningDataService.dfaPrescreening.applicantOption = this.form.get('applciantOption').value;
    this.dfaPrescreeningDataService.dfaPrescreening.insuranceOption = this.form.get('insuranceOption').value;
    this.dfaPrescreeningDataService.dfaPrescreening.damageFromDate = this.form.get('damageFromDate').value;
    this.dfaPrescreeningDataService.dfaPrescreening.damageCausedByDisaster = this.form.get('damageCausedByDisaster').value == 'true' ? true : (this.form.get('damagedCausedByDisaster').value == 'false' ? false : null);
    this.dfaPrescreeningDataService.dfaPrescreening.isPrimaryAndDamagedAddressSame = this.form.get('isPrimaryAndDamagedAddressSame').value == 'true' ? true : (this.form.get('isPrimaryAndDamagedAddressSame').value == 'false' ? false : null);
    this.dfaPrescreeningDataService.dfaPrescreening.lossesExceed1000 = this.form.get('lossesExceed1000').value == 'true' ? true : (this.form.get('lossesExceed1000').value == 'false' ? false : null);
  }

  /**
   * Loads appropriate forms based on the current step
   *
   * @param index Step index
   */
  loadStepForm(): void {
    this.form$ = this.formCreationService
      .getDfaPrescreeningForm()
      .subscribe((dfaPrescreening) => {
        this.form = dfaPrescreening;
      });
  }

  returnToDashboard() {
    this.router.navigate(['/dfa-dashboard']);
  }

  submitFile(): void {
    this.dialog
      .open(DFAConfirmPrescreeningDialogComponent, {
        data: {
          content: globalConst.confirmPrescreeningBody
        },
        height: '350px',
        width: '700px',
        disableClose: true
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'confirm') {
          // TODO: navigate to application start
        } else this.returnToDashboard();
      });
  }
}
