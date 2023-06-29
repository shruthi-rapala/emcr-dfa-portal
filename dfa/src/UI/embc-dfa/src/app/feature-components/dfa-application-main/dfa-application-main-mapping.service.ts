import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { DFAApplicationMain } from 'src/app/core/model/dfa-application-main.model';
import { DFAApplicationMainDataService } from './dfa-application-main-data.service';
import { FormCreationService } from '../../core/services/formCreation.service';
import { ConflictManagementService } from '../../sharedModules/components/conflict-management/conflict-management.service';

@Injectable({ providedIn: 'root' })
export class DFAApplicationMainMappingService {
  constructor(
    private formCreationService: FormCreationService,
    private dfaApplicationMainDataService: DFAApplicationMainDataService,
    private conflictService: ConflictManagementService,
  ) {}

  mapDFAApplicationMain(dfaApplicationMain: DFAApplicationMain): void {
    this.dfaApplicationMainDataService.setDFAApplicationMainId(dfaApplicationMain.id);
    this.dfaApplicationMainDataService.setDFAApplicationMain(dfaApplicationMain);
    this.setExistingDFAApplicationMain(dfaApplicationMain);
  }

  setExistingDFAApplicationMain(dfaApplicationMain: DFAApplicationMain): void {
    this.setDamagedPropertyAddressDetails(dfaApplicationMain);
    this.setPropertyDamageDetails(dfaApplicationMain);
    this.setOccupantsDetails(dfaApplicationMain);
  }

  private setDamagedPropertyAddressDetails(dfaApplicationMain: DFAApplicationMain): void {
    let formGroup: UntypedFormGroup;

    this.formCreationService
      .getDamagedPropertyAddressForm()
      .pipe(first())
      .subscribe((damagedPropertyAddress) => {
        damagedPropertyAddress.setValue({
          ...dfaApplicationMain
        });
        formGroup = damagedPropertyAddress;
      });
    this.dfaApplicationMainDataService.damagedPropertyAddress = dfaApplicationMain.damagedPropertyAddress;
  }

  private setPropertyDamageDetails(dfaApplicationMain: DFAApplicationMain): void {
    let formGroup: UntypedFormGroup;

    this.formCreationService
      .getPropertyDamageForm()
      .pipe(first())
      .subscribe((propertyDamage) => {
        propertyDamage.setValue({
          ...dfaApplicationMain
        });
        formGroup = propertyDamage;
      });
    this.dfaApplicationMainDataService.propertyDamage = dfaApplicationMain.propertyDamage;
  }

  private setOccupantsDetails(dfaApplicationMain: DFAApplicationMain): void {
    let formGroup: UntypedFormGroup;

    this.formCreationService
      .getOccupantsForm()
      .pipe(first())
      .subscribe((occupants) => {
        occupants.setValue({
          ...dfaApplicationMain
        });
        formGroup = occupants;
      });
    this.dfaApplicationMainDataService.damagedPropertyAddress = dfaApplicationMain.damagedPropertyAddress;
  }
}
