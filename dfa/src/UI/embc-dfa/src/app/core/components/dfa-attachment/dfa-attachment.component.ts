import { Component, OnInit, NgModule, Inject, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  AbstractControl,
} from '@angular/forms';
import { KeyValue } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormCreationService } from 'src/app/core/services/formCreation.service';
import { CustomValidationService } from 'src/app/core/services/customValidation.service';
import { FileUpload } from 'src/app/core/api/models';
import { DFAApplicationMainDataService } from 'src/app/feature-components/dfa-application-main/dfa-application-main-data.service';

@Component({
  selector: 'app-dfa-attachment',
  templateUrl: './dfa-attachment.component.html',
  styleUrls: ['./dfa-attachment.component.scss']
})
export class DfaAttachmentComponent implements OnInit, OnDestroy {
  @Input() missingRequiredFile: boolean;
  @Input() requiredFile: boolean;
  @Input() title: string;
  @Input() description: string;
  @Input() allowedFileTypes: string[];
  @Input() allowedFileExtensionsList: string;
  @Input() fileType: string;
  @Input() excludeFileTypes: string[];
  @Input() fileUpload: FileUpload;
  @Output() showSideNote = new EventEmitter<any>();
  @Output() saveFileUpload = new EventEmitter<FileUpload>();
  formBuilder: UntypedFormBuilder;
  fileUploadsForm: UntypedFormGroup;
  fileUploadsForm$: Subscription;
  formCreationService: FormCreationService;

  constructor(
    @Inject('formBuilder') formBuilder: UntypedFormBuilder,
    @Inject('formCreationService') formCreationService: FormCreationService,
    public customValidator: CustomValidationService,
    private dfaApplicationMainDataService: DFAApplicationMainDataService,
  ) {
    this.formBuilder = formBuilder;
    this.formCreationService = formCreationService;
  }

  showForm() {
    console.log(this.fileUploadsForm, this.fileType);
  }

  onToggleSideNote() {
    this.showSideNote.emit();
  }

  ngOnInit(): void {
    this.fileUploadsForm$ = this.formCreationService
      .getFileUploadsForm()
      .subscribe((fileUploads) => {
        this.fileUploadsForm = fileUploads;
      });

    this.fileUploadsForm
      .get('addNewFileUploadIndicator')
      .valueChanges.subscribe((value) => this.updateFileUploadFormOnVisibility());

    if (this.fileUpload) {
      this.fileUploadsForm.get('fileUpload').setValue(this.fileUpload);
    } else {
      this.initFileUploadForm();
    }
  }

  initFileUploadForm() {
    this.fileUploadsForm.get('fileUpload').reset();
    this.fileUploadsForm.get('fileUpload.modifiedBy').setValue("Applicant");
    if (this.fileType) this.fileUploadsForm.get('fileUpload.fileType').setValue(this.fileType);
    this.fileUploadsForm.get('addNewFileUploadIndicator').setValue(true);
    this.fileUploadsForm.get('fileUpload.deleteFlag').setValue(false);
    this.fileUploadsForm.get('fileUpload.applicationId').setValue(this.dfaApplicationMainDataService.dfaApplicationStart.id);
  }

  // Preserve original property order
  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }

  saveRequiredForm(): void {
    if (this.fileUploadsForm.get('fileUpload').status === 'VALID') {
      this.saveFileUpload.emit(this.fileUploadsForm.get('fileUpload').value);
    } else {
      console.error(this.fileUploadsForm.get('fileUpload'));
      this.fileUploadsForm.get('fileUpload').markAllAsTouched();
    }
  }

  updateFileUploadFormOnVisibility(): void {
    this.fileUploadsForm.get('fileUpload.fileName').updateValueAndValidity();
    this.fileUploadsForm.get('fileUpload.fileDescription').updateValueAndValidity();
    this.fileUploadsForm.get('fileUpload.fileType').updateValueAndValidity();
    this.fileUploadsForm.get('fileUpload.uploadedDate').updateValueAndValidity();
    this.fileUploadsForm.get('fileUpload.modifiedBy').updateValueAndValidity();
    this.fileUploadsForm.get('fileUpload.fileData').updateValueAndValidity();
  }

  /**
   * Returns the control of the form
   */
  get filesUploadFormControl(): { [key: string]: AbstractControl } {
    return this.fileUploadsForm.controls;
  }

  ngOnDestroy(): void {
    this.fileUploadsForm$.unsubscribe();
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
      this.fileUploadsForm.get('fileUpload.fileName').setValue(event.name);
      this.fileUploadsForm.get('fileUpload.fileDescription').setValue(event.name);
      this.fileUploadsForm.get('fileUpload.fileData').setValue(reader.result);
      this.fileUploadsForm.get('fileUpload.contentType').setValue(event.type);
      this.fileUploadsForm.get('fileUpload.fileSize').setValue(event.size);
      this.fileUploadsForm.get('fileUpload.uploadedDate').setValue(new Date());
    };
  }
}
