import { Component, OnInit, NgModule, Inject, OnDestroy } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  AbstractControl,
  Validators,
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
import { SignatureBlock } from 'src/app/core/api/models';
import { CoreModule } from 'src/app/core/core.module';
import { DFAApplicationMainDataService } from 'src/app/feature-components/dfa-application-main/dfa-application-main-data.service';

@Component({
  selector: 'app-sign-and-submit',
  templateUrl: './sign-and-submit.component.html',
  styleUrls: ['./sign-and-submit.component.scss']
})
export default class SignAndSubmitComponent implements OnInit, OnDestroy {
  signAndSubmitForm: UntypedFormGroup;
  formBuilder: UntypedFormBuilder;
  signAndSubmitForm$: Subscription;
  formCreationService: FormCreationService;
  isSecondaryApplicant: boolean = false;

  constructor(
    @Inject('formBuilder') formBuilder: UntypedFormBuilder,
    @Inject('formCreationService') formCreationService: FormCreationService,
    public customValidator: CustomValidationService,
    public dfaApplicationMainDataService: DFAApplicationMainDataService
  ) {
    this.formBuilder = formBuilder;
    this.formCreationService = formCreationService;
  }

  ngOnInit(): void {
    this.signAndSubmitForm$ = this.formCreationService
      .getSignAndSubmitForm()
      .subscribe((signAndSubmit) => {
        this.signAndSubmitForm = signAndSubmit;
        if (this.signAndSubmitForm.get('applicantSignature').get('signature').value) this.dfaApplicationMainDataService.isSubmitted = true;
      });

    this.signAndSubmitForm
      .get('applicantSignature')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.signAndSubmitForm.get('applicantSignature').reset();
        }
      });

      this.signAndSubmitForm
      .get('secondaryApplicantSignature')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.signAndSubmitForm.get('secondaryApplicantSignature').reset();
        }
      });

      this.formCreationService.secondaryApplicantsChanged.subscribe((secondaryApplicants) => {
        if (secondaryApplicants?.length > 0) {
          this.isSecondaryApplicant = true;
          this.signAndSubmitForm.get('secondaryApplicantSignature').get('signature').setValidators([Validators.required]);
          this.signAndSubmitForm.get('secondaryApplicantSignature').get('dateSigned').setValidators([Validators.required]);
          this.signAndSubmitForm.get('secondaryApplicantSignature').get('signedName').setValidators([Validators.required]);
        }
        else {
          this.signAndSubmitForm.get('secondaryApplicantSignature').get('signature').setValidators(null);
          this.signAndSubmitForm.get('secondaryApplicantSignature').get('dateSigned').setValidators(null);
          this.signAndSubmitForm.get('secondaryApplicantSignature').get('signedName').setValidators(null);
          this.isSecondaryApplicant = false;
        }
        this.signAndSubmitForm.get('secondaryApplicantSignature').updateValueAndValidity();
        this.signAndSubmitForm.updateValueAndValidity();
      });
  }

  /**
   * Returns the control of the form
   */
  get signAndSubmitFormControl(): { [key: string]: AbstractControl } {
    return this.signAndSubmitForm.controls;
  }

  updateApplicantSignature(event: SignatureBlock) {
    this.signAndSubmitForm.get('applicantSignature').get('signedName').setValue(event.signedName);
    this.signAndSubmitForm.get('applicantSignature').get('dateSigned').setValue(event.dateSigned);
    this.signAndSubmitForm.get('applicantSignature').get('signature').setValue(event.signature);
    this.formCreationService.signaturesChanged.emit(this.signAndSubmitForm);
  }

  updateSecondaryApplicantSignature(event: SignatureBlock) {
    this.signAndSubmitForm.get('secondaryApplicantSignature').get('signedName').setValue(event.signedName);
    this.signAndSubmitForm.get('secondaryApplicantSignature').get('dateSigned').setValue(event.dateSigned);
    this.signAndSubmitForm.get('secondaryApplicantSignature').get('signature').setValue(event.signature);
    this.formCreationService.signaturesChanged.emit(this.signAndSubmitForm);
  }


  updateOnVisibility(): void {
    this.signAndSubmitForm.get('applicantSignature').updateValueAndValidity();
    this.signAndSubmitForm.get('secondaryApplicantSignature').updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.signAndSubmitForm$.unsubscribe();
  }
}

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    DirectivesModule,
  ],
  declarations: [SignAndSubmitComponent]
})
class SignAndSubmitModule {}
