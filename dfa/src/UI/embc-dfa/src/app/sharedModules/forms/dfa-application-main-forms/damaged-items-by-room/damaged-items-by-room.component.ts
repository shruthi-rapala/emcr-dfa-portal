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
import { distinctUntilChanged, mapTo } from 'rxjs/operators';
import { FileUpload } from 'src/app/core/model/dfa-application-main.model';
import { DamagedRoom, FileCategory, RoomType } from 'src/app/core/api/models';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from 'src/app/core/core.module';
import { DFAApplicationMainService } from 'src/app/feature-components/dfa-application-main/dfa-application-main.service';
import * as constant from 'src/app/core/services/globalConstants'; // referenced in html
import { DFAApplicationMainDataService } from 'src/app/feature-components/dfa-application-main/dfa-application-main-data.service';
import { AttachmentService, DamagedRoomService } from 'src/app/core/api/services';

@Component({
  selector: 'app-damaged-items-by-room',
  templateUrl: './damaged-items-by-room.component.html',
  styleUrls: ['./damaged-items-by-room.component.scss']
})
export default class DamagedItemsByRoomComponent implements OnInit, OnDestroy {
  damagedRoomsForm: UntypedFormGroup;
  formBuilder: UntypedFormBuilder;
  damagedRoomsForm$: Subscription;
  damagePhotosForm: UntypedFormGroup;
  damagePhotosForm$: Subscription;
  formCreationService: FormCreationService;
  RoomTypes = RoomType;
  showOtherRoomType: boolean = false;
  showGarageHint: boolean = false;
  showDamagedRoomForm: boolean = false;
  damagedRoomsColumnsToDisplay = ['roomType', 'description', 'icons'];
  damagedRoomsDataSource = new BehaviorSubject([]);
  damagedRoomsData = [];
  remainingLength: number = 2000;
  damagedRoomEditIndex: number;
  damagedRoomRowEdit = false;
  damagedRoomEditFlag = false;
  showDamagePhotoForm: boolean = false;
  damagePhotosColumnsToDisplay = ['fileName', 'fileDescription', 'uploadedDate', 'icons'];
  damagePhotosDataSource = new MatTableDataSource();
  allowedFileTypes = [
    'application/pdf',
    'image/jpg',
    'image/jpeg',
    'image/png'
  ];
  FileCategories = FileCategory;
  vieworedit: string;

  constructor(
    @Inject('formBuilder') formBuilder: UntypedFormBuilder,
    @Inject('formCreationService') formCreationService: FormCreationService,
    public customValidator: CustomValidationService,
    private dfaApplicationMainService: DFAApplicationMainService,
    private dfaApplicationMainDataService: DFAApplicationMainDataService,
    private damagedRoomService: DamagedRoomService,
    private attachmentsService: AttachmentService
  ) {
    this.formBuilder = formBuilder;
    this.formCreationService = formCreationService;
  }

  ngOnInit(): void {
    this.vieworedit = this.dfaApplicationMainDataService.getViewOrEdit();
    this.damagedRoomsForm$ = this.formCreationService
      .getDamagedRoomsForm()
      .subscribe((damagedRooms) => {
        this.damagedRoomsForm = damagedRooms;
      });

    this.damagePhotosForm$ = this.formCreationService
      .getFileUploadsForm()
      .subscribe(fileUploads => {
        this.damagePhotosForm = fileUploads;
      });

    this.dfaApplicationMainService.deleteDamagePhoto.subscribe((damagePhotoToDelete)=> {
      this.deleteDamagePhotoRow(damagePhotoToDelete);
    })

    this.damagedRoomsForm
    .get('damagedRoom.roomType')
    .valueChanges.pipe(distinctUntilChanged())
    .subscribe((value) => {
      if (value === '') {
        this.damagedRoomsForm.get('damagedRoom.roomType').reset();
        this.damagedRoomsForm.get('damagedRoom.otherRoomType').setValidators([Validators.maxLength(100)]);
        this.showGarageHint = false;
      }
      if (value === RoomType.Other) {
        this.showOtherRoomType = true;
        this.damagedRoomsForm.get('damagedRoom.otherRoomType').setValidators([Validators.required, Validators.maxLength(100)]);
        this.showGarageHint = false;
      } else if (value === RoomType.Garage) {
        this.damagedRoomsForm.get('damagedRoom.otherRoomType').setValidators([Validators.maxLength(100)]);
        this.showGarageHint = true;
        this.showOtherRoomType = false;
      } else {
        this.damagedRoomsForm.get('damagedRoom.otherRoomType').setValidators([Validators.maxLength(100)]);
        this.showGarageHint = false;
        this.showOtherRoomType = false;
      }
      this.damagedRoomsForm.get('damagedRoom').updateValueAndValidity();
    });

    this.damagedRoomsForm
      .get('addNewDamagedRoomIndicator')
      .valueChanges.subscribe((value) => this.updateDamagedRoomOnVisibility());

    this.damagedRoomsForm.get('damagedRoom.otherRoomType').setValidators([Validators.maxLength(100)]);
    this.damagedRoomsForm.get('damagedRoom').updateValueAndValidity();
    this.getDamagedRoomsForApplication(this.dfaApplicationMainDataService.getApplicationId());

    this.damagePhotosForm
      .get('addNewFileUploadIndicator')
      .valueChanges.subscribe((value) => this.updateDamagePhotoOnVisibility());
     const _damagePhotosFormArray = this.formCreationService.fileUploadsForm.value.get('fileUploads');
     _damagePhotosFormArray.valueChanges
       .pipe(
         mapTo(_damagePhotosFormArray.getRawValue())
         ).subscribe(data => this.damagePhotosDataSource.data = _damagePhotosFormArray.getRawValue()?.filter(x => x.fileType ===Object.keys(this.FileCategories)[Object.values(this.FileCategories).indexOf(this.FileCategories.DamagePhoto)] && x.deleteFlag === false));

    this.initDamagePhoto();
  }

