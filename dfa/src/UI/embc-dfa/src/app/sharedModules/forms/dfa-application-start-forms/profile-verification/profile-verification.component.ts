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
import { Subscription } from 'rxjs';
import { DirectivesModule } from '../../../../core/directives/directives.module';
import { CustomValidationService } from 'src/app/core/services/customValidation.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { ProfileDataService } from 'src/app/feature-components/profile/profile-data.service';

@Component({
  selector: 'app-profile-verification',
  templateUrl: './profile-verification.component.html',
  styleUrls: ['./profile-verification.component.scss']
})
export default class ProfileVerificationComponent implements OnInit, OnDestroy {
  profileVerificationForm: UntypedFormGroup;
  formBuilder: UntypedFormBuilder;
  profileVerificationForm$: Subscription;
  formCreationService: FormCreationService;

  constructor(
    @Inject('formBuilder') formBuilder: UntypedFormBuilder,
    @Inject('formCreationService') formCreationService: FormCreationService,
    public customValidator: CustomValidationService,
    private profileDataService: ProfileDataService
  ) {
    this.formBuilder = formBuilder;
    this.formCreationService = formCreationService;
  }

  ngOnInit(): void {
    this.profileVerificationForm$ = this.formCreationService
      .getProfileVerificationForm()
      .subscribe((profileVerification) => {
        this.profileVerificationForm = profileVerification;
        this.profileVerificationForm.updateValueAndValidity();
      });

    this.profileVerificationForm.get('profileId').setValue(this.profileDataService.getProfileId());

    this.profileVerificationForm
      .get('profileVerified')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.profileVerificationForm.get('profileVerified').reset();
        }
      });

    // TODO: Implement the correct setting of this value, will it be a radio button or checkbox??
    this.profileVerificationForm.get('profileVerified').setValue(true);
  }

  /**
   * Returns the control of the form
   */
  get profileVerificationFormControl(): { [key: string]: AbstractControl } {
    return this.profileVerificationForm.controls;
  }

  updateOnVisibility(): void {
    this.profileVerificationForm.get('profileVerified').updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.profileVerificationForm$.unsubscribe();
  }
}

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    DirectivesModule,
  ],
  declarations: [ProfileVerificationComponent]
})
class ProfileVerificationModule {}
