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
  selector: 'app-damaged-items-by-room',
  templateUrl: './damaged-items-by-room.component.html',
  styleUrls: ['./damaged-items-by-room.component.scss']
})
export default class DamagedItemsByRoomComponent implements OnInit, OnDestroy {
  damagedItemsByRoomForm: UntypedFormGroup;
  formBuilder: UntypedFormBuilder;
  damagedItemsByRoomForm$: Subscription;
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
    this.damagedItemsByRoomForm$ = this.formCreationService
      .getDamagedItemsByRoomForm()
      .subscribe((damagedItemsByRoom) => {
        this.damagedItemsByRoomForm = damagedItemsByRoom;
        this.damagedItemsByRoomForm.updateValueAndValidity();
      });

    this.damagedItemsByRoomForm
      .get('field')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.damagedItemsByRoomForm.get('field').reset();
        }
      });
  }

  /**
   * Returns the control of the form
   */
  get damagedItemsByRoomFormControl(): { [key: string]: AbstractControl } {
    return this.damagedItemsByRoomForm.controls;
  }

  updateOnVisibility(): void {
    this.damagedItemsByRoomForm.get('field').updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.damagedItemsByRoomForm$.unsubscribe();
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
  declarations: [DamagedItemsByRoomComponent]
})
class DamagedItemsByRoomModule {}
