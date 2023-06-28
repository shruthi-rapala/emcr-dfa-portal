import { Component, OnInit, NgModule, Inject, OnDestroy } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { CommonModule, KeyValue } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormCreationService } from 'src/app/core/services/formCreation.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DirectivesModule } from '../../../../core/directives/directives.module';
import { CustomValidationService } from 'src/app/core/services/customValidation.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { RoomType } from 'src/app/core/model/dfa-application-main.model';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

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
  RoomTypes = RoomType;
  showOtherRoomType: boolean = false;
  showDamagedRoomForm: boolean = false;
  damagedRoomColumnsToDisplay = ['roomType', 'description', 'icons'];
  damagedRoomsDataSource = new BehaviorSubject([]);
  damagedRoomsData = [];
  remainingLength: number = 2000;
  editIndex: number;
  rowEdit = false;
  editFlag = false;


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
      });


    this.damagedItemsByRoomForm
    .get('damagedRoom.roomType')
    .valueChanges.pipe(distinctUntilChanged())
    .subscribe((value) => {
      if (value === '') {
        this.damagedItemsByRoomForm.get('damagedRoom.roomType').reset();
      }
      if (value === RoomType.Other) {
        this.showOtherRoomType = true;
      } else {
        this.showOtherRoomType = false;
      }
    });

    this.damagedItemsByRoomForm
      .get('addNewDamagedRoomIndicator')
      .valueChanges.subscribe((value) => this.updateDamagedRoomOnVisibility());
    this.damagedItemsByRoomForm.get('damagedRoom.otherRoomType').setValidators(null);
    this.damagedRoomsDataSource.next(
        this.damagedItemsByRoomForm.get('damagedRooms').value
      );
    this.damagedRoomsData = this.damagedItemsByRoomForm.get('damagedRooms').value;

  }

  calcRemainingChars() {
    this.remainingLength = 2000 - this.damagedItemsByRoomForm.get('description').value?.length;
  }

  addDamagedRoom(): void {
    this.damagedItemsByRoomForm.get('damagedRoom').reset();
    this.showOtherRoomType = false;
    this.damagedItemsByRoomForm.get('damagedRoom.otherRoomType').setValidators(null);
    this.showDamagedRoomForm = !this.showDamagedRoomForm;
    this.damagedItemsByRoomForm.get('addNewDamagedRoomIndicator').setValue(true);
  }

  saveDamagedRooms(): void {
    if (this.damagedItemsByRoomForm.get('damagedRoom').status === 'VALID') {
      if (this.editIndex !== undefined && this.rowEdit) {
        this.damagedRoomsData[this.editIndex] =
          this.damagedItemsByRoomForm.get('damagedRoom').value;
        this.rowEdit = !this.rowEdit;
        this.editIndex = undefined;
      } else {
        this.damagedRoomsData.push(this.damagedItemsByRoomForm.get('damagedRoom').value);
      }
      this.damagedRoomsDataSource.next(this.damagedRoomsData);
      this.damagedItemsByRoomForm.get('damagedRooms').setValue(this.damagedRoomsData);
      this.showDamagedRoomForm = !this.showDamagedRoomForm;
      this.editFlag = !this.editFlag;
    } else {
      this.damagedItemsByRoomForm.get('damagedRoom').markAllAsTouched();
    }
  }

  cancelDamagedRooms(): void {
    this.showDamagedRoomForm = !this.showDamagedRoomForm;
    this.damagedItemsByRoomForm.get('addNewDamagedRoomIndicator').setValue(false);
  }

  deleteDamagedRoomRow(index: number): void {
    this.damagedRoomsData.splice(index, 1);
    this.damagedRoomsDataSource.next(this.damagedRoomsData);
    this.damagedItemsByRoomForm.get('damagedRooms').setValue(this.damagedRoomsData);
    if (this.damagedRoomsData.length === 0) {
      this.damagedItemsByRoomForm
        .get('addNewDamagedRoomIndicator')
        .setValue(false);
    }
    this.cancelDamagedRooms();
  }

  editDamagedRoomRow(element, index): void {
    this.editIndex = index;
    this.rowEdit = !this.rowEdit;
    this.damagedItemsByRoomForm.get('damagedRoom').setValue(element);
    this.showDamagedRoomForm = !this.showDamagedRoomForm;
    this.editFlag = !this.editFlag;
    this.damagedItemsByRoomForm.get('addNewDamagedRoomIndicator').setValue(true);
  }

  // Preserve original property order
  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }

  onSelectRoomType(roomType: RoomType) {
    if (roomType === this.RoomTypes.Other) {
      this.damagedItemsByRoomForm.get('damagedRoom.otherRoomType').setValidators([Validators.required]);
    } else {
      this.damagedItemsByRoomForm.get('damagedRoom.otherRoomType').setValidators(null);
    }
  }


  updateDamagedRoomOnVisibility(): void {
    this.damagedItemsByRoomForm
      .get('damagedRoom.roomType')
      .updateValueAndValidity();
    this.damagedItemsByRoomForm
      .get('damagedRoom.otherRoomType')
      .updateValueAndValidity();
    this.damagedItemsByRoomForm
      .get('damagedRoom.description')
      .updateValueAndValidity();
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
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    DirectivesModule,
  ],
  declarations: [DamagedItemsByRoomComponent]
})
class DamagedItemsByRoomModule {}
