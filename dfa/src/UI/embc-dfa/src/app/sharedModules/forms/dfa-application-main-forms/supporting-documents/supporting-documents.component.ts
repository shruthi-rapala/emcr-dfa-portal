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
  selector: 'app-supporting-documents',
  templateUrl: './supporting-documents.component.html',
  styleUrls: ['./supporting-documents.component.scss']
})
export default class SupportingDocumentsComponent implements OnInit, OnDestroy {
  supportingDocumentsForm: UntypedFormGroup;
  formBuilder: UntypedFormBuilder;
  supportingDocumentsForm$: Subscription;
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
    this.supportingDocumentsForm$ = this.formCreationService
      .getSupportingDocumentsForm()
      .subscribe((supportingDocuments) => {
        this.supportingDocumentsForm = supportingDocuments;
      });


    this.supportingDocumentsForm
    .get('damagedRoom.roomType')
    .valueChanges.pipe(distinctUntilChanged())
    .subscribe((value) => {
      if (value === '') {
        this.supportingDocumentsForm.get('damagedRoom.roomType').reset();
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

    this.supportingDocumentsForm
      .get('addNewDamagedRoomIndicator')
      .valueChanges.subscribe((value) => this.updateDamagedRoomOnVisibility());
    this.supportingDocumentsForm.get('damagedRoom.otherRoomType').setValidators(null);
    this.damagedRoomsDataSource.next(
        this.supportingDocumentsForm.get('damagedRooms').value
      );
    this.damagedRoomsData = this.supportingDocumentsForm.get('damagedRooms').value;

    this.supportingDocumentsForm
      .get('addNewFileAttachmentIndicator')
      .valueChanges.subscribe((value) => this.updateFileAttachmentOnVisibility());
    this.fileAttachmentsDataSource.next(
        this.supportingDocumentsForm.get('fileAttachments').value
      );
    this.fileAttachmentsData = this.supportingDocumentsForm.get('fileAttachments').value;

  }

  calcRemainingChars() {
    this.remainingLength = 2000 - this.supportingDocumentsForm.get('description').value?.length;
  }

  addDamagedRoom(): void {
    this.supportingDocumentsForm.get('damagedRoom').reset();
    this.supportingDocumentsForm.get('damagedRoom.otherRoomType').setValidators(null);
    this.supportingDocumentsForm.get('addNewDamagedRoomIndicator').setValue(true);
    this.showOtherRoomType = false;
    this.damagedRoomEditFlag = !this.damagedRoomEditFlag;
    this.showDamagedRoomForm = !this.showDamagedRoomForm;
  }

  saveDamagedRooms(): void {
    if (this.supportingDocumentsForm.get('damagedRoom').status === 'VALID') {
      if (this.damagedRoomEditIndex !== undefined && this.damagedRoomRowEdit) {
        this.damagedRoomsData[this.damagedRoomEditIndex] =
          this.supportingDocumentsForm.get('damagedRoom').value;
        this.damagedRoomRowEdit = !this.damagedRoomRowEdit;
        this.damagedRoomEditIndex = undefined;
      } else {
        this.damagedRoomsData.push(this.supportingDocumentsForm.get('damagedRoom').value);
      }
      this.damagedRoomsDataSource.next(this.damagedRoomsData);
      this.supportingDocumentsForm.get('damagedRooms').setValue(this.damagedRoomsData);
      this.showDamagedRoomForm = !this.showDamagedRoomForm;
      this.damagedRoomEditFlag = !this.damagedRoomEditFlag;
    } else {
      this.supportingDocumentsForm.get('damagedRoom').markAllAsTouched();
    }
  }

  cancelDamagedRooms(): void {
    this.showDamagedRoomForm = !this.showDamagedRoomForm;
    this.damagedRoomEditFlag = !this.damagedRoomEditFlag;
    this.supportingDocumentsForm.get('addNewDamagedRoomIndicator').setValue(false);
  }

  deleteDamagedRoomRow(index: number): void {
    this.damagedRoomsData.splice(index, 1);
    this.damagedRoomsDataSource.next(this.damagedRoomsData);
    this.supportingDocumentsForm.get('damagedRooms').setValue(this.damagedRoomsData);
    if (this.damagedRoomsData.length === 0) {
      this.supportingDocumentsForm
        .get('addNewDamagedRoomIndicator')
        .setValue(false);
    }
  }

   editDamagedRoomRow(element, index): void {
    this.damagedRoomEditIndex = index;
    this.damagedRoomRowEdit = !this.damagedRoomRowEdit;
    this.supportingDocumentsForm.get('damagedRoom').setValue(element);
    this.showDamagedRoomForm = !this.showDamagedRoomForm;
    this.damagedRoomEditFlag = !this.damagedRoomEditFlag;
    this.supportingDocumentsForm.get('addNewDamagedRoomIndicator').setValue(true);
  }

  // Preserve original property order
  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }

  onSelectRoomType(roomType: RoomType) {
    if (roomType === this.RoomTypes.Other) {
      this.supportingDocumentsForm.get('damagedRoom.otherRoomType').setValidators([Validators.required]);
    } else {
      this.supportingDocumentsForm.get('damagedRoom.otherRoomType').setValidators(null);
    }
  }

  addFileAttachment(): void {
    this.supportingDocumentsForm.get('fileAttachment').reset();
    this.supportingDocumentsForm.get('fileAttachment.modifiedBy').setValue("Applicant");
    this.supportingDocumentsForm.get('fileAttachment.fileType').setValue(this.FileCategories.DamagePhoto);
    this.showFileAttachmentForm = !this.showFileAttachmentForm;
    this.fileAttachmentEditFlag = !this.fileAttachmentEditFlag;
    this.supportingDocumentsForm.get('addNewFileAttachmentIndicator').setValue(true);
  }

  saveFileAttachments(): void {
    if (this.supportingDocumentsForm.get('fileAttachment').status === 'VALID') {
      if (this.fileAttachmentEditIndex !== undefined && this.fileAttachmentRowEdit) {
        this.fileAttachmentsData[this.fileAttachmentEditIndex] =
          this.supportingDocumentsForm.get('fileAttachment').getRawValue();
        this.fileAttachmentRowEdit = !this.fileAttachmentRowEdit;
        this.fileAttachmentEditIndex = undefined;
      } else {
        this.fileAttachmentsData.push(this.supportingDocumentsForm.get('fileAttachment').value);
      }
      this.fileAttachmentsDataSource.next(this.fileAttachmentsData);
      this.supportingDocumentsForm.get('fileAttachments').setValue(this.fileAttachmentsData);
      this.showFileAttachmentForm = !this.showFileAttachmentForm;
      this.fileAttachmentEditFlag = !this.fileAttachmentEditFlag;
    } else {
      this.supportingDocumentsForm.get('fileAttachment').markAllAsTouched();
    }
  }

  cancelFileAttachments(): void {
    this.showFileAttachmentForm = !this.showFileAttachmentForm;
    this.fileAttachmentEditFlag = !this.fileAttachmentEditFlag;
    this.supportingDocumentsForm.get('addNewFileAttachmentIndicator').setValue(false);
  }

  deleteFileAttachmentRow(index: number): void {
    this.fileAttachmentsData.splice(index, 1);
    this.fileAttachmentsDataSource.next(this.fileAttachmentsData);
    this.supportingDocumentsForm.get('fileAttachments').setValue(this.fileAttachmentsData);
    if (this.fileAttachmentsData.length === 0) {
      this.supportingDocumentsForm
        .get('addNewFileAttachmentIndicator')
        .setValue(false);
    }
  }

   editFileAttachmentRow(element, index): void {
    this.fileAttachmentEditIndex = index;
    this.fileAttachmentRowEdit = !this.fileAttachmentRowEdit;
    this.supportingDocumentsForm.get('fileAttachment').setValue(element);
    this.showFileAttachmentForm = !this.showFileAttachmentForm;
    this.fileAttachmentEditFlag = !this.fileAttachmentEditFlag;
    this.supportingDocumentsForm.get('addNewFileAttachmentIndicator').setValue(true);
  }

  updateDamagedRoomOnVisibility(): void {
    this.supportingDocumentsForm
      .get('damagedRoom.roomType')
      .updateValueAndValidity();
    this.supportingDocumentsForm
      .get('damagedRoom.otherRoomType')
      .updateValueAndValidity();
    this.supportingDocumentsForm
      .get('damagedRoom.description')
      .updateValueAndValidity();
  }

  updateFileAttachmentOnVisibility(): void {
    this.supportingDocumentsForm
      .get('fileAttachment.fileName')
      .updateValueAndValidity();
    this.supportingDocumentsForm
      .get('fileAttachment.fileDescription')
      .updateValueAndValidity();
    this.supportingDocumentsForm
      .get('fileAttachment.fileType')
      .updateValueAndValidity();
    this.supportingDocumentsForm
      .get('fileAttachment.uploadedDate')
      .updateValueAndValidity();
    this.supportingDocumentsForm
      .get('fileAttachment.modifiedBy')
      .updateValueAndValidity();
    this.supportingDocumentsForm
      .get('fileAttachment.fileData')
      .updateValueAndValidity();
  }

  /**
   * Returns the control of the form
   */
  get supportingDocumentsFormControl(): { [key: string]: AbstractControl } {
    return this.supportingDocumentsForm.controls;
  }

  updateOnVisibility(): void {
    this.supportingDocumentsForm.get('field').updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.supportingDocumentsForm$.unsubscribe();
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
      this.supportingDocumentsForm.get('fileAttachment.fileName').setValue(event.name);
      this.supportingDocumentsForm.get('fileAttachment.fileDescription').setValue(event.name);
      this.supportingDocumentsForm.get('fileAttachment.fileData').setValue(reader.result);
      this.supportingDocumentsForm.get('fileAttachment.contentType').setValue(event.type);
      this.supportingDocumentsForm.get('fileAttachment.fileSize').setValue(event.size);
      this.supportingDocumentsForm.get('fileAttachment.uploadedDate').setValue(new Date());
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
  declarations: [SupportingDocumentsComponent]
})
class SupportingDocumentsModule {}
