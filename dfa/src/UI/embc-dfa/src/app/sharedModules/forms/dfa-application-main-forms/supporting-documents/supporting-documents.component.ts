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
  showSupportingDocumentForm: boolean = false;
  supportingDocumentColumnsToDisplay = ['fileName', 'fileDescription', 'uploadedDate', 'icons'];
  supportingDocumentsDataSource = new BehaviorSubject([]);
  supportingDocumentsData = [];
  supportingDocumentEditIndex: number;
  supportingDocumentRowEdit = false;
  supportingDocumentEditFlag = false;
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
      .get('addNewSupportingDocumentIndicator')
      .valueChanges.subscribe((value) => this.updateSupportingDocumentOnVisibility());
    this.supportingDocumentsDataSource.next(
        this.supportingDocumentsForm.get('supportingDocuments').value
      );
    this.supportingDocumentsData = this.supportingDocumentsForm.get('supportingDocuments').value;

  }

  // Preserve original property order
  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }

  addSupportingDocument(): void {
    this.supportingDocumentsForm.get('supportingDocument').reset();
    this.supportingDocumentsForm.get('supportingDocument.modifiedBy').setValue("Applicant");
    this.supportingDocumentsForm.get('supportingDocument.fileType').setValue(this.FileCategories.DamagePhoto); /// TODO prompt for type
    this.showSupportingDocumentForm = !this.showSupportingDocumentForm;
    this.supportingDocumentEditFlag = !this.supportingDocumentEditFlag;
    this.supportingDocumentsForm.get('addNewSupportingDocumentIndicator').setValue(true);
  }

  saveSupportingDocuments(): void {
    if (this.supportingDocumentsForm.get('supportingDocument').status === 'VALID') {
      if (this.supportingDocumentEditIndex !== undefined && this.supportingDocumentRowEdit) {
        this.supportingDocumentsData[this.supportingDocumentEditIndex] =
          this.supportingDocumentsForm.get('supportingDocument').getRawValue();
        this.supportingDocumentRowEdit = !this.supportingDocumentRowEdit;
        this.supportingDocumentEditIndex = undefined;
      } else {
        this.supportingDocumentsData.push(this.supportingDocumentsForm.get('supportingDocument').value);
      }
      this.supportingDocumentsDataSource.next(this.supportingDocumentsData);
      this.supportingDocumentsForm.get('supportingDocuments').setValue(this.supportingDocumentsData);
      this.showSupportingDocumentForm = !this.showSupportingDocumentForm;
      this.supportingDocumentEditFlag = !this.supportingDocumentEditFlag;
    } else {
      this.supportingDocumentsForm.get('supportingDocument').markAllAsTouched();
    }
  }

  cancelSupportingDocuments(): void {
    this.showSupportingDocumentForm = !this.showSupportingDocumentForm;
    this.supportingDocumentEditFlag = !this.supportingDocumentEditFlag;
    this.supportingDocumentsForm.get('addNewSupportingDocumentIndicator').setValue(false);
  }

  deleteSupportingDocumentRow(index: number): void {
    this.supportingDocumentsData.splice(index, 1);
    this.supportingDocumentsDataSource.next(this.supportingDocumentsData);
    this.supportingDocumentsForm.get('supportingDocuments').setValue(this.supportingDocumentsData);
    if (this.supportingDocumentsData.length === 0) {
      this.supportingDocumentsForm
        .get('addNewSupportingDocumentIndicator')
        .setValue(false);
    }
  }

   editSupportingDocumentRow(element, index): void {
    this.supportingDocumentEditIndex = index;
    this.supportingDocumentRowEdit = !this.supportingDocumentRowEdit;
    this.supportingDocumentsForm.get('supportingDocument').setValue(element);
    this.showSupportingDocumentForm = !this.showSupportingDocumentForm;
    this.supportingDocumentEditFlag = !this.supportingDocumentEditFlag;
    this.supportingDocumentsForm.get('addNewSupportingDocumentIndicator').setValue(true);
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
