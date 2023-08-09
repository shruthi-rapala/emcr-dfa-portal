import { Component, OnInit, NgModule, Inject, OnDestroy } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormCreationService } from 'src/app/core/services/formCreation.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DirectivesModule } from '../../../../core/directives/directives.module';
import { CustomValidationService } from 'src/app/core/services/customValidation.service';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TextMaskModule } from 'angular2-text-mask';
import { CustomPipeModule } from 'src/app/core/pipe/customPipe.module';
import { SecondaryApplicantTypeOption } from 'src/app/core/api/models';
import { MatSelectModule } from '@angular/material/select';
import { DFAApplicationMainDataService } from 'src/app/feature-components/dfa-application-main/dfa-application-main-data.service';
import { FullTimeOccupantService, OtherContactService, SecondaryApplicantService } from 'src/app/core/api/services';

@Component({
  selector: 'app-occupants',
  templateUrl: './occupants.component.html',
  styleUrls: ['./occupants.component.scss']
})
export default class OccupantsComponent implements OnInit, OnDestroy {
  fullTimeOccupantsForm: UntypedFormGroup;
  fullTimeOccupantsForm$: Subscription;
  otherContactsForm: UntypedFormGroup;
  otherContactsForm$: Subscription;
  secondaryApplicantsForm: UntypedFormGroup;
  secondaryApplicantsForm$: Subscription;
  selectApplicantTypeOptions = SecondaryApplicantTypeOption;
  formBuilder: UntypedFormBuilder;
  formCreationService: FormCreationService;
  showFullTimeOccupantForm: boolean = false;
  fullTimeOccupantsColumnsToDisplay = ['name', 'relationship', 'deleteIcon'];
  fullTimeOccupantsDataSource = new BehaviorSubject([]);
  fullTimeOccupantsData = [];
  showOtherContactForm: boolean = false;
  otherContactsColumnsToDisplay = ['name', 'phoneNumber', 'email', 'deleteIcon'];
  otherContactsDataSource = new BehaviorSubject([]);
  otherContactsData = [];
  showSecondaryApplicantForm: boolean = false;
  secondaryApplicantsColumnsToDisplay = ['applicantType', 'name', 'phoneNumber', 'email', 'deleteIcon'];
  secondaryApplicantsDataSource = new BehaviorSubject([]);
  secondaryApplicantsData = [];
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
  vieworedit: string;

  constructor(
    @Inject('formBuilder') formBuilder: UntypedFormBuilder,
    @Inject('formCreationService') formCreationService: FormCreationService,
    public customValidator: CustomValidationService,
    private dfaApplicationMainDataService: DFAApplicationMainDataService,
    private secondaryApplicantsService: SecondaryApplicantService,
    private otherContactsService: OtherContactService,
    private fullTimeOccupantsService: FullTimeOccupantService
  ) {
    this.formBuilder = formBuilder;
    this.formCreationService = formCreationService;
  }

  ngOnInit(): void {
    this.vieworedit = this.dfaApplicationMainDataService.getViewOrEdit();
    this.fullTimeOccupantsForm$ = this.formCreationService
      .getFullTimeOccupantsForm()
      .subscribe((fullTimeOccupants) => {
        this.fullTimeOccupantsForm = fullTimeOccupants;
      });

    this.fullTimeOccupantsForm
      .get('addNewFullTimeOccupantIndicator')
      .valueChanges.subscribe((value) => this.updateFullTimeOccupantOnVisibility());
    this.getFullTimeOccupantsForApplication(this.dfaApplicationMainDataService.dfaApplicationStart.id);

    this.otherContactsForm$ = this.formCreationService
      .getOtherContactsForm()
      .subscribe((otherContacts) => {
        this.otherContactsForm = otherContacts;
      });

    this.otherContactsForm
      .get('addNewOtherContactIndicator')
      .valueChanges.subscribe((value) => this.updateOtherContactOnVisibility());
    this.getOtherContactsForApplication(this.dfaApplicationMainDataService.dfaApplicationStart.id);

    this.secondaryApplicantsForm$ = this.formCreationService
      .getSecondaryApplicantsForm()
      .subscribe((secondaryApplicants) => {
        this.secondaryApplicantsForm = secondaryApplicants;
      });

    this.secondaryApplicantsForm
      .get('addNewSecondaryApplicantIndicator')
      .valueChanges.subscribe((value) => this.updateSecondaryApplicantOnVisibility());
    this.getSecondaryApplicantsForApplication(this.dfaApplicationMainDataService.dfaApplicationStart.id);
    this.formCreationService.secondaryApplicantsChanged.emit(this.secondaryApplicantsData);
  }

