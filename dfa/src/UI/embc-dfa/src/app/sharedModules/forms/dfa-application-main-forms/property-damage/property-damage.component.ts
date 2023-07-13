import { Component, OnInit, NgModule, Inject, OnDestroy } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  AbstractControl,
  FormsModule,
  Validators,
  FormGroup
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { FormCreationService } from 'src/app/core/services/formCreation.service';
import { Subscription } from 'rxjs';
import { DirectivesModule } from '../../../../core/directives/directives.module';
import { CustomValidationService } from 'src/app/core/services/customValidation.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-property-damage',
  templateUrl: './property-damage.component.html',
  styleUrls: ['./property-damage.component.scss']
})
export default class PropertyDamageComponent implements OnInit, OnDestroy {
  propertyDamageForm: UntypedFormGroup;
  formBuilder: UntypedFormBuilder;
  propertyDamageForm$: Subscription;
  formCreationService: FormCreationService;
  remainingLength: number = 2000;

  constructor(
    @Inject('formBuilder') formBuilder: UntypedFormBuilder,
    @Inject('formCreationService') formCreationService: FormCreationService,
    public customValidator: CustomValidationService
  ) {
    this.formBuilder = formBuilder;
    this.formCreationService = formCreationService;
  }

  ngOnInit(): void {
    this.propertyDamageForm$ = this.formCreationService
      .getPropertyDamageForm()
      .subscribe((propertyDamage) => {
        this.propertyDamageForm = propertyDamage;
        this.propertyDamageForm.addValidators([this.validateFormCauseOfDamage]);
        this.propertyDamageForm.get('otherDamageText').setValidators(null);
        this.propertyDamageForm.get('otherDamageText').updateValueAndValidity();
        this.propertyDamageForm.updateValueAndValidity();
      });

    this.propertyDamageForm
      .get('floodDamage')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.propertyDamageForm.get('floodDamage').reset();
        }
      });

    this.propertyDamageForm
      .get('landslideDamage')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.propertyDamageForm.get('landslideDamage').reset();
        }
      });

    this.propertyDamageForm
      .get('wildfireDamage')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.propertyDamageForm.get('wildfireDamage').reset();
        }
      })

    this.propertyDamageForm
      .get('stormDamage')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.propertyDamageForm.get('stormDamage').reset();
        }
      });

    this.propertyDamageForm
      .get('otherDamage')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.propertyDamageForm.get('otherDamage').reset();
        }
      });

    this.propertyDamageForm
      .get('otherDamageText')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.propertyDamageForm.get('otherDamageText').reset();
        }
      });

    this.propertyDamageForm
      .get('damageFromDate')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.propertyDamageForm.get('damageFromDate').reset();
        }
      });

    this.propertyDamageForm
      .get('damageToDate')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.propertyDamageForm.get('damageToDate').reset();
        }
      });

    this.propertyDamageForm
      .get('briefDescription')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.propertyDamageForm.get('briefDescription').reset();
        }
      });

    this.propertyDamageForm
      .get('lossesExceed1000')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.propertyDamageForm.get('lossesExceed1000').reset();
        }
      });

    this.propertyDamageForm
      .get('wereYouEvacuated')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.propertyDamageForm.get('wereYouEvacuated').reset();
        }
      });

    this.propertyDamageForm
      .get('dateReturned')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.propertyDamageForm.get('dateReturned').reset();
        }
      });

    this.propertyDamageForm
      .get('residingInResidence')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.propertyDamageForm.get('residingInResidence').reset();
        }
      });
  }

  validateFormCauseOfDamage(form: FormGroup) {
    if (form.controls.wildfireDamage.value !== true &&
      form.controls.stormDamage.value !== true &&
      form.controls.landslideDamage.value !== true &&
      form.controls.otherDamage.value !== true &&
      form.controls.floodDamage.value !== true) {
      return { noCauseOfDamage: true };
    }
    return null;
  }


  calcRemainingChars() {
    this.remainingLength = 2000 - this.propertyDamageForm.get('briefDescription').value?.length;
  }

  /**
   * Returns the control of the form
   */
  get propertyDamageFormControl(): { [key: string]: AbstractControl } {
    return this.propertyDamageForm.controls;
  }

  ngOnDestroy(): void {
    this.propertyDamageForm$.unsubscribe();
  }
}

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    DirectivesModule,
  ],
  declarations: [PropertyDamageComponent]
})
class PropertyDamageModule {}