  getDamagedRoomsForApplication(applicationId: string) {

    if (applicationId === undefined) {
      applicationId = this.dfaApplicationMainDataService.getApplicationId();
    }

    this.damagedRoomService.damagedRoomGetDamagedRooms({applicationId: applicationId}).subscribe({
      next: (damagedRooms) => {
        this.damagedRoomsData = damagedRooms;
        this.damagedRoomsDataSource.next(this.damagedRoomsData);
        this.damagedRoomsForm.get('damagedRooms').setValue(this.damagedRoomsData);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  calcRemainingChars() {
    this.remainingLength = 2000 - this.damagedRoomsForm.get('description').value?.length;
  }

  addDamagedRoom(): void {
    this.damagedRoomsForm.get('damagedRoom').reset();
    this.damagedRoomsForm.get('damagedRoom.otherRoomType').setValidators([Validators.maxLength(100)]);
    this.damagedRoomsForm.get('addNewDamagedRoomIndicator').setValue(true);
    this.damagedRoomsForm.get('damagedRoom.deleteFlag').setValue(false);
    this.damagedRoomsForm.get('damagedRoom.applicationId').setValue(this.dfaApplicationMainDataService.getApplicationId());
    this.damagedRoomsForm.get('damagedRoom').updateValueAndValidity();
    this.showOtherRoomType = false;
    this.damagedRoomEditFlag = !this.damagedRoomEditFlag;
    this.showDamagedRoomForm = !this.showDamagedRoomForm;
  }

  saveDamagedRooms(): void {
    if (this.damagedRoomsForm.get('damagedRoom').status === 'VALID') {
      if (this.damagedRoomEditIndex !== undefined && this.damagedRoomRowEdit) {
        this.damagedRoomService.damagedRoomUpsertDeleteDamagedRoom({body: this.damagedRoomsForm.get('damagedRoom').getRawValue() }).subscribe({
         next: (result) => {
            this.damagedRoomsData[this.damagedRoomEditIndex] = this.damagedRoomsForm.get('damagedRoom').value;
            this.damagedRoomRowEdit = !this.damagedRoomRowEdit;
            this.damagedRoomEditIndex = undefined;
             },
         error: (error) => {
           console.error(error);
         }
       });
      } else {
       this.damagedRoomService.damagedRoomUpsertDeleteDamagedRoom({body: this.damagedRoomsForm.get('damagedRoom').getRawValue()}).subscribe({
         next: (damagedRoomId) => {
           this.damagedRoomsForm.get('damagedRoom').get('id').setValue(damagedRoomId);
           this.damagedRoomsData.push(this.damagedRoomsForm.get('damagedRoom').value);
         },
         error: (error) => {
           console.error(error);
         }
       });
      }
      this.damagedRoomsDataSource.next(this.damagedRoomsData);
      this.damagedRoomsForm.get('damagedRooms').setValue(this.damagedRoomsData);
      this.showDamagedRoomForm = !this.showDamagedRoomForm;
      this.damagedRoomEditFlag = !this.damagedRoomEditFlag;
    } else {
      this.damagedRoomsForm.get('damagedRoom').markAllAsTouched();
    }
  }

  cancelDamagedRooms(): void {
    this.showDamagedRoomForm = !this.showDamagedRoomForm;
    this.damagedRoomEditFlag = !this.damagedRoomEditFlag;
    this.damagedRoomsForm.get('addNewDamagedRoomIndicator').setValue(false);
  }

  deleteDamagedRoomRow(index: number): void {
    this.damagedRoomsData[index].deleteFlag = true;
    this.damagedRoomService.damagedRoomUpsertDeleteDamagedRoom({body: this.damagedRoomsData[index]}).subscribe({
      next: (result) => {
        this.damagedRoomsData.splice(index, 1);
        this.damagedRoomsDataSource.next(this.damagedRoomsData);
        this.damagedRoomsForm.get('damagedRooms').setValue(this.damagedRoomsData);
        if (this.damagedRoomsData.length === 0) {
          this.damagedRoomsForm
            .get('addNewDamagedRoomIndicator')
            .setValue(false);
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

   editDamagedRoomRow(element, index): void {
    this.damagedRoomEditIndex = index;
    this.damagedRoomRowEdit = !this.damagedRoomRowEdit;
    this.damagedRoomsForm.get('damagedRoom').setValue(element);
    this.showDamagedRoomForm = !this.showDamagedRoomForm;
    this.damagedRoomEditFlag = !this.damagedRoomEditFlag;
    this.damagedRoomsForm.get('addNewDamagedRoomIndicator').setValue(true);
  }

  // Preserve original property order
  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }

  onSelectRoomType(roomType: RoomType) {
    this.damagedRoomsForm.get('damagedRoom').updateValueAndValidity();
    if (roomType === this.RoomTypes.Other) {
      this.damagedRoomsForm.get('damagedRoom.otherRoomType').setValidators([Validators.required, Validators.maxLength(100)]);
    } else {
      this.damagedRoomsForm.get('damagedRoom.otherRoomType').setValidators([Validators.maxLength(100)]);
    }
    this.damagedRoomsForm.get('damagedRoom').updateValueAndValidity();
  }

  initDamagePhoto(): void {
    this.damagePhotosForm.get('damagePhotoFileUpload').reset();
    this.damagePhotosForm.get('damagePhotoFileUpload.modifiedBy').setValue("Applicant");
    this.damagePhotosForm.get('damagePhotoFileUpload.fileType').setValue(Object.keys(this.FileCategories)[Object.values(this.FileCategories).indexOf(this.FileCategories.DamagePhoto)]);
    this.showDamagePhotoForm = !this.showDamagePhotoForm;
    this.damagePhotosForm.get('addNewFileUploadIndicator').setValue(true);
    this.damagePhotosForm.get('damagePhotoFileUpload.deleteFlag').setValue(false);
    this.damagePhotosForm.get('damagePhotoFileUpload.applicationId').setValue(this.dfaApplicationMainDataService.getApplicationId());
  }

  saveDamagePhotos(fileUpload: FileUpload): void {
    if (this.damagePhotosForm.get('damagePhotoFileUpload').status === 'VALID') {
      let fileUploads = this.formCreationService.fileUploadsForm.value.get('fileUploads').value;
      this.attachmentsService.attachmentUpsertDeleteAttachment({body: fileUpload }).subscribe({
        next: (fileUploadId) => {
          fileUpload.id = fileUploadId;
          if (fileUploads) fileUploads.push(fileUpload);
          else fileUploads = [ fileUpload ];
          this.formCreationService.fileUploadsForm.value.get('fileUploads').setValue(fileUploads);
          this.showDamagePhotoForm = !this.showDamagePhotoForm;
          this.damagePhotosForm.get('addNewFileUploadIndicator').setValue(false);
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      this.damagePhotosForm.get('damagePhotoFileUpload').markAllAsTouched();
    }
  }

  cancelDamagePhotos(): void {
    this.showDamagePhotoForm = !this.showDamagePhotoForm;
    this.damagePhotosForm.get('addNewFileUploadIndicator').setValue(false);
  }

  deleteDamagePhotoRow(element): void {
    let fileUploads = this.formCreationService.fileUploadsForm.value.get('fileUploads').value;
    let index = fileUploads.indexOf(element);
    element.deleteFlag = true;
    this.attachmentsService.attachmentUpsertDeleteAttachment({body: element}).subscribe({
      next: (result) => {
        fileUploads[index] = element;
        this.formCreationService.fileUploadsForm.value.get('fileUploads').setValue(fileUploads);
        if (this.formCreationService.fileUploadsForm.value.get('fileUploads').value.length === 0) {
          this.damagePhotosForm
              .get('addNewFileUploadIndicator')
              .setValue(false);
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  updateDamagedRoomOnVisibility(): void {
    this.damagedRoomsForm
      .get('damagedRoom.roomType')
      .updateValueAndValidity();
    this.damagedRoomsForm
      .get('damagedRoom.otherRoomType')
      .updateValueAndValidity();
    this.damagedRoomsForm
      .get('damagedRoom.description')
      .updateValueAndValidity();
  }

  updateDamagePhotoOnVisibility(): void {
    this.damagePhotosForm
      .get('damagePhotoFileUpload.fileName')
      .updateValueAndValidity();
    this.damagePhotosForm
      .get('damagePhotoFileUpload.fileDescription')
      .updateValueAndValidity();
    this.damagePhotosForm
      .get('damagePhotoFileUpload.fileType')
      .updateValueAndValidity();
    this.damagePhotosForm
      .get('damagePhotoFileUpload.uploadedDate')
      .updateValueAndValidity();
    this.damagePhotosForm
      .get('damagePhotoFileUpload.modifiedBy')
      .updateValueAndValidity();
    this.damagePhotosForm
      .get('damagePhotoFileUpload.fileData')
      .updateValueAndValidity();
  }

  /**
   * Returns the control of the form
   */
  get damagedRoomsFormControl(): { [key: string]: AbstractControl } {
    return this.damagedRoomsForm.controls;
  }

  updateOnVisibility(): void {
    this.damagedRoomsForm.get('field').updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.damagedRoomsForm$.unsubscribe();
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
