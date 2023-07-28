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
import { BehaviorSubject, Subscription } from 'rxjs';
import { DirectivesModule } from '../../../../core/directives/directives.module';
import { CustomValidationService } from 'src/app/core/services/customValidation.service';
import { distinctUntilChanged, mapTo } from 'rxjs/operators';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TextMaskModule } from 'angular2-text-mask';
import { CustomPipeModule } from 'src/app/core/pipe/customPipe.module';
import { FileUpload } from 'src/app/core/model/dfa-application-main.model';
import { FileCategory, SecondaryApplicantTypeOption } from 'src/app/core/api/models';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { DFAApplicationMainService } from 'src/app/feature-components/dfa-application-main/dfa-application-main.service';
import { DFAApplicationMainDataService } from 'src/app/feature-components/dfa-application-main/dfa-application-main-data.service';
import { AttachmentService, CleanUpLogItemService } from 'src/app/core/api/services';
import { CoreModule } from 'src/app/core/core.module';

@Component({
  selector: 'app-clean-up-log',
  templateUrl: './clean-up-log.component.html',
  styleUrls: ['./clean-up-log.component.scss']
})
export default class CleanUpLogComponent implements OnInit, OnDestroy {
  cleanUpLogForm: UntypedFormGroup;
  cleanUpLogForm$: Subscription;
  cleanUpLogWorkForm: UntypedFormGroup;
  cleanUpLogWorkForm$: Subscription;
  cleanUpWorkFilesForm: UntypedFormGroup;
  cleanUpWorkFilesForm$: Subscription;
  formBuilder: UntypedFormBuilder;
  formCreationService: FormCreationService;
  showCleanUpWorkForm: boolean = false;
  cleanUpWorkColumnsToDisplay = ['date', 'name','hours','description', 'deleteIcon'];
  cleanUpWorkDataSource = new BehaviorSubject([]);
  cleanUpWorkData = [];
  showCleanUpWorkFileForm: boolean = false;
  cleanUpWorkFileColumnsToDisplay = ['fileName', 'fileDescription', 'uploadedDate', 'deleteIcon'];
  cleanUpWorkFileDataSource = new MatTableDataSource();
  FileCategories = FileCategory;

  constructor(
    @Inject('formBuilder') formBuilder: UntypedFormBuilder,
    @Inject('formCreationService') formCreationService: FormCreationService,
    public customValidator: CustomValidationService,
    private dfaApplicationMainService: DFAApplicationMainService,
    private dfaApplicationMainDataService: DFAApplicationMainDataService,
    private cleanUpLogsService: CleanUpLogItemService,
    private attachmentsService: AttachmentService
  ) {
    this.formBuilder = formBuilder;
    this.formCreationService = formCreationService;
  }

  ngOnInit(): void {
    this.cleanUpLogForm$ = this.formCreationService
      .getCleanUpLogForm()
      .subscribe((cleanUpLog) => {
        this.cleanUpLogForm = cleanUpLog;
      });

    this.cleanUpLogWorkForm$ = this.formCreationService
      .getCleanUpLogItemsForm()
      .subscribe((cleanUpLogItems) => {
        this.cleanUpLogWorkForm = cleanUpLogItems;
        this.cleanUpLogWorkForm.updateValueAndValidity();
      });

    this.dfaApplicationMainService.deleteCleanupLog.subscribe((cleanupLogFileToDelete)=> {
      this.deleteCleanupLogFileRow(cleanupLogFileToDelete);
    });

    this.cleanUpLogWorkForm
      .get('addNewCleanUpLogIndicator')
      .valueChanges.subscribe((value) => this.updateCleanupLogOnVisibility());
    this.getCleanUpLogsForApplication(this.dfaApplicationMainDataService.dfaApplicationStart.id);

    this.cleanUpWorkFilesForm$ = this.formCreationService
      .getFileUploadsForm()
      .subscribe((fileUploads) => {
        this.cleanUpWorkFilesForm = fileUploads;
        this.cleanUpWorkFilesForm.updateValueAndValidity();
    });

    this.cleanUpWorkFilesForm
      .get('addNewFileUploadIndicator')
      .valueChanges.subscribe((value) => this.updateCleanupLogFileOnVisibility());

    const _cleanUpWorkFileFormArray = this.formCreationService.fileUploadsForm.value.get('fileUploads');
     _cleanUpWorkFileFormArray.valueChanges
       .pipe(
         mapTo(_cleanUpWorkFileFormArray.getRawValue())
         ).subscribe(data => this.cleanUpWorkFileDataSource.data = data.filter(x => x.fileType === this.FileCategories.Cleanup && x.deleteFlag === false));
  }

