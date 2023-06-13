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
    this.homeOwnerApplicationDataService.addressLine1 = homeOwnerApplication.damagedPropertyAddress.addressLine1;
    this.homeOwnerApplicationDataService.addressLine2 = homeOwnerApplication.damagedPropertyAddress.addressLine2;
    this.homeOwnerApplicationDataService.community = homeOwnerApplication.damagedPropertyAddress.community;
    this.homeOwnerApplicationDataService.country = homeOwnerApplication.damagedPropertyAddress.country;
    this.homeOwnerApplicationDataService.eligibleForHomeOwnerGrant = homeOwnerApplication.damagedPropertyAddress.eligibleForHomeOwnerGrant;
    this.homeOwnerApplicationDataService.firstNationsReserve = homeOwnerApplication.damagedPropertyAddress.firstNationsReserve;
    this.homeOwnerApplicationDataService.manufacturedHome = homeOwnerApplication.damagedPropertyAddress.manufacturedHome;
    this.homeOwnerApplicationDataService.occupyAsPrimaryResidence = homeOwnerApplication.damagedPropertyAddress.occupyAsPrimaryResidence;
    this.homeOwnerApplicationDataService.onAFirstNationsReserve = homeOwnerApplication.damagedPropertyAddress.onAFirstNationsReserve;
    this.homeOwnerApplicationDataService.postalCode = homeOwnerApplication.damagedPropertyAddress.postalCode;
    this.homeOwnerApplicationDataService.stateProvince = homeOwnerApplication.damagedPropertyAddress.stateProvince;
  }
}
