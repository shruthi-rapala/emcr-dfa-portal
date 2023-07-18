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
import { distinctUntilChanged } from 'rxjs/operators';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TextMaskModule } from 'angular2-text-mask';
import { CustomPipeModule } from 'src/app/core/pipe/customPipe.module';
import { FileCategory, FileUpload, SecondaryApplicantTypeOption } from 'src/app/core/model/dfa-application-main.model';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { DFAApplicationMainService } from 'src/app/feature-components/dfa-application-main/dfa-application-main.service';

@Component({
  selector: 'app-clean-up-log',
  templateUrl: './clean-up-log.component.html',
  styleUrls: ['./clean-up-log.component.scss']
})
export default class CleanUpLogComponent implements OnInit, OnDestroy {
  cleanUpLogForm: UntypedFormGroup;
  formBuilder: UntypedFormBuilder;
  cleanUpLogForm$: Subscription;
  formCreationService: FormCreationService;
  showCleanUpWorkForm: boolean = false;
  cleanUpWorkColumnsToDisplay = ['date', 'name','hours','description', 'deleteIcon'];
  cleanUpWorkDataSource = new BehaviorSubject([]);
  cleanUpWorkData = [];
  showCleanUpWorkFileForm: boolean = false;
  cleanUpWorkFileColumnsToDisplay = ['fileName', 'fileDescription', 'uploadedDate', 'deleteIcon'];
  cleanUpWorkFileDataSource = new BehaviorSubject([]);
  cleanUpWorkFileData = [] as FileUpload[];
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
    this.cleanUpLogForm$ = this.formCreationService
      .getCleanUpLogForm()
      .subscribe((cleanUpLog) => {
        this.cleanUpLogForm = cleanUpLog;
        this.cleanUpLogForm.updateValueAndValidity();
      });


    this.dfaApplicationMainService.deleteCleanupLog.subscribe((cleanupLogFileToDelete)=> {
      let index = this.cleanUpWorkFileData.indexOf(cleanupLogFileToDelete);
      this.deleteCleanupLogFileRow(index);
    });

    this.cleanUpLogForm
      .get('addNewCleanUpLogIndicator')
      .valueChanges.subscribe((value) => this.updateCleanupLogOnVisibility());
    this.cleanUpWorkDataSource.next(
      this.cleanUpLogForm.get('cleanuplogs').value
    );
    this.cleanUpWorkData = this.cleanUpLogForm.get('cleanuplogs').value;

