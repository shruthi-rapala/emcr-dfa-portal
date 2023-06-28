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

@Component({
  selector: 'app-clean-up-log',
  templateUrl: './clean-up-log.component.html',
  styleUrls: ['./clean-up-log.component.scss']
})
export default class CleanUpLogComponent implements OnInit, OnDestroy {
  cleanUpLogForm: UntypedFormGroup;
  formBuilder: UntypedFormBuilder;
  cleanUpLogForm$: Subscription;
  formCreationService: FormCreationService;

  constructor(
    @Inject('formBuilder') formBuilder: UntypedFormBuilder,
    @Inject('formCreationService') formCreationService: FormCreationService,
    public customValidator: CustomValidationService
  ) {
    this.formBuilder = formBuilder;
    this.formCreationService = formCreationService;
  }

  ngOnInit(): void {
    this.cleanUpLogForm$ = this.formCreationService
      .getCleanUpLogForm()
      .subscribe((cleanUpLog) => {
        this.cleanUpLogForm = cleanUpLog;
        this.cleanUpLogForm.updateValueAndValidity();
      });

    this.cleanUpLogForm
      .get('field')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.cleanUpLogForm.get('field').reset();
        }
      });
  }

  /**
   * Returns the control of the form
   */
  get cleanUpLogFormControl(): { [key: string]: AbstractControl } {
    return this.cleanUpLogForm.controls;
  }

  updateOnVisibility(): void {
    this.cleanUpLogForm.get('field').updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.cleanUpLogForm$.unsubscribe();
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
  declarations: [CleanUpLogComponent]
})
class CleanUpLogModule {}
