import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { DFAApplication, DFAApplicationDataConflict } from 'src/app/core/model/dfa-application.model';
import { DFAApplicationDataService } from './dfa-application-data.service';
import { FormCreationService } from '../../core/services/formCreation.service';
import { ConflictManagementService } from '../../sharedModules/components/conflict-management/conflict-management.service';

@Injectable({ providedIn: 'root' })
export class DFAApplicationMappingService {
  constructor(
    private formCreationService: FormCreationService,
    private dfaApplicationDataService: DFAApplicationDataService,
    private conflictService: ConflictManagementService,
  ) {}

  mapConflicts(conflicts: DFAApplicationDataConflict[]): void {
    this.conflictService.setConflicts(conflicts);
    this.conflictService.setCount(conflicts.length);
    this.conflictService.setHasVisitedConflictPage(true);
  }

  private setAppTypeInsuranceDetails(dfaApplication: DFAApplication): void {
    let formGroup: UntypedFormGroup;

    this.formCreationService
      .getAppTypeInsuranceForm()
      .pipe(first())
      .subscribe((appTypeInsurance) => {
        appTypeInsurance.setValue({
          ...dfaApplication
        });
        formGroup = appTypeInsurance;
      });
    this.dfaApplicationDataService.applicantOption = dfaApplication.appTypeInsurance.applicantOption;
    this.dfaApplicationDataService.insuranceOption = dfaApplication.appTypeInsurance.insuranceOption;
    this.dfaApplicationDataService.smallBusinessOption = dfaApplication.appTypeInsurance.smallBusinessOption;
    this.dfaApplicationDataService.farmOption = dfaApplication.appTypeInsurance.farmOption;
  }
}
