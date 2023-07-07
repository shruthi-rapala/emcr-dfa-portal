import { Component, OnInit, NgModule, Inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
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
import { FileCategory, RoomType } from 'src/app/core/model/dfa-application-main.model';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from 'src/app/core/core.module';

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
  showGarageHint: boolean = false;
  showDamagedRoomForm: boolean = false;
  damagedRoomColumnsToDisplay = ['roomType', 'description', 'icons'];
  damagedRoomsDataSource = new BehaviorSubject([]);
  damagedRoomsData = [];
  remainingLength: number = 2000;
  damagedRoomEditIndex: number;
  damagedRoomRowEdit = false;
  damagedRoomEditFlag = false;
  showFileAttachmentForm: boolean = false;
  fileAttachmentColumnsToDisplay = ['fileName', 'fileDescription', 'uploadedDate', 'icons'];
  fileAttachmentsDataSource = new BehaviorSubject([]);
  fileAttachmentsData = [];
  fileAttachmentEditIndex: number;
  fileAttachmentRowEdit = false;
  fileAttachmentEditFlag = false;
  FileCategories = FileCategory;

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
        this.showGarageHint = false;
      } else if (value === RoomType.Garage) {
        this.showGarageHint = true;
        this.showOtherRoomType = false;
      } else {
        this.showGarageHint = false;
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

    this.damagedItemsByRoomForm
      .get('addNewFileAttachmentIndicator')
      .valueChanges.subscribe((value) => this.updateFileAttachmentOnVisibility());
    this.fileAttachmentsDataSource.next(
        this.damagedItemsByRoomForm.get('fileAttachments').value
      );
    this.fileAttachmentsData = this.damagedItemsByRoomForm.get('fileAttachments').value;

  }

  calcRemainingChars() {
    this.remainingLength = 2000 - this.damagedItemsByRoomForm.get('description').value?.length;
  }

  addDamagedRoom(): void {
    this.damagedItemsByRoomForm.get('damagedRoom').reset();
    this.damagedItemsByRoomForm.get('damagedRoom.otherRoomType').setValidators(null);
    this.damagedItemsByRoomForm.get('addNewDamagedRoomIndicator').setValue(true);
    this.showOtherRoomType = false;
    this.damagedRoomEditFlag = !this.damagedRoomEditFlag;
    this.showDamagedRoomForm = !this.showDamagedRoomForm;
  }

  saveDamagedRooms(): void {
    if (this.damagedItemsByRoomForm.get('damagedRoom').status === 'VALID') {
      if (this.damagedRoomEditIndex !== undefined && this.damagedRoomRowEdit) {
        this.damagedRoomsData[this.damagedRoomEditIndex] =
          this.damagedItemsByRoomForm.get('damagedRoom').value;
        this.damagedRoomRowEdit = !this.damagedRoomRowEdit;
        this.damagedRoomEditIndex = undefined;
      } else {
        this.damagedRoomsData.push(this.damagedItemsByRoomForm.get('damagedRoom').value);
      }
      this.damagedRoomsDataSource.next(this.damagedRoomsData);
      this.damagedItemsByRoomForm.get('damagedRooms').setValue(this.damagedRoomsData);
      this.showDamagedRoomForm = !this.showDamagedRoomForm;
      this.damagedRoomEditFlag = !this.damagedRoomEditFlag;
    } else {
      this.damagedItemsByRoomForm.get('damagedRoom').markAllAsTouched();
    }
  }

  cancelDamagedRooms(): void {
    this.showDamagedRoomForm = !this.showDamagedRoomForm;
    this.damagedRoomEditFlag = !this.damagedRoomEditFlag;
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
  }

   editDamagedRoomRow(element, index): void {
    this.damagedRoomEditIndex = index;
    this.damagedRoomRowEdit = !this.damagedRoomRowEdit;
    this.damagedItemsByRoomForm.get('damagedRoom').setValue(element);
    this.showDamagedRoomForm = !this.showDamagedRoomForm;
    this.damagedRoomEditFlag = !this.damagedRoomEditFlag;
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

  addFileAttachment(): void {
    this.damagedItemsByRoomForm.get('fileAttachment').reset();
    this.damagedItemsByRoomForm.get('fileAttachment.modifiedBy').setValue("Applicant");
    this.damagedItemsByRoomForm.get('fileAttachment.fileType').setValue(this.FileCategories.DamagePhoto);
    this.showFileAttachmentForm = !this.showFileAttachmentForm;
    this.fileAttachmentEditFlag = !this.fileAttachmentEditFlag;
    this.damagedItemsByRoomForm.get('addNewFileAttachmentIndicator').setValue(true);
  }

  saveFileAttachments(): void {
    if (this.damagedItemsByRoomForm.get('fileAttachment').status === 'VALID') {
      if (this.fileAttachmentEditIndex !== undefined && this.fileAttachmentRowEdit) {
        this.fileAttachmentsData[this.fileAttachmentEditIndex] =
          this.damagedItemsByRoomForm.get('fileAttachment').getRawValue();
        this.fileAttachmentRowEdit = !this.fileAttachmentRowEdit;
        this.fileAttachmentEditIndex = undefined;
      } else {
        this.fileAttachmentsData.push(this.damagedItemsByRoomForm.get('fileAttachment').value);
      }
      this.fileAttachmentsDataSource.next(this.fileAttachmentsData);
      this.damagedItemsByRoomForm.get('fileAttachments').setValue(this.fileAttachmentsData);
      this.showFileAttachmentForm = !this.showFileAttachmentForm;
      this.fileAttachmentEditFlag = !this.fileAttachmentEditFlag;
    } else {
      this.damagedItemsByRoomForm.get('fileAttachment').markAllAsTouched();
    }
  }

  cancelFileAttachments(): void {
    this.showFileAttachmentForm = !this.showFileAttachmentForm;
    this.fileAttachmentEditFlag = !this.fileAttachmentEditFlag;
    this.damagedItemsByRoomForm.get('addNewFileAttachmentIndicator').setValue(false);
  }

  deleteFileAttachmentRow(index: number): void {
    this.fileAttachmentsData.splice(index, 1);
    this.fileAttachmentsDataSource.next(this.fileAttachmentsData);
    this.damagedItemsByRoomForm.get('fileAttachments').setValue(this.fileAttachmentsData);
    if (this.fileAttachmentsData.length === 0) {
      this.damagedItemsByRoomForm
        .get('addNewFileAttachmentIndicator')
        .setValue(false);
    }
  }

   editFileAttachmentRow(element, index): void {
    this.fileAttachmentEditIndex = index;
    this.fileAttachmentRowEdit = !this.fileAttachmentRowEdit;
    this.damagedItemsByRoomForm.get('fileAttachment').setValue(element);
    this.showFileAttachmentForm = !this.showFileAttachmentForm;
    this.fileAttachmentEditFlag = !this.fileAttachmentEditFlag;
    this.damagedItemsByRoomForm.get('addNewFileAttachmentIndicator').setValue(true);
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

  updateFileAttachmentOnVisibility(): void {
    this.damagedItemsByRoomForm
      .get('fileAttachment.fileName')
      .updateValueAndValidity();
    this.damagedItemsByRoomForm
      .get('fileAttachment.fileDescription')
      .updateValueAndValidity();
    this.damagedItemsByRoomForm
      .get('fileAttachment.fileType')
      .updateValueAndValidity();
    this.damagedItemsByRoomForm
      .get('fileAttachment.uploadedDate')
      .updateValueAndValidity();
    this.damagedItemsByRoomForm
      .get('fileAttachment.modifiedBy')
      .updateValueAndValidity();
    this.damagedItemsByRoomForm
      .get('fileAttachment.fileData')
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

/**
 * Reads the attachment content and encodes it as base64
 *
 * @param event : Attachment drop/browse event
 */
  setFileFormControl(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event);
    reader.onload = () => {
      this.damagedItemsByRoomForm.get('fileAttachment.fileName').setValue(event.name);
      this.damagedItemsByRoomForm.get('fileAttachment.fileDescription').setValue(event.name);
      this.damagedItemsByRoomForm.get('fileAttachment.fileData').setValue(reader.result);
      this.damagedItemsByRoomForm.get('fileAttachment.contentType').setValue(event.type);
      this.damagedItemsByRoomForm.get('fileAttachment.fileSize').setValue(event.size);
      this.damagedItemsByRoomForm.get('fileAttachment.uploadedDate').setValue(new Date());
    };
  }
}

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
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
