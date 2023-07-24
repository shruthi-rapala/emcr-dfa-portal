import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { DfaApplicationMain, FullTimeOccupant, SecondaryApplicant, OtherContact, DamagedRoom, FileUpload, CleanUpLogItem } from 'src/app/core/model/dfa-application-main.model';
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
    this.setDamagedPropertyAddressDetails(dfaApplicationMain);
    this.setPropertyDamageDetails(dfaApplicationMain);
    this.setCleanUpLogDetails(dfaApplicationMain);
    this.setSupportingDocumentsDetails(dfaApplicationMain);
    this.setSignAndSubmitDetails(dfaApplicationMain);
  }

  private setDamagedPropertyAddressDetails(dfaApplicationMain: DfaApplicationMain): void {
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

  private setCleanUpLogDetails(dfaApplicationMain: DfaApplicationMain): void {
    let formGroup: UntypedFormGroup;

    this.formCreationService
      .getCleanUpLogForm()
      .pipe(first())
      .subscribe((cleanUpLog) => {
        cleanUpLog.setValue({
          ...dfaApplicationMain
        });
        formGroup = cleanUpLog;
      });
    this.dfaApplicationMainDataService.cleanUpLog = dfaApplicationMain.cleanUpLog;
  }

  private setSupportingDocumentsDetails(dfaApplicationMain: DfaApplicationMain): void {
    let formGroup: UntypedFormGroup;

    this.formCreationService
      .getSupportingDocumentsForm()
      .pipe(first())
      .subscribe((supportingDocuments) => {
        supportingDocuments.setValue({
          ...dfaApplicationMain
        });
        formGroup = supportingDocuments;
      });
    this.dfaApplicationMainDataService.supportingDocuments = dfaApplicationMain.supportingDocuments;
  }

  private setSignAndSubmitDetails(dfaApplicationMain: DfaApplicationMain): void {
    let formGroup: UntypedFormGroup;

    this.formCreationService
      .getSignAndSubmitForm()
      .pipe(first())
      .subscribe((signAndSubmit) => {
        signAndSubmit.setValue({
          ...dfaApplicationMain
        });
        formGroup = signAndSubmit;
      });
    this.dfaApplicationMainDataService.signAndSubmit = dfaApplicationMain.signAndSubmit;
  }

  private setPropertyDamageDetails(dfaApplicationMain: DfaApplicationMain): void {
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

  private setExistingFullTimeOccupantsDetails(fullTimeOccupants: Array<FullTimeOccupant>): void {
    let formGroup: UntypedFormGroup;

    this.formCreationService
      .getFullTimeOccupantsForm()
      .pipe(first())
      .subscribe((fullTimeOccupants) => {
        fullTimeOccupants.setValue({
          ...fullTimeOccupants
        });
        formGroup = fullTimeOccupants;
      });
    this.dfaApplicationMainDataService.fullTimeOccupants = fullTimeOccupants;
  }

  private setExistingOtherContactsDetails(otherContacts: Array<OtherContact>): void {
    let formGroup: UntypedFormGroup;

    this.formCreationService
      .getOtherContactsForm()
      .pipe(first())
      .subscribe((otherContacts) => {
        otherContacts.setValue({
          ...otherContacts
        });
        formGroup = otherContacts;
      });
    this.dfaApplicationMainDataService.otherContacts = otherContacts;
  }

  private setExistingSecondaryApplicantsDetails(secondaryApplicants: Array<SecondaryApplicant>): void {
    let formGroup: UntypedFormGroup;

    this.formCreationService
      .getSecondaryApplicantsForm()
      .pipe(first())
      .subscribe((secondaryApplicants) => {
        secondaryApplicants.setValue({
          ...secondaryApplicants
        });
        formGroup = secondaryApplicants;
      });
    this.dfaApplicationMainDataService.secondaryApplicants = secondaryApplicants;
  }

  private setExistingDamagedRoomsDetails(damagedRooms: Array<DamagedRoom>): void {
    let formGroup: UntypedFormGroup;

    this.formCreationService
      .getDamagedRoomsForm()
      .pipe(first())
      .subscribe((damagedRooms) => {
        damagedRooms.setValue({
          ...damagedRooms
        });
        formGroup = damagedRooms;
      });
    this.dfaApplicationMainDataService.damagedRooms = damagedRooms;
  }

  private setExistingFileUploadsDetails(fileUploads: Array<FileUpload>): void {
    let formGroup: UntypedFormGroup;

    this.formCreationService
      .getFileUploadsForm()
      .pipe(first())
      .subscribe((fileUploads) => {
        fileUploads.setValue({
          ...fileUploads
        });
        formGroup = fileUploads;
      });
    this.dfaApplicationMainDataService.fileUploads = fileUploads;
  }

  private setExistingCleanUpLogItemsDetails(cleanUpLogItems: Array<CleanUpLogItem>): void {
    let formGroup: UntypedFormGroup;

    this.formCreationService
      .getCleanUpLogItemsForm()
      .pipe(first())
      .subscribe((cleanUpLogItems) => {
        cleanUpLogItems.setValue({
          ...cleanUpLogItems
        });
        formGroup = cleanUpLogItems;
      });
    this.dfaApplicationMainDataService.cleanUpLogItems = cleanUpLogItems;
  }
}