  getCleanUpLogsForApplication(applicationId: string) {
    this.cleanUpLogsService.cleanUpLogItemGetCleanUpLogItems({applicationId: applicationId}).subscribe({
      next: (cleanUpLogs) => {
        this.cleanUpWorkData = cleanUpLogs;
        this.cleanUpWorkDataSource.next(this.cleanUpWorkData);
        this.cleanUpLogWorkForm.get('cleanuplogs').setValue(this.cleanUpWorkData);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  /**
   * Returns the control of the form
   */
  get cleanUpLogWorkFormControl(): { [key: string]: AbstractControl } {
    return this.cleanUpLogWorkForm.controls;
  }
  get cleanUpWorkFilesFormControl(): { [key: string]: AbstractControl } {
    return this.cleanUpWorkFilesForm.controls;
  }

  onFileChange(event) {
    const file: File = event[0];

    if (file) {
      var extension = file.name.substr(file.name.lastIndexOf('.'));
      if ((extension.toLowerCase() != ".pdf") &&
        (extension.toLowerCase() != ".png") &&
        (extension.toLowerCase() != ".jpg") &&
        (extension.toLowerCase() != ".jpeg")) {
        alert("Not allowed to upload " + extension + " file");
        return false;
      }

      this.cleanUpWorkFilesForm
        .get('fileUpload.fileName').
        setValue(file.name);
      this.cleanUpWorkFilesForm
        .get('fileUpload.fileDescription').
        setValue(file.name);
      //this.cleanUpWorkFilesForm.get('fileUpload.fileData').setValue(file.text);
      this.cleanUpWorkFilesForm.get('fileUpload.contentType').setValue(file.type);
      this.cleanUpWorkFilesForm.get('fileUpload.fileSize').setValue(file.size);
      this.cleanUpWorkFilesForm.get('fileUpload.uploadedDate').setValue(new Date());
        //.updateValueAndValidity();
    }
  }

  updateCleanupLogOnVisibility(): void {
    this.cleanUpLogWorkForm
      .get('cleanuplog.date')
      .updateValueAndValidity();
    this.cleanUpLogWorkForm
      .get('cleanuplog.name')
      .updateValueAndValidity();
    this.cleanUpLogWorkForm
      .get('cleanuplog.hours')
      .updateValueAndValidity();
    this.cleanUpLogWorkForm
      .get('cleanuplog.description')
      .updateValueAndValidity();
  }

  updateCleanupLogFileOnVisibility(): void {
    this.cleanUpWorkFilesForm
      .get('fileUpload.uploadedDate')
      .updateValueAndValidity();
    this.cleanUpWorkFilesForm
      .get('fileUpload.fileName')
      .updateValueAndValidity();
    this.cleanUpWorkFilesForm
      .get('fileUpload.fileDescription')
      .updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.cleanUpLogForm$.unsubscribe();
    this.cleanUpLogWorkForm$.unsubscribe();
    this.cleanUpWorkFilesForm$.unsubscribe();
  }

  addCleanupLog(): void {
    this.cleanUpLogWorkForm.get('cleanuplog').reset();
    this.showCleanUpWorkForm = !this.showCleanUpWorkForm;
    this.cleanUpLogWorkForm.get('addNewCleanUpLogIndicator').setValue(true);
    this.cleanUpLogWorkForm.get('cleanuplog.deleteFlag').setValue(false);
    this.cleanUpLogWorkForm.get('cleanuplog.applicationId').setValue(this.dfaApplicationMainDataService.dfaApplicationStart.id);
  }

  addCleanupLogFile(): void {
    this.cleanUpWorkFilesForm.get('fileUpload').reset();
    this.cleanUpWorkFilesForm.get('fileUpload.fileType').setValue(this.FileCategories.Cleanup);
    this.cleanUpWorkFilesForm.get('fileUpload.applicationId').setValue(this.dfaApplicationMainDataService.dfaApplicationStart.id);
    this.showCleanUpWorkFileForm = !this.showCleanUpWorkFileForm;
    this.cleanUpWorkFilesForm.get('fileUpload.modifiedBy').setValue("Applicant");
    this.cleanUpWorkFilesForm.get('fileUpload.deleteFlag').setValue(false);
    this.cleanUpWorkFilesForm.get('addNewFileUploadIndicator').setValue(true);
  }

  cancelNewCleanupLog(): void {
    this.showCleanUpWorkForm = !this.showCleanUpWorkForm;
    this.cleanUpLogWorkForm.get('addNewCleanUpLogIndicator').setValue(false);
  }

  cancelNewCleanupLogFile(): void {
    this.showCleanUpWorkFileForm = !this.showCleanUpWorkFileForm;
    this.cleanUpWorkFilesForm.get('addNewFileUploadIndicator').setValue(false);
  }

  saveNewCleanupLog(): void {
    if (this.cleanUpLogWorkForm.get('cleanuplog').status === 'VALID') {
      this.cleanUpLogsService.cleanUpLogItemUpsertDeleteCleanUpLogItem({body: this.cleanUpLogWorkForm.get('cleanuplog').getRawValue() }).subscribe({
        next: (cleanUpLogId) => {
          this.cleanUpLogWorkForm.get('cleanuplog').get('id').setValue(cleanUpLogId);
          this.cleanUpWorkData.push(this.cleanUpLogWorkForm.get('cleanuplog').value);
          this.cleanUpWorkDataSource.next(this.cleanUpWorkData);
          this.cleanUpLogWorkForm.get('cleanuplogs').setValue(this.cleanUpWorkData);
          this.showCleanUpWorkForm = !this.showCleanUpWorkForm;
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      this.cleanUpLogWorkForm.get('cleanuplog').markAllAsTouched();
    }
  }

  saveNewCleanupLogFile(): void {
    this.cleanUpWorkFilesForm
      .get('fileUpload.uploadedDate').
      setValue(new Date());
    this.cleanUpWorkFilesForm
      .get('fileUpload.fileType').
      setValue(this.FileCategories.Cleanup);
    if (this.cleanUpWorkFilesForm.get('fileUpload').status === 'VALID') {
      this.attachmentsService.attachmentUpsertDeleteAttachment({body: this.cleanUpWorkFilesForm.get('fileUpload').getRawValue() }).subscribe({
        next: (fileUploadId) => {
          this.cleanUpWorkFilesForm.get('fileUpload').get('id').setValue(fileUploadId);
          this.dfaApplicationMainDataService.fileUploads.push(this.cleanUpWorkFilesForm.get('fileUpload').getRawValue());
          this.formCreationService.fileUploadsForm.value.get('fileUploads').setValue(this.dfaApplicationMainDataService.fileUploads);
          this.cleanUpLogForm.get('haveInvoicesOrReceiptsForCleanupOrRepairs').setValue('true');
          this.showCleanUpWorkFileForm = !this.showCleanUpWorkFileForm;
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      this.cleanUpWorkFilesForm.get('fileUpload').markAllAsTouched();
    }
  }

  deleteCleanupLogRow(index: number): void {
    this.cleanUpWorkData[index].deleteFlag = true;
    this.cleanUpLogsService.cleanUpLogItemUpsertDeleteCleanUpLogItem({body: this.cleanUpWorkData[index]}).subscribe({
      next: (cleanUpLogId) => {
          this.cleanUpWorkData.splice(index, 1);
          this.cleanUpWorkDataSource.next(this.cleanUpWorkData);
          this.cleanUpLogWorkForm.get('cleanuplogs').setValue(this.cleanUpWorkData);
          if (this.cleanUpWorkData.length === 0) {
            this.cleanUpLogWorkForm
              .get('addNewCleanUpLogIndicator')
              .setValue(false);
          }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  deleteCleanupLogFileRow(element): void {
    let fileUploads = this.formCreationService.fileUploadsForm.value.get('fileUploads').value;
    let index = fileUploads.indexOf(element);
    element.deleteFlag = true;
    this.attachmentsService.attachmentUpsertDeleteAttachment({body: element}).subscribe({
      next: (fileUploadId) => {
        fileUploads[index] = element;
        this.formCreationService.fileUploadsForm.value.get('fileUploads').setValue(fileUploads);
        if (this.formCreationService.fileUploadsForm.value.get('fileUploads').value?.filter(x => x.fileType == FileCategory.Cleanup).length === 0) {
          this.cleanUpLogForm.get('haveInvoicesOrReceiptsForCleanupOrRepairs').setValue('false');
          this.cleanUpWorkFilesForm
            .get('addNewFileUploadIndicator')
            .setValue(false);
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
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
    TextMaskModule,
    CustomPipeModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    DirectivesModule,
    MatDatepickerModule
  ],
  declarations: [CleanUpLogComponent]
})
class CleanUpLogModule {}
