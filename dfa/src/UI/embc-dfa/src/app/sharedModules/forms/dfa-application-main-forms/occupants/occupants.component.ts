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
import { SecondaryApplicantTypeOption } from 'src/app/core/model/dfa-application-main.model';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-occupants',
  templateUrl: './occupants.component.html',
  styleUrls: ['./occupants.component.scss']
})
export default class OccupantsComponent implements OnInit, OnDestroy {
  occupantsForm: UntypedFormGroup;
  selectApplicantTypeOptions = SecondaryApplicantTypeOption;
  formBuilder: UntypedFormBuilder;
  occupantsForm$: Subscription;
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

  constructor(
    @Inject('formBuilder') formBuilder: UntypedFormBuilder,
    @Inject('formCreationService') formCreationService: FormCreationService,
    public customValidator: CustomValidationService
  ) {
    this.formBuilder = formBuilder;
    this.formCreationService = formCreationService;
  }

  ngOnInit(): void {
    this.occupantsForm$ = this.formCreationService
      .getOccupantsForm()
      .subscribe((occupants) => {
        this.occupantsForm = occupants;
      });

    this.occupantsForm
    .get('addNewFullTimeOccupantIndicator')
    .valueChanges.subscribe((value) => this.updateFullTimeOccupantOnVisibility());
    this.fullTimeOccupantsDataSource.next(
      this.occupantsForm.get('fullTimeOccupants').value
    );
    this.fullTimeOccupantsData = this.occupantsForm.get('fullTimeOccupants').value;

    this.occupantsForm
    .get('addNewOtherContactIndicator')
    .valueChanges.subscribe((value) => this.updateOtherContactOnVisibility());
    this.otherContactsDataSource.next(
      this.occupantsForm.get('otherContacts').value
    );
    this.otherContactsData = this.occupantsForm.get('otherContacts').value;

    this.occupantsForm
    .get('addNewSecondaryApplicantIndicator')
    .valueChanges.subscribe((value) => this.updateSecondaryApplicantOnVisibility());
    this.secondaryApplicantsDataSource.next(
      this.occupantsForm.get('secondaryApplicants').value
    );
    this.secondaryApplicantsData = this.occupantsForm.get('secondaryApplicants').value;
    this.formCreationService.secondaryApplicantsChanged.emit(this.secondaryApplicantsData);
  }

  addFullTimeOccupant(): void {
    this.occupantsForm.get('fullTimeOccupant').reset();
    this.showFullTimeOccupantForm = !this.showFullTimeOccupantForm;
    this.occupantsForm.get('addNewFullTimeOccupantIndicator').setValue(true);
  }

  saveFullTimeOccupants(): void {
    if (this.occupantsForm.get('fullTimeOccupant').status === 'VALID') {
      this.fullTimeOccupantsData.push(this.occupantsForm.get('fullTimeOccupant').value);
      this.fullTimeOccupantsDataSource.next(this.fullTimeOccupantsData);
      this.occupantsForm.get('fullTimeOccupants').setValue(this.fullTimeOccupantsData);
      this.showFullTimeOccupantForm = !this.showFullTimeOccupantForm;
    } else {
      this.occupantsForm.get('fullTimeOccupant').markAllAsTouched();
    }
  }

  cancelFullTimeOccupants(): void {
    this.showFullTimeOccupantForm = !this.showFullTimeOccupantForm;
    this.occupantsForm.get('addNewFullTimeOccupantIndicator').setValue(false);
  }

  deleteFullTimeOccupantRow(index: number): void {
    this.fullTimeOccupantsData.splice(index, 1);
    this.fullTimeOccupantsDataSource.next(this.fullTimeOccupantsData);
    this.occupantsForm.get('fullTimeOccupants').setValue(this.fullTimeOccupantsData);
    if (this.fullTimeOccupantsData.length === 0) {
      this.occupantsForm
        .get('addNewFullTimeOccupantIndicator')
        .setValue(false);
    }

  }

  addOtherContact(): void {
    this.occupantsForm.get('otherContact').reset();
    this.showOtherContactForm = !this.showOtherContactForm;
    this.occupantsForm.get('addNewOtherContactIndicator').setValue(true);
  }

  saveOtherContact(): void {
    if (this.occupantsForm.get('otherContact').status === 'VALID') {
      this.otherContactsData.push(this.occupantsForm.get('otherContact').value);
      this.otherContactsDataSource.next(this.otherContactsData);
      this.occupantsForm.get('otherContacts').setValue(this.otherContactsData);
      this.showOtherContactForm = !this.showOtherContactForm;
    } else {
      this.occupantsForm.get('otherContact').markAllAsTouched();
    }
  }

