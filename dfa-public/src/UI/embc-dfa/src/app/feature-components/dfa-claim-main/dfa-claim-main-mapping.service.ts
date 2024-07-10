import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { DfaApplicationMain, FullTimeOccupant, SecondaryApplicant, OtherContact, DamagedRoom, FileUpload, CleanUpLogItem } from 'src/app/core/model/dfa-application-main.model';
import { FormCreationService } from '../../core/services/formCreation.service';
import { DfaClaimMain } from '../../core/model/dfa-claim-main.model';
import { DFAClaimMainDataService } from './dfa-claim-main-data.service';

@Injectable({ providedIn: 'root' })
export class DFAClaimMainMappingService {
  constructor(
    private formCreationService: FormCreationService,
    private dfaClaimMainDataService: DFAClaimMainDataService,
  ) { }

  mapDFAProjectMain(dfaClaimMain: DfaClaimMain): void {
    this.dfaClaimMainDataService.setDFAClaimMain(dfaClaimMain);
    this.setExistingDFAProjectMain(dfaClaimMain);
  }

  setExistingDFAProjectMain(dfaClaimMain: DfaClaimMain): void {
    this.setProjectDetails(dfaClaimMain);
  }

  private setProjectDetails(dfaClaimMain: DfaClaimMain): void {
    let formGroup: UntypedFormGroup;
    this.formCreationService
      .getRecoveryPlanForm()
      .pipe(first())
      .subscribe((project) => {
        project.setValue({
          ...dfaClaimMain.claim,
          //isdamagedDateSameAsApplication: dfaClaimMain.project.isdamagedDateSameAsApplication === true ? 'true' : (dfaClaimMain.claim. === false ? 'false' : null),
        });
        formGroup = project;
      });
    this.dfaClaimMainDataService.recoveryPlan = dfaClaimMain.claim;
  }

}
