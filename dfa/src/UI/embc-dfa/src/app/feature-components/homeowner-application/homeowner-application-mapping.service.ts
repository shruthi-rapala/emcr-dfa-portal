import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HomeOwnerApplication, HomeOwnerApplicationDataConflict } from 'src/app/core/model/homeowner-application.model';
import { HomeOwnerApplicationDataService } from './homeowner-application-data.service';
import { FormCreationService } from '../../core/services/formCreation.service';
import { ConflictManagementService } from '../../sharedModules/components/conflict-management/conflict-management.service';

@Injectable({ providedIn: 'root' })
export class HomeOwnerApplicationMappingService {
  constructor(
    private formCreationService: FormCreationService,
    private homeOwnerApplicationDataService: HomeOwnerApplicationDataService,
    private conflictService: ConflictManagementService,
  ) {}

  mapConflicts(conflicts: HomeOwnerApplicationDataConflict[]): void {
    this.conflictService.setConflicts(conflicts);
    this.conflictService.setCount(conflicts.length);
    this.conflictService.setHasVisitedConflictPage(true);
  }

  mapHomeOwnerApplication(homeOwnerApplication: HomeOwnerApplication): void {
    this.homeOwnerApplicationDataService.setHomeOwnerApplicationId(homeOwnerApplication.id);
    this.homeOwnerApplicationDataService.setHomeOwnerApplication(homeOwnerApplication);
    this.setExistingHomeOwnerApplication(homeOwnerApplication);
  }

  setExistingHomeOwnerApplication(homeOwnerApplication: HomeOwnerApplication): void {
    this.setDamagedPropertyAddressDetails(homeOwnerApplication);
    this.setPropertyDamageDetails(homeOwnerApplication);
    this.setOccupantsDetails(homeOwnerApplication);
  }

  private setDamagedPropertyAddressDetails(homeOwnerApplication: HomeOwnerApplication): void {
    let formGroup: UntypedFormGroup;

    this.formCreationService
      .getDamagedPropertyAddressForm()
      .pipe(first())
      .subscribe((damagedPropertyAddress) => {
        damagedPropertyAddress.setValue({
          ...homeOwnerApplication
        });
        formGroup = damagedPropertyAddress;
      });
    this.homeOwnerApplicationDataService.damagedPropertyAddress = homeOwnerApplication.damagedPropertyAddress;
  }

  private setPropertyDamageDetails(homeOwnerApplication: HomeOwnerApplication): void {
    let formGroup: UntypedFormGroup;

    this.formCreationService
      .getPropertyDamageForm()
      .pipe(first())
      .subscribe((propertyDamage) => {
        propertyDamage.setValue({
          ...homeOwnerApplication
        });
        formGroup = propertyDamage;
      });
    this.homeOwnerApplicationDataService.propertyDamage = homeOwnerApplication.propertyDamage;
  }

  private setOccupantsDetails(homeOwnerApplication: HomeOwnerApplication): void {
    let formGroup: UntypedFormGroup;

    this.formCreationService
      .getOccupantsForm()
      .pipe(first())
      .subscribe((occupants) => {
        occupants.setValue({
          ...homeOwnerApplication
        });
        formGroup = occupants;
      });
    this.homeOwnerApplicationDataService.damagedPropertyAddress = homeOwnerApplication.damagedPropertyAddress;
  }
}
