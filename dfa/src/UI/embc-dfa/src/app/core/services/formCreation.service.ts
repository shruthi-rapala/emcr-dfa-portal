import { Injectable, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import {
  PersonDetailsForm,
  PersonDetails,
  ContactDetailsForm,
  ContactDetails,
  AddressForm,
  Address,
  RestrictionForm,
  Restriction,
} from '../model/profile.model';
import { AppTypeInsurance, AppTypeInsuranceForm, Consent, ConsentForm } from '../model/dfa-application-start.model';
import { InsuranceOption } from 'src/app/core/api/models';
import { PropertyDamageForm, DamagedPropertyAddressForm, DamagedPropertyAddress, PropertyDamage, SignAndSubmit, SupportingDocuments, DamagedRoomsForm,
  FullTimeOccupantsForm, SecondaryApplicantsForm, OtherContactsForm,
  CleanUpLogForm, SignAndSubmitForm, SupportingDocumentsForm, CleanUpLog, CleanUpLogItemsForm, SecondaryApplicant, FileUploadsForm, FullTimeOccupant, OtherContact, CleanUpLogItem, FileUpload, DamagedRoom  } from '../model/dfa-application-main.model';
import { CustomValidationService } from './customValidation.service';
import {
  Evacuated,
  EvacuatedForm,
  HouseholdMembers,
  HouseholdMembersForm,
  IdentifyNeeds,
  IdentifyNeedsForm,
  Pet,
  PetForm,
  Secret,
  SecretForm
} from '../model/needs.model';

@Injectable({ providedIn: 'root' })
export class FormCreationService {
  public insuranceOptionChanged: EventEmitter<InsuranceOption>;
  public secondaryApplicantsChanged: EventEmitter<Array<SecondaryApplicant>>;
  public signaturesChanged: EventEmitter<UntypedFormGroup>;
  public AppTypeInsuranceData: AppTypeInsurance;

  restrictionForm: BehaviorSubject<UntypedFormGroup | undefined> =
    new BehaviorSubject(
      this.formBuilder.group(new RestrictionForm(new Restriction()))
    );

  restrictionForm$: Observable<UntypedFormGroup> =
    this.restrictionForm.asObservable();

  // profile
  personalDetailsForm: BehaviorSubject<UntypedFormGroup | undefined> =
    new BehaviorSubject(
      this.formBuilder.group(
        new PersonDetailsForm(new PersonDetails(), this.customValidator)
      )
    );

  personalDetailsForm$: Observable<UntypedFormGroup> =
    this.personalDetailsForm.asObservable();

  contactDetailsForm: BehaviorSubject<UntypedFormGroup | undefined> =
    new BehaviorSubject(
      this.formBuilder.group(
        new ContactDetailsForm(new ContactDetails(), this.customValidator)
      )
    );

  contactDetailsForm$: Observable<UntypedFormGroup> =
    this.contactDetailsForm.asObservable();

  addressForm: BehaviorSubject<UntypedFormGroup | undefined> =
    new BehaviorSubject(
      this.formBuilder.group(
        new AddressForm(new Address(), this.formBuilder, this.customValidator)
      )
    );

  addressForm$: Observable<UntypedFormGroup> = this.addressForm.asObservable();

  appTypeInsuranceForm: BehaviorSubject<UntypedFormGroup | undefined> =
    new BehaviorSubject(
      this.formBuilder.group(
        new AppTypeInsuranceForm(
          new AppTypeInsurance(), this.formBuilder
        )
      )
    );

  appTypeInsuranceForm$: Observable<UntypedFormGroup> =
    this.appTypeInsuranceForm.asObservable();

  consentForm: BehaviorSubject<UntypedFormGroup | undefined> =
    new BehaviorSubject(
      this.formBuilder.group(
        new ConsentForm(
          new Consent()
        )
      )
    );

  consentForm$: Observable<UntypedFormGroup | undefined> =
   this.consentForm.asObservable();

  // profileVerificationForm: BehaviorSubject<UntypedFormGroup | undefined> =
  //  new BehaviorSubject(
  //    this.formBuilder.group(
  //      new ProfileVerificationForm(
  //        new ProfileVerification()
  //      )
  //    )
  //  );

  // profileVerificationForm$: Observable<UntypedFormGroup | undefined> =
  //   this.profileVerificationForm.asObservable();

  // DFA Applciation Main Forms
  damagedPropertyAddressForm: BehaviorSubject<UntypedFormGroup | undefined> =
    new BehaviorSubject(
      this.formBuilder.group(
       new DamagedPropertyAddressForm(
         new DamagedPropertyAddress(),
         this.customValidator
       )
     )
   );

  damagedPropertyAddressForm$: Observable<UntypedFormGroup | undefined> =
    this.damagedPropertyAddressForm.asObservable();

  propertyDamageForm: BehaviorSubject<UntypedFormGroup | undefined> =
    new BehaviorSubject(
      this.formBuilder.group(
       new PropertyDamageForm(
         new PropertyDamage()
       )
     )
   );

  propertyDamageForm$: Observable<UntypedFormGroup | undefined> =
    this.propertyDamageForm.asObservable();

  fullTimeOccupantsForm: BehaviorSubject<UntypedFormGroup | undefined> =
    new BehaviorSubject(
      this.formBuilder.group(
       new FullTimeOccupantsForm(
         new Array<FullTimeOccupant>(),
         this.customValidator,
         this.formBuilder
       )
     )
   );

  fullTimeOccupantsForm$: Observable<UntypedFormGroup | undefined> =
    this.fullTimeOccupantsForm.asObservable();

  otherContactsForm: BehaviorSubject<UntypedFormGroup | undefined> =
    new BehaviorSubject(
      this.formBuilder.group(
       new OtherContactsForm(
         new Array<OtherContact>(),
         this.customValidator,
         this.formBuilder
       )
     )
   );

  otherContactsForm$: Observable<UntypedFormGroup | undefined> =
    this.otherContactsForm.asObservable();

  secondaryApplicantsForm: BehaviorSubject<UntypedFormGroup | undefined> =
    new BehaviorSubject(
      this.formBuilder.group(
       new SecondaryApplicantsForm(
         new Array<SecondaryApplicant>(),
         this.customValidator,
         this.formBuilder
       )
     )
   );

  secondaryApplicantsForm$: Observable<UntypedFormGroup | undefined> =
    this.secondaryApplicantsForm.asObservable();

  cleanUpLogForm: BehaviorSubject<UntypedFormGroup | undefined> =
    new BehaviorSubject(
      this.formBuilder.group(
       new CleanUpLogForm(
         new CleanUpLog(),
       )
     )
   );

  cleanUpLogForm$: Observable<UntypedFormGroup | undefined> =
    this.cleanUpLogForm.asObservable();

  cleanUpLogItemsForm: BehaviorSubject<UntypedFormGroup | undefined> =
    new BehaviorSubject(
      this.formBuilder.group(
       new CleanUpLogItemsForm(
         new Array<CleanUpLogItem>(),
         this.customValidator,
         this.formBuilder
       )
     )
   );

  cleanUpLogItemsForm$: Observable<UntypedFormGroup | undefined> =
    this.cleanUpLogItemsForm.asObservable();

  fileUploadsForm: BehaviorSubject<UntypedFormGroup | undefined> =
    new BehaviorSubject(
      this.formBuilder.group(
       new FileUploadsForm(
         new Array<FileUpload>(),
         this.customValidator,
         this.formBuilder
       )
     )
   );

  fileUploadsForm$: Observable<UntypedFormGroup | undefined> =
    this.fileUploadsForm.asObservable();

  damagedRoomsForm: BehaviorSubject<UntypedFormGroup | undefined> =
    new BehaviorSubject(
      this.formBuilder.group(
       new DamagedRoomsForm(
         new Array<DamagedRoom>(),
         this.customValidator,
         this.formBuilder
       )
     )
   );

  damagedRoomsForm$: Observable<UntypedFormGroup | undefined> =
    this.damagedRoomsForm.asObservable();

  supportingDocumentsForm: BehaviorSubject<UntypedFormGroup | undefined> =
    new BehaviorSubject(
      this.formBuilder.group(
       new SupportingDocumentsForm(
         new SupportingDocuments(),
       )
     )
   );

  supportingDocumentsForm$: Observable<UntypedFormGroup | undefined> =
    this.supportingDocumentsForm.asObservable();

  signAndSubmitForm: BehaviorSubject<UntypedFormGroup | undefined> =
    new BehaviorSubject(
      this.formBuilder.group(
       new SignAndSubmitForm(
         new SignAndSubmit(),
         this.formBuilder
       )
     )
   );

  signAndSubmitForm$: Observable<UntypedFormGroup | undefined> =
    this.signAndSubmitForm.asObservable();

  evacuatedForm: BehaviorSubject<UntypedFormGroup | undefined> =
    new BehaviorSubject(
      this.formBuilder.group(
        new EvacuatedForm(
          new Evacuated(),
          this.formBuilder,
          this.customValidator
        )
      )
    );

  evacuatedForm$: Observable<UntypedFormGroup> =
    this.evacuatedForm.asObservable();

  householdMembersForm: BehaviorSubject<UntypedFormGroup | undefined> =
    new BehaviorSubject(
      this.formBuilder.group(
        new HouseholdMembersForm(
          new HouseholdMembers(),
          this.customValidator,
          this.formBuilder
        )
      )
    );

  householdMembersForm$: Observable<UntypedFormGroup> =
    this.householdMembersForm.asObservable();

  petsForm: BehaviorSubject<UntypedFormGroup | undefined> = new BehaviorSubject(
    this.formBuilder.group(
      new PetForm(new Pet(), this.customValidator, this.formBuilder)
    )
  );

  petsForm$: Observable<UntypedFormGroup> = this.petsForm.asObservable();

  identifyNeedsForm: BehaviorSubject<UntypedFormGroup | undefined> =
    new BehaviorSubject(
      this.formBuilder.group(new IdentifyNeedsForm(new IdentifyNeeds()))
    );

  identifyNeedsForm$: Observable<UntypedFormGroup> =
    this.identifyNeedsForm.asObservable();

  secretForm: BehaviorSubject<UntypedFormGroup | undefined> =
    new BehaviorSubject(this.formBuilder.group(new SecretForm(new Secret())));

  secretForm$: Observable<UntypedFormGroup> = this.secretForm.asObservable();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private customValidator: CustomValidationService
  ) {
    this.insuranceOptionChanged = new EventEmitter<InsuranceOption>();
    this.secondaryApplicantsChanged = new EventEmitter<Array<SecondaryApplicant>>();
    this.signaturesChanged = new EventEmitter<UntypedFormGroup>;
  }

  getRestrictionForm(): Observable<UntypedFormGroup> {
    return this.restrictionForm$;
  }

  setRestrictionForm(restrictionForm: UntypedFormGroup): void {
    this.restrictionForm.next(restrictionForm);
  }

  getPersonalDetailsForm(): Observable<UntypedFormGroup> {
    return this.personalDetailsForm$;
  }

  setPersonDetailsForm(personForm: UntypedFormGroup): void {
    this.personalDetailsForm.next(personForm);
  }

  getContactDetailsForm(): Observable<UntypedFormGroup> {
    return this.contactDetailsForm$;
  }

  setContactDetailsForm(contactForm: UntypedFormGroup): void {
    this.contactDetailsForm.next(contactForm);
  }

  getAddressForm(): Observable<UntypedFormGroup> {
    return this.addressForm$;
  }

  setAddressForm(addressForm: UntypedFormGroup): void {
    this.addressForm.next(addressForm);
  }

  getEvacuatedForm(): Observable<UntypedFormGroup> {
    return this.evacuatedForm$;
  }

  setEvacuatedForm(evacuatedForm: UntypedFormGroup): void {
    this.evacuatedForm.next(evacuatedForm);
  }

  getHouseholdMembersForm(): Observable<UntypedFormGroup> {
    return this.householdMembersForm$;
  }

  setHouseholdMembersForm(householdMembersForm: UntypedFormGroup): void {
    this.householdMembersForm.next(householdMembersForm);
  }

  getPetsForm(): Observable<UntypedFormGroup> {
    return this.petsForm$;
  }

  setPetsForm(petsForm: UntypedFormGroup): void {
    this.petsForm.next(petsForm);
  }

  getIndentifyNeedsForm(): Observable<UntypedFormGroup> {
    return this.identifyNeedsForm$;
  }

  setIdentifyNeedsForm(identifyNeedsForm: UntypedFormGroup): void {
    this.identifyNeedsForm.next(identifyNeedsForm);
  }

  getSecretForm(): Observable<UntypedFormGroup> {
    return this.secretForm$;
  }

  setSecretForm(secretForm: UntypedFormGroup): void {
    this.secretForm.next(secretForm);
  }

  clearProfileData(): void {
    this.restrictionForm.next(
      this.formBuilder.group(new RestrictionForm(new Restriction()))
    );
    this.addressForm.next(
      this.formBuilder.group(
        new AddressForm(new Address(), this.formBuilder, this.customValidator)
      )
    );
    this.personalDetailsForm.next(
      this.formBuilder.group(
        new PersonDetailsForm(new PersonDetails(), this.customValidator)
      )
    );
    this.contactDetailsForm.next(
      this.formBuilder.group(
        new ContactDetailsForm(new ContactDetails(), this.customValidator)
      )
    );

  }

  clearNeedsAssessmentData(): void {
    this.evacuatedForm.next(
      this.formBuilder.group(
        new EvacuatedForm(
          new Evacuated(),
          this.formBuilder,
          this.customValidator
        )
      )
    );
    this.householdMembersForm.next(
      this.formBuilder.group(
        new HouseholdMembersForm(
          new HouseholdMembers(),
          this.customValidator,
          this.formBuilder
        )
      )
    );
    this.petsForm.next(
      this.formBuilder.group(
        new PetForm(new Pet(), this.customValidator, this.formBuilder)
      )
    );
    this.identifyNeedsForm.next(
      this.formBuilder.group(new IdentifyNeedsForm(new IdentifyNeeds()))
    );
    this.secretForm.next(this.formBuilder.group(new SecretForm(new Secret())));
  }

  getAppTypeInsuranceForm(): Observable<UntypedFormGroup> {
    return this.appTypeInsuranceForm$;
  }

  setAppTypeInsuranceForm(appTypeInsuranceForm: UntypedFormGroup): void {
    this.appTypeInsuranceForm.next(appTypeInsuranceForm);
  }

  clearAppTypeInsuranceData(): void {
    this.appTypeInsuranceForm.next(
      this.formBuilder.group(
        new AppTypeInsuranceForm(
          new AppTypeInsurance(), this.formBuilder
        )
      )
    );
  }

  getConsentForm(): Observable<UntypedFormGroup> {
    return this.consentForm$;
  }

  setConsentForm(consentForm: UntypedFormGroup): void {
    this.consentForm.next(consentForm);
  }

  clearConsentData(): void {
    this.consentForm.next(
      this.formBuilder.group(
        new ConsentForm(
          new Consent()
        )
      )
    );
  }

  // getProfileVerificationForm(): Observable<UntypedFormGroup> {
  //   return this.profileVerificationForm$;
  // }

  // setProfileVerificationForm(profileVerificationForm: UntypedFormGroup): void {
  //   this.profileVerificationForm.next(profileVerificationForm);
  // }

  // clearProfileVerificationData(): void {
  //   this.profileVerificationForm.next(
  //     this.formBuilder.group(
  //       new ProfileVerificationForm(
  //         new ProfileVerification()
  //       )
  //     )
  //   );
  // }

  getDamagedPropertyAddressForm(): Observable<UntypedFormGroup> {
    return this.damagedPropertyAddressForm$;
  }

  setDamagedPropertyAddressForm(damagedPropertyAddressForm: UntypedFormGroup): void {
    this.appTypeInsuranceForm.next(damagedPropertyAddressForm);
  }

  clearDamagedPropertyAddressData(): void {
    this.damagedPropertyAddressForm.next(
      this.formBuilder.group(
        new DamagedPropertyAddressForm(
          new DamagedPropertyAddress(),
          this.customValidator
        )
      )
    );
  }

  getPropertyDamageForm(): Observable<UntypedFormGroup> {
    return this.propertyDamageForm$;
  }

  setPropertyDamageForm(propertyDamageForm: UntypedFormGroup): void {
    this.propertyDamageForm.next(propertyDamageForm);
  }

  clearPropertyDamageData(): void {
    this.propertyDamageForm.next(
      this.formBuilder.group(
        new PropertyDamageForm(
          new PropertyDamage()
        )
      )
    );
  }

  getFullTimeOccupantsForm(): Observable<UntypedFormGroup> {
    return this.fullTimeOccupantsForm$;
  }

  setFullTimeOccupantsForm(fullTimeOccupantsForm: UntypedFormGroup): void {
    this.fullTimeOccupantsForm.next(fullTimeOccupantsForm);
  }

  clearFullTimeOccupantsData(): void {
    this.fullTimeOccupantsForm.next(
      this.formBuilder.group(
        new FullTimeOccupantsForm(
          new Array<FullTimeOccupant>(),
          this.customValidator,
          this.formBuilder
        )
      )
    );
  }

  getOtherContactsForm(): Observable<UntypedFormGroup> {
    return this.otherContactsForm$;
  }

  setOtherContactsForm(otherContactsForm: UntypedFormGroup): void {
    this.otherContactsForm.next(otherContactsForm);
  }

  clearOtherContactsData(): void {
    this.otherContactsForm.next(
      this.formBuilder.group(
        new OtherContactsForm(
          new Array<OtherContact>(),
          this.customValidator,
          this.formBuilder
        )
      )
    );
  }

  getSecondaryApplicantsForm(): Observable<UntypedFormGroup> {
    return this.secondaryApplicantsForm$;
  }

  setSecondaryApplicantsForm(secondaryApplicantsForm: UntypedFormGroup): void {
    this.secondaryApplicantsForm.next(secondaryApplicantsForm);
  }

  clearSecondaryApplicantsData(): void {
    this.secondaryApplicantsForm.next(
      this.formBuilder.group(
        new SecondaryApplicantsForm(
          new Array<SecondaryApplicant>(),
          this.customValidator,
          this.formBuilder
        )
      )
    );
  }

  getCleanUpLogForm(): Observable<UntypedFormGroup> {
    return this.cleanUpLogForm$;
  }

  setCleanUpLogForm(cleanUpLogForm: UntypedFormGroup): void {
    this.cleanUpLogForm.next(cleanUpLogForm);
  }

  clearCleanUpLogData(): void {
    this.cleanUpLogForm.next(
      this.formBuilder.group(
        new CleanUpLogForm(
          new CleanUpLog()
        )
      )
    );
  }

  getCleanUpLogItemsForm(): Observable<UntypedFormGroup> {
    return this.cleanUpLogItemsForm$;
  }

  setCleanUpLogItemsForm(cleanUpLogItemsForm: UntypedFormGroup): void {
    this.cleanUpLogForm.next(cleanUpLogItemsForm);
  }

  clearCleanUpLogItemsData(): void {
    this.cleanUpLogItemsForm.next(
      this.formBuilder.group(
        new CleanUpLogItemsForm(
          new Array<CleanUpLogItem>(),
          this.customValidator,
          this.formBuilder
        )
      )
    );
  }

  getDamagedRoomsForm(): Observable<UntypedFormGroup> {
    return this.damagedRoomsForm$;
  }

  setDamagedRoomsForm(damagedRoomsForm: UntypedFormGroup): void {
    this.damagedRoomsForm.next(damagedRoomsForm);
  }

  clearDamagedRoomsData(): void {
    this.damagedRoomsForm.next(
      this.formBuilder.group(
        new DamagedRoomsForm(
          new Array<DamagedRoom>(),
          this.customValidator,
          this.formBuilder
        )
      )
    );
  }

  getFileUploadsForm(): Observable<UntypedFormGroup> {
    return this.fileUploadsForm$;
  }

  setFileUploadsForm(fileUploadsForm: UntypedFormGroup): void {
    this.fileUploadsForm.next(fileUploadsForm);
  }

  clearFileUploadsData(): void {
    this.fileUploadsForm.next(
      this.formBuilder.group(
        new FileUploadsForm(
          new Array<FileUpload>(),
          this.customValidator,
          this.formBuilder
        )
      )
    );
  }

  getSupportingDocumentsForm(): Observable<UntypedFormGroup> {
    return this.supportingDocumentsForm$;
  }

  setSupportingDocumentsForm(supportingDocumentsForm: UntypedFormGroup): void {
    this.supportingDocumentsForm.next(supportingDocumentsForm);
  }

  clearSupportingDocumentsData(): void {
    this.supportingDocumentsForm.next(
      this.formBuilder.group(
        new SupportingDocumentsForm(
          new SupportingDocuments()
        )
      )
    );
  }

  getSignAndSubmitForm(): Observable<UntypedFormGroup> {
    return this.signAndSubmitForm$;
  }

  setSignAndSubmitForm(signAndSubmitForm: UntypedFormGroup): void {
    this.signAndSubmitForm.next(signAndSubmitForm);
  }

  clearSignAndSubmitData(): void {
    this.signAndSubmitForm.next(
      this.formBuilder.group(
        new SignAndSubmitForm(
          new SignAndSubmit(),
          this.formBuilder
        )
      )
    );
  }
}
