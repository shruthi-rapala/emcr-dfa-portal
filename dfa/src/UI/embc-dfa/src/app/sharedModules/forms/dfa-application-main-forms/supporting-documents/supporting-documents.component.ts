import { Component, OnInit, NgModule, Inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  AbstractControl,
  Validators,
  FormsModule,
  FormGroup,
} from '@angular/forms';
import { CommonModule, KeyValue } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormCreationService } from 'src/app/core/services/formCreation.service';
import { BehaviorSubject, Subscription, mapTo } from 'rxjs';
import { DirectivesModule } from '../../../../core/directives/directives.module';
import { CustomValidationService } from 'src/app/core/services/customValidation.service';
import { FileCategory, SupportStatus } from 'src/app/core/api/models';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from 'src/app/core/core.module';
import { DFAApplicationMainService } from 'src/app/feature-components/dfa-application-main/dfa-application-main.service';
import { DFAApplicationMainDataService } from 'src/app/feature-components/dfa-application-main/dfa-application-main-data.service';

@Component({
  selector: 'app-supporting-documents',
  templateUrl: './supporting-documents.component.html',
  styleUrls: ['./supporting-documents.component.scss']
})
export default class SupportingDocumentsComponent implements OnInit, OnDestroy {
  insuranceTemplateForm: UntypedFormGroup;
  insuranceTemplateForm$: Subscription;
  insuranceTemplateData = [];
  insuranceTemplateDataSource = new BehaviorSubject([]);
  supportingDocumentsForm: UntypedFormGroup;
  formBuilder: UntypedFormBuilder;
  supportingDocumentsForm$: Subscription;
  supportingFilesForm: UntypedFormGroup;
  supportingFilesForm$: Subscription;
  formCreationService: FormCreationService;
  showSupportingFileForm: boolean = false;
  supportingFilesDataSource = new BehaviorSubject([]);
  supportingFilesData = [];
  documentSummaryColumnsToDisplay = [ 'fileName', 'fileDescription', 'fileType', 'uploadedDate', 'icons']
  documentSummaryDataSource = new BehaviorSubject([]);
  documentSummaryData = [];
  damagePhotosDataSource = new MatTableDataSource();
  cleanUpWorkFileDataSource = new MatTableDataSource();
  allowedFileTypes = [
    'application/pdf',
    'image/jpg',
    'image/jpeg',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];
  FileCategories = FileCategory;

  constructor(
    @Inject('formBuilder') formBuilder: UntypedFormBuilder,
    @Inject('formCreationService') formCreationService: FormCreationService,
    public customValidator: CustomValidationService,
    private dfaApplicationMainService: DFAApplicationMainService,
    private dfaApplicationMainDataService: DFAApplicationMainDataService
  ) {
    this.formBuilder = formBuilder;
    this.formCreationService = formCreationService;
  }

  ngOnInit(): void {
    this.supportingDocumentsForm$ = this.formCreationService
      .getFileUploadsForm()
      .subscribe((fileUploads) => {
        this.supportingFilesForm = fileUploads;
      });

    this.supportingFilesForm$ = this.formCreationService
      .getSupportingDocumentsForm()
      .subscribe((supportingDocuments) => {
        this.supportingDocumentsForm = supportingDocuments;
      });

    this.supportingFilesData = this.supportingFilesForm.get('fileUploads').value;
    this.supportingFilesForm$ = this.formCreationService
      .getFileUploadsForm()
      .subscribe((fileUploads) => {
        this.supportingFilesForm = fileUploads;
      });

    this.supportingFilesForm$ = this.formCreationService
      .getFileUploadsForm()
      .subscribe((fileUploads) => {
        this.supportingFilesForm = fileUploads;
      });

    this.supportingFilesForm
      .get('addNewFileUploadIndicator')
      .valueChanges.subscribe((value) => this.updateSupportingFilesOnVisibility());
    this.supportingFilesDataSource.next(
        this.supportingFilesForm.get('fileUploads').value
      );
    this.supportingFilesData = this.supportingFilesForm.get('fileUploads').value;

    // Initialize the insurance template
    this.insuranceTemplateForm$ = this.formCreationService
    .getFileUploadsForm()
    .subscribe((fileUploads) => {
      this.insuranceTemplateForm = fileUploads;
      this.insuranceTemplateForm.addValidators([this.validateFormInsuranceTemplate]);
    });

    this.insuranceTemplateForm
      .get('addNewFileUploadIndicator')
      .valueChanges.subscribe((value) => this.updateInsuranceTemplateOnVisibility());
    this.insuranceTemplateDataSource.next(
        this.insuranceTemplateForm.get('fileUploads').value
      );
    this.insuranceTemplateData = this.insuranceTemplateForm.get('fileUploads').value;

    this.insuranceTemplateForm.get('fileUpload').reset();
    this.insuranceTemplateForm.get('fileUpload.modifiedBy').setValue("Applicant");
    this.insuranceTemplateForm.get('fileUpload.fileType').setValue(FileCategory.Insurance);
    this.insuranceTemplateForm.get('addNewFileUploadIndicator').setValue(true);
    this.insuranceTemplateForm.get('fileUpload.deleteFlag').setValue(false);
    this.insuranceTemplateForm.get('fileUpload.applicationId').setValue(this.dfaApplicationMainDataService.dfaApplicationStart.id);

    // subscribe to changes in receipts and invocies
    const _cleanUpWorkFileFormArray = this.formCreationService.fileUploadsForm.value.get('fileUploads');
    _cleanUpWorkFileFormArray.valueChanges
      .pipe(
        mapTo(_cleanUpWorkFileFormArray.getRawValue().filter(x => x.fileType == FileCategory.Cleanup))
        ).subscribe(data => {this.cleanUpWorkFileDataSource.data = data; this.updateDocumentSummary();});

    // subscribe to changes in damage photos
    const _damagePhotoFormArray = this.formCreationService.fileUploadsForm.value.get('fileUploads');
    _damagePhotoFormArray.valueChanges
      .pipe(
        mapTo(_damagePhotoFormArray.getRawValue().filter(x => x.fileType == FileCategory.DamagePhoto))
        ).subscribe(data => {this.damagePhotosDataSource.data = data; this.updateDocumentSummary();});
  }

