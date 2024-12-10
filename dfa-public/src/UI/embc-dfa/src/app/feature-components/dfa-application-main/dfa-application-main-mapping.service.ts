import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { DfaApplicationMain, FullTimeOccupant, SecondaryApplicant, OtherContact, DamagedRoom, CleanUpLogItem } from 'src/app/core/model/dfa-application-main.model';
import { DFAApplicationMainDataService } from './dfa-application-main-data.service';
import { FormCreationService } from '../../core/services/formCreation.service';

@Injectable({ providedIn: 'root' })
export class DFAApplicationMainMappingService {
  constructor(
    private formCreationService: FormCreationService,
    private dfaApplicationMainDataService: DFAApplicationMainDataService,
  ) {}

  mapDFAApplicationMain(dfaApplicationMain: DfaApplicationMain): void {
    this.dfaApplicationMainDataService.setDFAApplicationMain(dfaApplicationMain);
    this.setExistingDFAApplicationMain(dfaApplicationMain);
  }

  setExistingDFAApplicationMain(dfaApplicationMain: DfaApplicationMain): void {
    this.setApplicationDetails(dfaApplicationMain);
  }

  // EMCRI-663 waynezen TODO: new
  mapDFAApplicationMainContacts(dfaApplicationMain: DfaApplicationMain): void {
    this.dfaApplicationMainDataService.setDFAApplicationMain(dfaApplicationMain);
    this.setExistingDFAApplicationMainContacts(dfaApplicationMain);
  }

  setExistingDFAApplicationMainContacts(dfaApplicationMain: DfaApplicationMain): void {
    this.setContactDetails(dfaApplicationMain);
  }


  private setApplicationDetails(dfaApplicationMain: DfaApplicationMain): void {
    let formGroup: UntypedFormGroup;
    this.formCreationService
      .getApplicationDetailsForm()
      .pipe(first())
      .subscribe((applicationDetails) => {
        applicationDetails.setValue({
          ...dfaApplicationMain.applicationDetails,
          guidanceSupport: dfaApplicationMain.applicationDetails.guidanceSupport === true ? 'true' : (dfaApplicationMain.applicationDetails.guidanceSupport === false ? 'false' : null),
        });
        formGroup = applicationDetails;
      });
    this.dfaApplicationMainDataService.applicationDetails = dfaApplicationMain.applicationDetails;
    this.dfaApplicationMainDataService.contacts = dfaApplicationMain.applicationContacts;
  }

  // EMCRI-663 waynezen
  private setContactDetails(dfaApplicationMain: DfaApplicationMain): void {
    let formGroup: UntypedFormGroup;
    this.formCreationService
      .getContactsForm()
      .pipe(first())
      .subscribe((contactDetails) => {
        contactDetails.setValue({
          ...dfaApplicationMain.applicationContacts,
          // 2024-10-05 EMCRI-804 waynezen; if doingBusinessAs or Business Number blank, fill in value from BCeID Web Svc
          doingBusinessAs: dfaApplicationMain?.applicationContacts?.doingBusinessAs !== null ? dfaApplicationMain.applicationContacts.doingBusinessAs : this.dfaApplicationMainDataService.getDoingBusinessAs(),
          businessNumber: dfaApplicationMain?.applicationContacts?.businessNumber !== null ? dfaApplicationMain.applicationContacts.businessNumber : this.dfaApplicationMainDataService.getBusinessNumber(),
          // set values of radio buttons manually
          guidanceSupport: dfaApplicationMain?.applicationContacts?.guidanceSupport === true ? 'true' : (dfaApplicationMain.applicationContacts.guidanceSupport === false ? 'false' : null),
        });
        formGroup = contactDetails;
     });
    this.dfaApplicationMainDataService.applicationDetails = dfaApplicationMain.applicationDetails;
    this.dfaApplicationMainDataService.contacts = dfaApplicationMain.applicationContacts;
  }
}
