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
import { FileCategory } from 'src/app/core/model/dfa-application-main.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from 'src/app/core/core.module';
import { DFAApplicationMainService } from 'src/app/feature-components/dfa-application-main/dfa-application-main.service';

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
  showSupportingDocumentForm: boolean = false;
  supportingDocumentsDataSource = new BehaviorSubject([]);
  supportingDocumentsData = [];
  documentSummaryColumnsToDisplay = [ 'fileName', 'fileDescription', 'fileType', 'uploadedDate', 'icons']
  documentSummaryDataSource = new BehaviorSubject([]);
  documentSummaryData = [];
  damagePhotoDataSource = new MatTableDataSource();
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
    private dfaApplicationMainService: DFAApplicationMainService
  ) {
    this.formBuilder = formBuilder;
    this.formCreationService = formCreationService;
  }

  ngOnInit(): void {
    this.supportingDocumentsForm$ = this.formCreationService
      .getSupportingDocumentsForm()
      .subscribe((supportingDocuments) => {
        this.supportingDocumentsForm = supportingDocuments;
        this.supportingDocumentsForm.addValidators([this.validateFormInsuranceTemplate]);
      });

    this.supportingDocumentsForm
      .get('addNewSupportingDocumentIndicator')
      .valueChanges.subscribe((value) => this.updateSupportingDocumentOnVisibility());
    this.supportingDocumentsDataSource.next(
        this.supportingDocumentsForm.get('supportingDocuments').value
      );
    this.supportingDocumentsData = this.supportingDocumentsForm.get('supportingDocuments').value;

    // Initialize the inusrance template
    this.supportingDocumentsForm.get('insuranceTemplate').reset();
    this.supportingDocumentsForm.get('insuranceTemplate.modifiedBy').setValue("Applicant");
    this.supportingDocumentsForm.get('insuranceTemplate.fileType').setValue(FileCategory.Insurance);
    this.supportingDocumentsForm.get('addNewInsuranceTemplateIndicator').setValue(true);

    // subscribe to changes in receipts and invocies
    const _cleanUpWorkFileFormArray = this.formCreationService.cleanUpLogForm.value.get('cleanuplogFiles');
    _cleanUpWorkFileFormArray.valueChanges
      .pipe(
        mapTo(_cleanUpWorkFileFormArray.getRawValue())
        ).subscribe(data => {this.cleanUpWorkFileDataSource.data = data; this.updateDocumentSummary();});

    // subscribe to changes in damage photos
    const _damagePhotoFormArray = this.formCreationService.damagedItemsByRoomForm.value.get('damagePhotos');
    _damagePhotoFormArray.valueChanges
      .pipe(
        mapTo(_damagePhotoFormArray.getRawValue())
        ).subscribe(data => {this.damagePhotoDataSource.data = data; this.updateDocumentSummary();});
  }

  // Preserve original property order
  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }

  validateFormInsuranceTemplate(form: FormGroup) {
    let FileCategories = FileCategory;

    let supportingDocuments = form.get('supportingDocuments').getRawValue();
    if (supportingDocuments.filter(x => x.fileType === FileCategories.Insurance).length <= 0) {
      return { noInsuranceTemplate: true };
    }
    return null;
  }

  updateDocumentSummary(): void {
    while (this.documentSummaryData.length) this.documentSummaryData.pop();
    this.supportingDocumentsData.forEach(x => this.documentSummaryData.push(x));
    this.damagePhotoDataSource.data.forEach(x => this.documentSummaryData.push(x));
    this.cleanUpWorkFileDataSource.data.forEach(x => this.documentSummaryData.push(x));
    this.documentSummaryDataSource.next(this.documentSummaryData);
  }

  addSupportingDocument(): void {
    this.supportingDocumentsForm.get('supportingDocument').reset();
    this.supportingDocumentsForm.get('supportingDocument.modifiedBy').setValue("Applicant");
    this.showSupportingDocumentForm = !this.showSupportingDocumentForm;
    this.supportingDocumentsForm.get('addNewSupportingDocumentIndicator').setValue(true);
  }

  saveSupportingDocuments(): void {
    if (this.supportingDocumentsForm.get('supportingDocument').status === 'VALID') {
      this.supportingDocumentsData.push(this.supportingDocumentsForm.get('supportingDocument').value);
      this.supportingDocumentsDataSource.next(this.supportingDocumentsData);
      this.supportingDocumentsForm.get('supportingDocuments').setValue(this.supportingDocumentsData);
      this.showSupportingDocumentForm = !this.showSupportingDocumentForm;
      this.updateDocumentSummary();
    } else {
      this.supportingDocumentsForm.get('supportingDocument').markAllAsTouched();
    }
  }

  saveInsuranceTemplate(): void {
    if (this.supportingDocumentsForm.get('insuranceTemplate').status === 'VALID') {
      if (this.supportingDocumentsData.filter(x => x.fileType === this.FileCategories.Insurance).length > 0) {
        let insuranceFoundIndex = this.supportingDocumentsData.findIndex(x => x.fileType === this.FileCategories.Insurance);
        this.supportingDocumentsData[insuranceFoundIndex] = this.supportingDocumentsForm.get('insuranceTemplate').getRawValue();
      } else {
        this.supportingDocumentsData.push(this.supportingDocumentsForm.get('insuranceTemplate').value);
      }
      this.supportingDocumentsDataSource.next(this.supportingDocumentsData);
      this.supportingDocumentsForm.get('supportingDocuments').setValue(this.supportingDocumentsData);
      this.updateDocumentSummary();
    } else {
      this.supportingDocumentsForm.get('insuranceTemplate').markAllAsTouched();
    }
  }

  cancelSupportingDocuments(): void {
    this.showSupportingDocumentForm = !this.showSupportingDocumentForm;
    this.supportingDocumentsForm.get('addNewSupportingDocumentIndicator').setValue(false);
  }

  deleteDocumentSummaryRow(index: number): void {
    if (this.documentSummaryData[index].fileType === this.FileCategories.Insurance) {
      this.supportingDocumentsForm.get('insuranceTemplate').reset();
      this.supportingDocumentsForm.get('addNewInsuranceTemplateIndicator').setValue(false);
      this.supportingDocumentsForm.get('insuranceTemplate.modifiedBy').setValue("Applicant");
      this.supportingDocumentsForm.get('insuranceTemplate.fileType').setValue(FileCategory.Insurance);
      this.supportingDocumentsForm.get('addNewInsuranceTemplateIndicator').setValue(true);
      let supportingDocsIndex = this.supportingDocumentsData.indexOf(this.documentSummaryData[index]);
      this.supportingDocumentsData.splice(supportingDocsIndex, 1);
      this.supportingDocumentsDataSource.next(this.supportingDocumentsData);
      this.supportingDocumentsForm.get('supportingDocuments').setValue(this.supportingDocumentsData);
      if (this.supportingDocumentsData.length === 0) {
        this.supportingDocumentsForm
          .get('addNewSupportingDocumentIndicator')
          .setValue(false);
      }
    } else if (this.documentSummaryData[index].fileType === this.FileCategories.DamagePhoto) {
      this.dfaApplicationMainService.deleteDamagePhoto.emit(this.documentSummaryData[index]);
    } else if (this.documentSummaryData[index].fileType === this.FileCategories.Cleanup) {
      this.dfaApplicationMainService.deleteCleanupLog.emit(this.documentSummaryData[index]);
    } else {
      let supportingDocsIndex = this.supportingDocumentsData.indexOf(this.documentSummaryData[index]);
      this.supportingDocumentsData.splice(supportingDocsIndex, 1);
      this.supportingDocumentsDataSource.next(this.supportingDocumentsData);
      this.supportingDocumentsForm.get('supportingDocuments').setValue(this.supportingDocumentsData);
      if (this.supportingDocumentsData.length === 0) {
        this.supportingDocumentsForm
          .get('addNewSupportingDocumentIndicator')
          .setValue(false);
      }
    }
    this.updateDocumentSummary();
  }

 updateSupportingDocumentOnVisibility(): void {
    this.supportingDocumentsForm
      .get('supportingDocument.fileName')
      .updateValueAndValidity();
    this.supportingDocumentsForm
      .get('supportingDocument.fileDescription')
      .updateValueAndValidity();
    this.supportingDocumentsForm
      .get('supportingDocument.fileType')
      .updateValueAndValidity();
    this.supportingDocumentsForm
      .get('supportingDocument.uploadedDate')
      .updateValueAndValidity();
    this.supportingDocumentsForm
      .get('supportingDocument.modifiedBy')
      .updateValueAndValidity();
    this.supportingDocumentsForm
      .get('supportingDocument.fileData')
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
      this.supportingDocumentsForm.get('supportingDocument.fileName').setValue(event.name);
      this.supportingDocumentsForm.get('supportingDocument.fileDescription').setValue(event.name);
      this.supportingDocumentsForm.get('supportingDocument.fileData').setValue(reader.result);
      this.supportingDocumentsForm.get('supportingDocument.contentType').setValue(event.type);
      this.supportingDocumentsForm.get('supportingDocument.fileSize').setValue(event.size);
      this.supportingDocumentsForm.get('supportingDocument.uploadedDate').setValue(new Date());
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
      this.supportingDocumentsForm.get('insuranceTemplate.fileName').setValue(event.name);
      this.supportingDocumentsForm.get('insuranceTemplate.fileDescription').setValue(event.name);
      this.supportingDocumentsForm.get('insuranceTemplate.fileData').setValue(reader.result);
      this.supportingDocumentsForm.get('insuranceTemplate.contentType').setValue(event.type);
      this.supportingDocumentsForm.get('insuranceTemplate.fileSize').setValue(event.size);
      this.supportingDocumentsForm.get('insuranceTemplate.uploadedDate').setValue(new Date());
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