  // Preserve original property order
  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }

  validateFormInsuranceTemplate(form: FormGroup) {
    let FileCategories = FileCategory;

    let supportingFiles = form.get('fileUploads').getRawValue();
    if (supportingFiles.filter(x => x.fileType === FileCategories.Insurance).length <= 0) {
      return { noInsuranceTemplate: true };
    }
    return null;
  }

  updateDocumentSummary(): void {
    while (this.documentSummaryData.length) this.documentSummaryData.pop();
    this.supportingFilesData.forEach(x => this.documentSummaryData.push(x));
    this.damagePhotosDataSource.data.forEach(x => this.documentSummaryData.push(x));
    this.cleanUpWorkFileDataSource.data.forEach(x => this.documentSummaryData.push(x));
    this.documentSummaryDataSource.next(this.documentSummaryData);
  }

  addSupportingFile(): void {
    this.supportingFilesForm.get('fileUpload').reset();
    this.supportingFilesForm.get('fileUpload.modifiedBy').setValue("Applicant");
    this.showSupportingFileForm = !this.showSupportingFileForm;
    this.supportingFilesForm.get('addNewFileUploadIndicator').setValue(true);
    this.supportingFilesForm.get('fileUpload.deleteFlag').setValue(false);
    this.supportingFilesForm.get('fileUpload.applicationId').setValue(this.dfaApplicationMainDataService.dfaApplicationStart.id);
  }

  saveSupportingFiles(): void {
    if (this.supportingFilesForm.get('fileUpload').status === 'VALID') {
      this.supportingFilesData.push(this.supportingFilesForm.get('fileUpload').value);
      this.supportingFilesDataSource.next(this.supportingFilesData);
      this.supportingFilesForm.get('fileUploads').setValue(this.supportingFilesData);
      this.showSupportingFileForm = !this.showSupportingFileForm;
      this.updateDocumentSummary();
    } else {
      this.supportingFilesForm.get('fileUpload').markAllAsTouched();
    }
  }

  saveInsuranceTemplate(): void {
    if (this.insuranceTemplateForm.get('fileUpload').status === 'VALID') {
      if (this.insuranceTemplateData.filter(x => x.fileType === this.FileCategories.Insurance).length > 0) {
        let insuranceFoundIndex = this.supportingFilesData.findIndex(x => x.fileType === this.FileCategories.Insurance);
        this.supportingFilesData[insuranceFoundIndex] = this.insuranceTemplateForm.get('fileUpload').getRawValue();
      } else {
        this.supportingFilesData.push(this.insuranceTemplateForm.get('fileUpload').value);
      }
      this.supportingFilesDataSource.next(this.supportingFilesData);
      this.supportingFilesForm.get('fileUploads').setValue(this.supportingFilesData);
      this.updateDocumentSummary();
    } else {
      this.insuranceTemplateForm.get('fileUpload').markAllAsTouched();
    }
  }

  cancelSupportingFiles(): void {
    this.showSupportingFileForm = !this.showSupportingFileForm;
    this.supportingFilesForm.get('addNewFileUploadIndicator').setValue(false);
  }

  deleteDocumentSummaryRow(index: number): void {
    if (this.documentSummaryData[index].fileType === this.FileCategories.Insurance) {
      this.insuranceTemplateForm.get('fileUpload').reset();
      this.insuranceTemplateForm.get('addNewFileUploadIndicator').setValue(false);
      this.insuranceTemplateForm.get('fileUpload.modifiedBy').setValue("Applicant");
      this.insuranceTemplateForm.get('fileUpload.fileType').setValue(FileCategory.Insurance);
      this.insuranceTemplateForm.get('addNewFileUploadIndicator').setValue(true);
      let supportingFilesIndex = this.supportingFilesData.indexOf(this.documentSummaryData[index]);
      this.supportingFilesData.splice(supportingFilesIndex, 1);
      this.supportingFilesDataSource.next(this.supportingFilesData);
      this.supportingFilesForm.get('fileUploads').setValue(this.supportingFilesData);
      if (this.supportingFilesData.length === 0) {
        this.supportingFilesForm
          .get('addNewFileUploadIndicator')
          .setValue(false);
      }
    } else if (this.documentSummaryData[index].fileType === this.FileCategories.DamagePhoto) {
      this.dfaApplicationMainService.deleteDamagePhoto.emit(this.documentSummaryData[index]);
    } else if (this.documentSummaryData[index].fileType === this.FileCategories.Cleanup) {
      this.dfaApplicationMainService.deleteCleanupLog.emit(this.documentSummaryData[index]);
    } else {
      let supportingFilesIndex = this.supportingFilesData.indexOf(this.documentSummaryData[index]);
      this.supportingFilesData.splice(supportingFilesIndex, 1);
      this.supportingFilesDataSource.next(this.supportingFilesData);
      this.supportingFilesForm.get('fileUploads').setValue(this.supportingFilesData);
      if (this.supportingFilesData.length === 0) {
        this.supportingFilesForm
          .get('addNewFileUploadIndicator')
          .setValue(false);
      }
    }
    this.updateDocumentSummary();
  }

 updateSupportingFilesOnVisibility(): void {
    this.supportingFilesForm
      .get('fileUpload.fileName')
      .updateValueAndValidity();
    this.supportingFilesForm
      .get('fileUpload.fileDescription')
      .updateValueAndValidity();
    this.supportingFilesForm
      .get('fileUpload.fileType')
      .updateValueAndValidity();
    this.supportingFilesForm
      .get('fileUpload.uploadedDate')
      .updateValueAndValidity();
    this.supportingFilesForm
      .get('fileUpload.modifiedBy')
      .updateValueAndValidity();
    this.supportingFilesForm
      .get('fileUpload.fileData')
      .updateValueAndValidity();
  }

  updateInsuranceTemplateOnVisibility(): void {
    this.insuranceTemplateForm
      .get('fileUpload.fileName')
      .updateValueAndValidity();
    this.insuranceTemplateForm
      .get('fileUpload.fileDescription')
      .updateValueAndValidity();
    this.insuranceTemplateForm
      .get('fileUpload.fileType')
      .updateValueAndValidity();
    this.insuranceTemplateForm
      .get('fileUpload.uploadedDate')
      .updateValueAndValidity();
    this.insuranceTemplateForm
      .get('fileUpload.modifiedBy')
      .updateValueAndValidity();
    this.insuranceTemplateForm
      .get('fileUpload.fileData')
      .updateValueAndValidity();
  }

  /**
   * Returns the control of the form
   */
  get supportingFilesFormControl(): { [key: string]: AbstractControl } {
    return this.supportingFilesForm.controls;
  }
  get insuranceTemplateFormControl(): { [key: string]: AbstractControl } {
    return this.insuranceTemplateForm.controls;
  }

  updateOnVisibility(): void {
    this.supportingFilesForm.get('field').updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.supportingDocumentsForm$.unsubscribe();
    this.supportingFilesForm$.unsubscribe();
    this.insuranceTemplateForm$.unsubscribe();
  }

