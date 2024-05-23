import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { DfaApplicationMain, FullTimeOccupant, SecondaryApplicant, OtherContact, DamagedRoom, FileUpload, CleanUpLogItem } from 'src/app/core/model/dfa-application-main.model';
import { DFAProjectDataService } from './dfa-project-data.service';
import { FormCreationService } from '../../core/services/formCreation.service';

@Injectable({ providedIn: 'root' })
export class DFAApplicationMainMappingService {
  constructor(
    private formCreationService: FormCreationService,
    private dfaProjectDataService: DFAProjectDataService,
  ) {}

  mapDFAApplicationMain(dfaApplicationMain: DfaApplicationMain): void {
    //this.dfaProjectDataService.setDFAApplicationMain(dfaApplicationMain);
    //this.setExistingDFAApplicationMain(dfaApplicationMain);
  }

  setExistingDFAApplicationMain(dfaApplicationMain: DfaApplicationMain): void {
    this.setPropertyDamageDetails(dfaApplicationMain);
  }

  private setPropertyDamageDetails(dfaApplicationMain: DfaApplicationMain): void {
    let formGroup: UntypedFormGroup;
    this.formCreationService
      .getPropertyDamageForm()
      .pipe(first())
      .subscribe((propertyDamage) => {
        propertyDamage.setValue({
          ...dfaApplicationMain.propertyDamage,
          guidanceSupport: dfaApplicationMain.propertyDamage.guidanceSupport === true ? 'true' : (dfaApplicationMain.propertyDamage.guidanceSupport === false ? 'false' : null),
        });
        formGroup = propertyDamage;
      });
    //this.dfaProjectDataService.propertyDamage = dfaApplicationMain.propertyDamage;
  }

}