    this.cleanUpLogForm
      .get('addNewCleanUpLogFileIndicator')
      .valueChanges.subscribe((value) => this.updateCleanupLogFileOnVisibility());
    this.cleanUpWorkFileDataSource.next(
      this.cleanUpLogForm.get('cleanuplogFiles').value
    );
    this.cleanUpWorkFileData = this.cleanUpLogForm.get('cleanuplogFiles').value;
  }

  /**
   * Returns the control of the form
   */
  get cleanUpLogFormControl(): { [key: string]: AbstractControl } {
    return this.cleanUpLogForm.controls;
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

      this.cleanUpLogForm
        .get('cleanuplogFile.fileName').
        setValue(file.name);
      this.cleanUpLogForm
        .get('cleanuplogFile.fileDescription').
        setValue(file.name);
        //.updateValueAndValidity();
    }
  }

  updateOnVisibility(): void {
    this.cleanUpLogForm.get('field').updateValueAndValidity();
  }

  updateCleanupLogOnVisibility(): void {
    this.cleanUpLogForm
      .get('cleanuplog.date')
      .updateValueAndValidity();
    this.cleanUpLogForm
      .get('cleanuplog.name')
      .updateValueAndValidity();
    this.cleanUpLogForm
      .get('cleanuplog.hours')
      .updateValueAndValidity();
    this.cleanUpLogForm
      .get('cleanuplog.description')
      .updateValueAndValidity();
  }

  updateCleanupLogFileOnVisibility(): void {
    this.cleanUpLogForm
      .get('cleanuplogFile.uploadedDate')
      .updateValueAndValidity();
    this.cleanUpLogForm
      .get('cleanuplogFile.fileName')
      .updateValueAndValidity();
    this.cleanUpLogForm
      .get('cleanuplogFile.fileDescription')
      .updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.cleanUpLogForm$.unsubscribe();
  }

  addCleanupLog(): void {
    this.cleanUpLogForm.get('cleanuplog').reset();
    this.cleanUpLogForm.get('cleanuplogFile.fileType').setValue(this.FileCategories.Cleanup);
    this.showCleanUpWorkForm = !this.showCleanUpWorkForm;
    this.cleanUpLogForm.get('addNewCleanUpLogIndicator').setValue(true);
  }

  addCleanupLogFile(): void {
    this.cleanUpLogForm.get('cleanuplogFile').reset();
    this.showCleanUpWorkFileForm = !this.showCleanUpWorkFileForm;
    this.cleanUpLogForm.get('addNewCleanUpLogFileIndicator').setValue(true);
  }

  cancelNewCleanupLog(): void {
    this.showCleanUpWorkForm = !this.showCleanUpWorkForm;
    this.cleanUpLogForm.get('addNewCleanUpLogIndicator').setValue(false);
  }

  cancelNewCleanupLogFile(): void {
    this.showCleanUpWorkFileForm = !this.showCleanUpWorkFileForm;
    this.cleanUpLogForm.get('addNewCleanUpLogFileIndicator').setValue(false);
  }

  saveNewCleanupLog(): void {
    if (this.cleanUpLogForm.get('cleanuplog').status === 'VALID') {
      this.cleanUpWorkData.push(this.cleanUpLogForm.get('cleanuplog').value);
      this.cleanUpWorkDataSource.next(this.cleanUpWorkData);
      this.cleanUpLogForm.get('cleanuplogs').setValue(this.cleanUpWorkData);
      this.showCleanUpWorkForm = !this.showCleanUpWorkForm;
    } else {
      this.cleanUpLogForm.get('cleanuplog').markAllAsTouched();
    }
  }

  saveNewCleanupLogFile(): void {
    this.cleanUpLogForm
      .get('cleanuplogFile.uploadedDate').
      setValue(new Date());
    this.cleanUpLogForm
      .get('cleanuplogFile.fileType').
      setValue(this.FileCategories.Cleanup);
    if (this.cleanUpLogForm.get('cleanuplogFile').status === 'VALID') {
      this.cleanUpWorkFileData.push(this.cleanUpLogForm.get('cleanuplogFile').getRawValue());
      this.cleanUpWorkFileDataSource.next(this.cleanUpWorkFileData);
      this.cleanUpLogForm.get('cleanuplogFiles').setValue(this.cleanUpWorkFileData);
      this.showCleanUpWorkFileForm = !this.showCleanUpWorkFileForm;
    } else {
      this.cleanUpLogForm.get('cleanuplogFile').markAllAsTouched();
    }
  }

  deleteCleanupLogRow(index: number): void {
    this.cleanUpWorkData.splice(index, 1);
    this.cleanUpWorkDataSource.next(this.cleanUpWorkData);
    this.cleanUpLogForm.get('cleanuplogs').setValue(this.cleanUpWorkData);
    if (this.cleanUpWorkData.length === 0) {
      this.cleanUpLogForm
        .get('addNewCleanUpLogIndicator')
        .setValue(false);
    }

  }

  deleteCleanupLogFileRow(index: number): void {
    this.cleanUpWorkFileData.splice(index, 1);
    this.cleanUpWorkFileDataSource.next(this.cleanUpWorkFileData);
    this.cleanUpLogForm.get('cleanuplogFiles').setValue(this.cleanUpWorkFileData);
    if (this.cleanUpWorkFileData.length === 0) {
      this.cleanUpLogForm
        .get('addNewCleanUpLogFileIndicator')
        .setValue(false);
    }

  }
}

@NgModule({
  imports: [
    CommonModule,
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