  cancelOtherContact(): void {
    this.showOtherContactForm = !this.showOtherContactForm;
    this.occupantsForm.get('addNewOtherContactIndicator').setValue(false);
  }

  deleteOtherContactRow(index: number): void {
    this.otherContactsData.splice(index, 1);
    this.otherContactsDataSource.next(this.otherContactsData);
    this.occupantsForm.get('otherContacts').setValue(this.otherContactsData);
    if (this.otherContactsData.length === 0) {
      this.occupantsForm
        .get('addNewOtherContactIndicator')
        .setValue(false);
    }

  }

  addSecondaryApplicant(): void {
    this.occupantsForm.get('secondaryApplicant').reset();
    this.showSecondaryApplicantForm = !this.showSecondaryApplicantForm;
    this.occupantsForm.get('addNewSecondaryApplicantIndicator').setValue(true);
    this.formCreationService.secondaryApplicantsChanged.emit(this.secondaryApplicantsData);
  }

  saveSecondaryApplicants(): void {
    if (this.occupantsForm.get('secondaryApplicant').status === 'VALID') {
      this.secondaryApplicantsData.push(this.occupantsForm.get('secondaryApplicant').value);
      this.secondaryApplicantsDataSource.next(this.secondaryApplicantsData);
      this.occupantsForm.get('secondaryApplicants').setValue(this.secondaryApplicantsData);
      this.showSecondaryApplicantForm = !this.showSecondaryApplicantForm;
      this.formCreationService.secondaryApplicantsChanged.emit(this.secondaryApplicantsData);
    } else {
      this.occupantsForm.get('secondaryApplicant').markAllAsTouched();
    }
  }

  cancelSecondaryApplicants(): void {
    this.showSecondaryApplicantForm = !this.showSecondaryApplicantForm;
    this.occupantsForm.get('addNewSecondaryApplicantIndicator').setValue(false);
    this.formCreationService.secondaryApplicantsChanged.emit(this.secondaryApplicantsData);
  }

  deleteSecondaryApplicantRow(index: number): void {
    this.secondaryApplicantsData.splice(index, 1);
    this.secondaryApplicantsDataSource.next(this.secondaryApplicantsData);
    this.occupantsForm.get('secondaryApplicants').setValue(this.secondaryApplicantsData);
    if (this.secondaryApplicantsData.length === 0) {
      this.occupantsForm
        .get('addNewSecondaryApplicantIndicator')
        .setValue(false);
    }
    this.formCreationService.secondaryApplicantsChanged.emit(this.secondaryApplicantsData);
  }

  updateFullTimeOccupantOnVisibility(): void {
    this.occupantsForm
      .get('fullTimeOccupant.firstName')
      .updateValueAndValidity();
    this.occupantsForm
      .get('fullTimeOccupant.lastName')
      .updateValueAndValidity();
    this.occupantsForm
      .get('fullTimeOccupant.relationship')
      .updateValueAndValidity();
  }

  updateOtherContactOnVisibility(): void {
    this.occupantsForm
      .get('otherContact.firstName')
      .updateValueAndValidity();
    this.occupantsForm
      .get('otherContact.lastName')
      .updateValueAndValidity();
    this.occupantsForm
      .get('otherContact.phoneNumber')
      .updateValueAndValidity();
    this.occupantsForm
      .get('otherContact.email')
      .updateValueAndValidity();
  }

  updateSecondaryApplicantOnVisibility(): void {
    this.occupantsForm
      .get('secondaryApplicant.secondaryApplicantType')
      .updateValueAndValidity();
    this.occupantsForm
      .get('secondaryApplicant.firstName')
      .updateValueAndValidity();
    this.occupantsForm
      .get('secondaryApplicant.lastName')
      .updateValueAndValidity();
    this.occupantsForm
      .get('secondaryApplicant.phoneNumber')
      .updateValueAndValidity();
    this.occupantsForm
      .get('secondaryApplicant.email')
      .updateValueAndValidity();
  }

  /**
   * Returns the control of the form
   */
  get occupantsFormControl(): { [key: string]: AbstractControl } {
    return this.occupantsForm.controls;
  }

  ngOnDestroy(): void {
    this.occupantsForm$.unsubscribe();
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
