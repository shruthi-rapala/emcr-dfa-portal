import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { DfaApplicationMain, FullTimeOccupant, SecondaryApplicant, OtherContact, DamagedRoom, FileUpload, CleanUpLogItem } from 'src/app/core/model/dfa-application-main.model';
import { DFAProjectMainDataService } from './dfa-project-main-data.service';
import { FormCreationService } from '../../core/services/formCreation.service';
import { DfaProjectMain } from '../../core/model/dfa-project-main.model';

@Injectable({ providedIn: 'root' })
export class DFAProjectMainMappingService {
  constructor(
    private formCreationService: FormCreationService,
    private dfaProjectMainDataService: DFAProjectMainDataService,
  ) {}

  mapDFAProjectMain(dfaProjectMain: DfaProjectMain): void {
    this.dfaProjectMainDataService.setDFAProjectMain(dfaProjectMain);
    this.setExistingDFAProjectMain(dfaProjectMain);
  }

  setExistingDFAProjectMain(dfaProjectMain: DfaProjectMain): void {
    this.setProjectDetails(dfaProjectMain);
  }

  private setProjectDetails(dfaProjectMain: DfaProjectMain): void {
    let formGroup: UntypedFormGroup;
    this.formCreationService
      .getRecoveryPlanForm()
      .pipe(first())
      .subscribe((project) => {
        project.setValue({
          ...dfaProjectMain.project,
          isdamagedDateSameAsApplication: dfaProjectMain.project.isdamagedDateSameAsApplication === true ? 'true' : (dfaProjectMain.project.isdamagedDateSameAsApplication === false ? 'false' : null),
        });
        formGroup = project;
      });
    this.dfaProjectMainDataService.recoveryPlan = dfaProjectMain.project;
  }

}
