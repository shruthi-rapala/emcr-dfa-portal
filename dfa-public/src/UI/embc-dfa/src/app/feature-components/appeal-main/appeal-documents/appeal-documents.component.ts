import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormControl, FormGroup, FormGroupDirective, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CurrentApplication, CurrentProjectAppeal, FileCategory, FileCategoryAppeal, FileUploadProjectAppeal, RecoveryPlan } from 'src/app/core/api/models';
import { AttachmentService } from 'src/app/core/api/services';
import { DfaAttachmentComponent } from 'src/app/core/components/dfa-attachment/dfa-attachment.component';
import { FileUploadWarningDialogComponent } from 'src/app/core/components/dialog-components/file-upload-warning-dialog/file-upload-warning-dialog.component';
import { DFAClaimAppealDataService } from '../appeal-data.service';
import { FormCreationService } from 'src/app/core/services/formCreation.service';
import { MatTableDataSource } from '@angular/material/table';

/**
 * Appeal Documents Component.
 *
 * Renders the drag-and-drop file upload area for appeal documents.
 * Renders the list of selected documents.
 * Does not upload selected documents to the backend.
 *
 * @export
 * @class AppealDocumentsComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-appeal-documents',
  standalone: false,
  templateUrl: './appeal-documents.component.html',
  styleUrl: './appeal-documents.component.scss',
  providers: [DfaAttachmentComponent],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class AppealDocumentsComponent implements OnInit {
  // TODO: Remove unused imports
  @Input() projectId: string;
  @Input() project: RecoveryPlan;
  @Input() application: CurrentApplication;
  @Input() appeal: CurrentProjectAppeal;
  @Input() isReadOnly: boolean = false;
  @Input() isDisabled: boolean = false;
  /**
   * Callback fired when the remove document button is clicked.
   *
   * @memberof AppealDocumentsComponent
   */
  @Input() onRemoveDocument: (index: number) => void;

  noOfAttachments: number = 10;
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
  allowedFileExtensionsList = '.pdf, .doc, .docx, .png, .jpeg, .jpg, .ppt, .pptx, .xls, .xlsx';

  fileDescriptionMaxLength: number = 100;

  appealForm: FormGroup;
  showSupportingFileForm: boolean = false;
  isLoading: boolean = false;
  isdisabled: string = 'false';
  fileUploadsProjectAppealForm: UntypedFormGroup = this.formCreationService.fileUploadsProjectAppealForm;
  projectAppealDocumentSummaryColumnsToDisplay = ['fileName', 'fileDescription', 'fileTypeText', 'uploadedDate']
  projectAppealDocumentSummaryDataSource = new MatTableDataSource();
 
  constructor(
    private dialog: MatDialog,
    public controlContainer: ControlContainer,
    public attachmentService: AttachmentService,
    public dfaClaimAppealDataService: DFAClaimAppealDataService,
    private formCreationService: FormCreationService,
  ) {}

  ngOnInit() {
    this.appealForm = this.controlContainer.control as FormGroup;
  }


  saveSupportingFiles(fileUpload: FileUploadProjectAppeal ) {
    console.log("saveSupportingFilesProjectAppeals", fileUpload);
      // dont allow same filename twice
      let fileUploads = this.formCreationService.fileUploadsProjectAppealForm.get('fileUploads').value;
      if (fileUploads?.find(x => x.fileName === fileUpload.fileName && x.deleteFlag !== true)) {
        this.warningDialog("A file with the name " + fileUpload.fileName + " has already been uploaded.");
        this.formCreationService.fileUploadsProjectAppealForm.get('supportingFilesFileUpload').reset();
        return;
      }

      if (this.formCreationService.fileUploadsProjectAppealForm.get('supportingFilesFileUpload').status === 'VALID') {
        this.isLoading = true;
        fileUpload.fileData = fileUpload?.fileData?.substring(fileUpload?.fileData?.indexOf(',') + 1) // to allow upload as byte array
        fileUpload.appealId = this.dfaClaimAppealDataService.getAppealId();
        fileUpload.requiredDocumentType = null;

        this.attachmentService.attachmentUpsertDeleteProjectAppealAttachment({ body: fileUpload }).subscribe({
          next: (fileUploadId) => {
            fileUpload.id = fileUploadId;
            if (fileUploads) fileUploads.push(fileUpload);
            else fileUploads = [fileUpload];
            this.formCreationService.fileUploadsProjectAppealForm.value.get('fileUploads').setValue(fileUploads);
            this.showSupportingFileForm = !this.showSupportingFileForm;
            // Reset Form feilds
            this.formCreationService.fileUploadsProjectAppealForm.value.get('supportingFilesFileUpload').reset();
            this.isLoading = false;
          },
          error: (error) => {
            console.error(error);
            this.isLoading = false;
           // document.location.href = 'https://dfa.gov.bc.ca/error.html';
          }
        });
      }

  }

  cancelSupportingFiles(): void {
    this.showSupportingFileForm = !this.showSupportingFileForm;
    this.formCreationService.fileUploadsProjectAppealForm.get('addNewFileUploadIndicator').setValue(false);
  }

  /**
   * Handles the file attachment event.
   *
   * @param {*} event
   * @memberof AppealDocumentsComponent
   */
  onAttachedFile(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event);
    reader.onload = () => {
      const documents = this.appealForm.get('step2.documents') as FormArray;

      // Show warning and exit early if a document already exists with the same file name
      if (documents.controls.some((document) => document.get('fileName')?.value === event.name)) {
        this.warningDialog('A file with the name ' + event.name + ' has already been added.');
        return;
      }

      documents.push(
        new FormGroup({
          fileName: new FormControl(event.name),
          fileDescription: new FormControl(event.name, [
            Validators.required,
            Validators.maxLength(this.fileDescriptionMaxLength)
          ]),
          fileData: new FormControl(reader.result),
          FileType: new FormControl(FileCategory.Reports), // TODO: Update this to "Appeal Support" when available
          contentType: new FormControl(event.type),
          fileSize: new FormControl(event.size),
          uploadedDate: new FormControl(new Date())
        })
      );
    };
  }

  /**
   * Opens a warning dialog with the provided message.
   *
   * @param {string} message
   * @memberof AppealDocumentsComponent
   */
  warningDialog(message: string) {
    this.dialog.open(FileUploadWarningDialogComponent, {
      data: {
        content: message
      },
      width: '500px',
      disableClose: true
    });
  }
}
