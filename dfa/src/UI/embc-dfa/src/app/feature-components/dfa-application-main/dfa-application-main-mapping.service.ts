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
          ...dfaApplicationMain.damagedPropertyAddress,
          isPrimaryAndDamagedAddressSame: dfaApplicationMain.damagedPropertyAddress.isPrimaryAndDamagedAddressSame === true ? 'true' : 'false',
          occupyAsPrimaryResidence: dfaApplicationMain.damagedPropertyAddress.occupyAsPrimaryResidence === true ? 'true' : 'false',
          onAFirstNationsReserve: dfaApplicationMain.damagedPropertyAddress.onAFirstNationsReserve === true ? 'true' : 'false',
          manufacturedHome: dfaApplicationMain.damagedPropertyAddress.manufacturedHome === true ? 'true' : 'false',
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
          ...dfaApplicationMain.cleanUpLog
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
          ...dfaApplicationMain.supportingDocuments
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
          ...dfaApplicationMain.signAndSubmit
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
          ...dfaApplicationMain.propertyDamage,
          //floodDamage: dfaApplicationMain.propertyDamage.floodDamage === true ? 'true' : 'false',
          //landslideDamage: dfaApplicationMain.propertyDamage.landslideDamage === true ? 'true' : 'false',
          //wildfireDamage: dfaApplicationMain.propertyDamage.wildfireDamage === true ? 'true' : 'false',
          //stormDamage: true, //dfaApplicationMain.propertyDamage.stormDamage === true ? 'true' : 'false',
          //otherDamage: true, //dfaApplicationMain.propertyDamage.otherDamage === true ? 'true' : 'false',
          lossesExceed1000: dfaApplicationMain.propertyDamage.lossesExceed1000 === true ? 'true' : 'false',
          wereYouEvacuated: dfaApplicationMain.propertyDamage.wereYouEvacuated === true ? 'true' : 'false',
          residingInResidence: dfaApplicationMain.propertyDamage.residingInResidence === true ? 'true' : 'false',
          damageFromDate: new Date(dfaApplicationMain.propertyDamage.damageFromDate),
          damageToDate: new Date(dfaApplicationMain.propertyDamage.damageToDate),
          dateReturned: new Date(dfaApplicationMain.propertyDamage.dateReturned),
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