/**
 * Reads the attachment content and encodes it as base64
 *
 * @param event : Attachment drop/browse event
 */
  setSupportingFileFormControl(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event);
    reader.onload = () => {
      this.supportingFilesForm.get('fileUpload.fileName').setValue(event.name);
      this.supportingFilesForm.get('fileUpload.fileDescription').setValue(event.name);
      this.supportingFilesForm.get('fileUpload.fileData').setValue(reader.result);
      this.supportingFilesForm.get('fileUpload.contentType').setValue(event.type);
      this.supportingFilesForm.get('fileUpload.fileSize').setValue(event.size);
      this.supportingFilesForm.get('fileUpload.uploadedDate').setValue(new Date());
    };
  }

  /**
   * Reads the attachment content and encodes it as base64
  *
  * @param event : Attachment drop/browse event
  */
  setInsuranceTemplateFileFormControl(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event);
    reader.onload = () => {
      this.insuranceTemplateForm.get('fileUpload.fileName').setValue(event.name);
      this.insuranceTemplateForm.get('fileUpload.fileDescription').setValue(event.name);
      this.insuranceTemplateForm.get('fileUpload.fileData').setValue(reader.result);
      this.insuranceTemplateForm.get('fileUpload.contentType').setValue(event.type);
      this.insuranceTemplateForm.get('fileUpload.fileSize').setValue(event.size);
      this.insuranceTemplateForm.get('fileUpload.uploadedDate').setValue(new Date());
    };
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    DirectivesModule,
  ],
  declarations: [SupportingDocumentsComponent]
})
class SupportingDocumentsModule {}