  getSecondaryApplicantsForApplication(applicationId: string) {

    if (applicationId === undefined) {
      applicationId = this.dfaApplicationMainDataService.getApplicationId();
    }

    this.secondaryApplicantsService.secondaryApplicantGetSecondaryApplicants({applicationId: applicationId}).subscribe({
      next: (secondaryApplicants) => {
        this.secondaryApplicantsData = secondaryApplicants;
        this.secondaryApplicantsDataSource.next(this.secondaryApplicantsData);
        this.secondaryApplicantsForm.get('secondaryApplicants').setValue(this.secondaryApplicantsData);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getOtherContactsForApplication(applicationId: string) {

    if (applicationId === undefined) {
      applicationId = this.dfaApplicationMainDataService.getApplicationId();
    }

    this.otherContactsService.otherContactGetOtherContacts({applicationId: applicationId}).subscribe({
      next: (otherContacts) => {
        this.otherContactsData = otherContacts;
        this.otherContactsDataSource.next(this.otherContactsData);
        this.otherContactsForm.get('otherContacts').setValue(this.otherContactsData);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getFullTimeOccupantsForApplication(applicationId: string) {

    if (applicationId === undefined) {
      applicationId = this.dfaApplicationMainDataService.getApplicationId();
    }

    this.fullTimeOccupantsService.fullTimeOccupantGetFullTimeOccupants({applicationId: applicationId}).subscribe({
      next: (fullTimeOccupants) => {
        this.fullTimeOccupantsData = fullTimeOccupants;
        this.fullTimeOccupantsDataSource.next(this.fullTimeOccupantsData);
        this.fullTimeOccupantsForm.get('fullTimeOccupants').setValue(this.fullTimeOccupantsData);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  addFullTimeOccupant(): void {
    this.fullTimeOccupantsForm.get('fullTimeOccupant').reset();
    this.showFullTimeOccupantForm = !this.showFullTimeOccupantForm;
    this.fullTimeOccupantsForm.get('addNewFullTimeOccupantIndicator').setValue(true);
    this.fullTimeOccupantsForm.get('fullTimeOccupant.deleteFlag').setValue(false);
    this.fullTimeOccupantsForm.get('fullTimeOccupant.applicationId').setValue(this.dfaApplicationMainDataService.dfaApplicationStart.id);
  }

  saveFullTimeOccupants(): void {
    if (this.fullTimeOccupantsForm.get('fullTimeOccupant').status === 'VALID') {
      this.fullTimeOccupantsService.fullTimeOccupantUpsertDeleteFullTimeOccupant({body: this.fullTimeOccupantsForm.get('fullTimeOccupant').getRawValue()}).subscribe({
        next: (fullTimeOccupantId) => {
        this.fullTimeOccupantsForm.get('fullTimeOccupant').get('id').setValue(fullTimeOccupantId);
        this.fullTimeOccupantsData.push(this.fullTimeOccupantsForm.get('fullTimeOccupant').value);
        this.fullTimeOccupantsDataSource.next(this.fullTimeOccupantsData);
        this.fullTimeOccupantsForm.get('fullTimeOccupants').setValue(this.fullTimeOccupantsData);
        this.showFullTimeOccupantForm = !this.showFullTimeOccupantForm;
      },
      error: (error) => {
        console.error(error);
      }
    });
    } else {
      this.fullTimeOccupantsForm.get('fullTimeOccupant').markAllAsTouched();
    }
  }

  cancelFullTimeOccupants(): void {
    this.showFullTimeOccupantForm = !this.showFullTimeOccupantForm;
    this.fullTimeOccupantsForm.get('addNewFullTimeOccupantIndicator').setValue(false);
  }

  deleteFullTimeOccupantRow(index: number): void {
    this.fullTimeOccupantsData[index].deleteFlag = true;
    this.fullTimeOccupantsService.fullTimeOccupantUpsertDeleteFullTimeOccupant({body: this.fullTimeOccupantsData[index]}).subscribe({
      next: (fullTimeOccupantId) => {
        this.fullTimeOccupantsData.splice(index, 1);
        this.fullTimeOccupantsDataSource.next(this.fullTimeOccupantsData);
        this.fullTimeOccupantsForm.get('fullTimeOccupants').setValue(this.fullTimeOccupantsData);
        if (this.fullTimeOccupantsData.length === 0) {
          this.fullTimeOccupantsForm
            .get('addNewFullTimeOccupantIndicator')
            .setValue(false);
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  addOtherContact(): void {
    this.otherContactsForm.get('otherContact').reset();
    this.showOtherContactForm = !this.showOtherContactForm;
    this.otherContactsForm.get('addNewOtherContactIndicator').setValue(true);
    this.otherContactsForm.get('otherContact.deleteFlag').setValue(false);
    this.otherContactsForm.get('otherContact.applicationId').setValue(this.dfaApplicationMainDataService.dfaApplicationStart.id);
  }

  saveOtherContact(): void {
    if (this.otherContactsForm.get('otherContact').status === 'VALID') {
      this.otherContactsService.otherContactUpsertDeleteOtherContact({body: this.otherContactsForm.get('otherContact').getRawValue() }).subscribe({
        next: (otherContactId) => {
          this.otherContactsForm.get('otherContact').get('id').setValue(otherContactId);
          this.otherContactsData.push(this.otherContactsForm.get('otherContact').value);
          this.otherContactsDataSource.next(this.otherContactsData);
          this.otherContactsForm.get('otherContacts').setValue(this.otherContactsData);
          this.showOtherContactForm = !this.showOtherContactForm;
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      this.otherContactsForm.get('otherContact').markAllAsTouched();
    }
  }

  cancelOtherContact(): void {
    this.showOtherContactForm = !this.showOtherContactForm;
    this.otherContactsForm.get('addNewOtherContactIndicator').setValue(false);
  }

  deleteOtherContactRow(index: number): void {
    this.otherContactsData[index].deleteFlag = true;
    this.otherContactsService.otherContactUpsertDeleteOtherContact({body: this.otherContactsData[index]}).subscribe({
      next: (otherContactId) => {
        this.otherContactsData.splice(index, 1);
        this.otherContactsDataSource.next(this.otherContactsData);
        this.otherContactsForm.get('otherContacts').setValue(this.otherContactsData);
        if (this.otherContactsData.length === 0) {
          this.otherContactsForm
            .get('addNewOtherContactIndicator')
            .setValue(false);
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  addSecondaryApplicant(): void {
    this.secondaryApplicantsForm.get('secondaryApplicant').reset();
    this.showSecondaryApplicantForm = !this.showSecondaryApplicantForm;
    this.secondaryApplicantsForm.get('addNewSecondaryApplicantIndicator').setValue(true);
    this.secondaryApplicantsForm.get('secondaryApplicant.deleteFlag').setValue(false);
    this.secondaryApplicantsForm.get('secondaryApplicant.applicationId').setValue(this.dfaApplicationMainDataService.dfaApplicationStart.id);
    this.formCreationService.secondaryApplicantsChanged.emit(this.secondaryApplicantsData);
  }

  saveSecondaryApplicants(): void {
    if (this.secondaryApplicantsForm.get('secondaryApplicant').status === 'VALID') {
      this.secondaryApplicantsService.secondaryApplicantUpsertDeleteSecondaryApplicant({body: this.secondaryApplicantsForm.get('secondaryApplicant').getRawValue()}).subscribe({
        next: (secondaryApplicantId) => {
          this.secondaryApplicantsForm.get('secondaryApplicant').get('id').setValue(secondaryApplicantId);
          this.secondaryApplicantsData.push(this.secondaryApplicantsForm.get('secondaryApplicant').value);
          this.secondaryApplicantsDataSource.next(this.secondaryApplicantsData);
          this.secondaryApplicantsForm.get('secondaryApplicants').setValue(this.secondaryApplicantsData);
          this.showSecondaryApplicantForm = !this.showSecondaryApplicantForm;
          this.formCreationService.secondaryApplicantsChanged.emit(this.secondaryApplicantsData);
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      this.secondaryApplicantsForm.get('secondaryApplicant').markAllAsTouched();
    }
  }

  cancelSecondaryApplicants(): void {
    this.showSecondaryApplicantForm = !this.showSecondaryApplicantForm;
    this.secondaryApplicantsForm.get('addNewSecondaryApplicantIndicator').setValue(false);
    this.formCreationService.secondaryApplicantsChanged.emit(this.secondaryApplicantsData);
  }

  deleteSecondaryApplicantRow(index: number): void {
    this.secondaryApplicantsData[index].deleteFlag = true;
    this.secondaryApplicantsService.secondaryApplicantUpsertDeleteSecondaryApplicant({body: this.secondaryApplicantsData[index]}).subscribe({
      next: (secondaryApplicantId) => {
          this.secondaryApplicantsData.splice(index, 1);
          this.secondaryApplicantsDataSource.next(this.secondaryApplicantsData);
          this.secondaryApplicantsForm.get('secondaryApplicants').setValue(this.secondaryApplicantsData);
          if (this.secondaryApplicantsData.length === 0) {
            this.secondaryApplicantsForm
            .get('addNewSecondaryApplicantIndicator')
            .setValue(false);
          }
        this.formCreationService.secondaryApplicantsChanged.emit(this.secondaryApplicantsData);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  updateFullTimeOccupantOnVisibility(): void {
    this.fullTimeOccupantsForm
      .get('fullTimeOccupant.firstName')
      .updateValueAndValidity();
    this.fullTimeOccupantsForm
      .get('fullTimeOccupant.lastName')
      .updateValueAndValidity();
    this.fullTimeOccupantsForm
      .get('fullTimeOccupant.relationship')
      .updateValueAndValidity();
  }

  updateOtherContactOnVisibility(): void {
    this.otherContactsForm
      .get('otherContact.firstName')
      .updateValueAndValidity();
    this.otherContactsForm
      .get('otherContact.lastName')
      .updateValueAndValidity();
    this.otherContactsForm
      .get('otherContact.phoneNumber')
      .updateValueAndValidity();
    this.otherContactsForm
      .get('otherContact.email')
      .updateValueAndValidity();
  }

  updateSecondaryApplicantOnVisibility(): void {
    this.secondaryApplicantsForm
      .get('secondaryApplicant.applicantType')
      .updateValueAndValidity();
    this.secondaryApplicantsForm
      .get('secondaryApplicant.firstName')
      .updateValueAndValidity();
    this.secondaryApplicantsForm
      .get('secondaryApplicant.lastName')
      .updateValueAndValidity();
    this.secondaryApplicantsForm
      .get('secondaryApplicant.phoneNumber')
      .updateValueAndValidity();
    this.secondaryApplicantsForm
      .get('secondaryApplicant.email')
      .updateValueAndValidity();
  }

  /**
   * Returns the control of the form
   */
  get fullTimeOccupantsFormControl(): { [key: string]: AbstractControl } {
    return this.fullTimeOccupantsForm.controls;
  }
  get otherContactsFormControl(): { [key: string]: AbstractControl } {
    return this.otherContactsForm.controls;
  }
  get secondaryApplicantsFormControl(): { [key: string]: AbstractControl } {
    return this.secondaryApplicantsForm.controls;
  }

  ngOnDestroy(): void {
    this.fullTimeOccupantsForm$.unsubscribe();
    this.otherContactsForm$.unsubscribe();
    this.secondaryApplicantsForm$.unsubscribe();
  }
}

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    TextMaskModule,
    CustomPipeModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    DirectivesModule,
  ],
  declarations: [OccupantsComponent]
})
class OccupantsModule {}
