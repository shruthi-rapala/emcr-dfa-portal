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
  selector: 'app-occupants',
  templateUrl: './occupants.component.html',
  styleUrls: ['./occupants.component.scss']
})
export default class OccupantsComponent implements OnInit, OnDestroy {
  occupantsForm: UntypedFormGroup;
  formBuilder: UntypedFormBuilder;
  occupantsForm$: Subscription;
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
    this.occupantsForm$ = this.formCreationService
      .getOccupantsForm()
      .subscribe((occupants) => {
        this.occupantsForm = occupants;
        this.occupantsForm.updateValueAndValidity();
      });

    this.occupantsForm
      .get('field')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.occupantsForm.get('field').reset();
        }
      });
  }

  /**
   * Returns the control of the form
   */
  get occupantsFormControl(): { [key: string]: AbstractControl } {
    return this.occupantsForm.controls;
  }

  updateOnVisibility(): void {
    this.occupantsForm.get('field').updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.occupantsForm$.unsubscribe();
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
  declarations: [OccupantsComponent]
})
class OccupantsModule {}
