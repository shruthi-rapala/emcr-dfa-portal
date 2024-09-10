import { BCeIdBusiness } from './../../../../core/api/models/b-ce-id-business';
import { AppCity } from './../../../../core/api/models/app-city';
import { Component, OnInit, NgModule, Inject, OnDestroy, Input } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup
} from '@angular/forms';
import { CommonModule, KeyValue } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormCreationService } from 'src/app/core/services/formCreation.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DirectivesModule } from '../../../../core/directives/directives.module';
import { CustomValidationService } from 'src/app/core/services/customValidation.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { DFAApplicationMainDataService } from 'src/app/feature-components/dfa-application-main/dfa-application-main-data.service';
import { ApplicantOption, ApplicantSubtypeSubCategories, AppProvince } from 'src/app/core/api/models';
import { MatTableModule } from '@angular/material/table';
import { CustomPipeModule } from 'src/app/core/pipe/customPipe.module';
import { DFADeleteConfirmDialogComponent } from '../../../../core/components/dialog-components/dfa-confirm-delete-dialog/dfa-confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxMaskDirective, NgxMaskPipe, NgxMaskService, provideNgxMask } from 'ngx-mask';
import { ApplicationService, OtherContactService } from 'src/app/core/api/services';
import { DFAApplicationMainMappingService } from 'src/app/feature-components/dfa-application-main/dfa-application-main-mapping.service';
import { MatSelectModule } from '@angular/material/select';
import { ContactService } from 'src/app/core/api/services';
import { LoginService } from 'src/app/core/services/login.service';
import { BCeIdLookupService } from 'src/app/core/api/services/b-ce-id-lookup.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export default class ContactsComponent implements OnInit, OnDestroy {
  contactsForm: UntypedFormGroup;
  formBuilder: UntypedFormBuilder;
  contactsForm$: Subscription;
  formCreationService: FormCreationService;
  isReadOnly: boolean = false;
  vieworedit: string = "";
  appCities: AppCity[];
  appProvinces: AppProvince[];
  
  
  constructor(
    @Inject('formBuilder') formBuilder: UntypedFormBuilder,
    @Inject('formCreationService') formCreationService: FormCreationService,
    public customValidator: CustomValidationService,
    public dfaApplicationMainDataService: DFAApplicationMainDataService,
    private applicationService: ApplicationService,
    private dfaApplicationMainMapping: DFAApplicationMainMappingService,
    private otherContactsService: OtherContactService,
    private contactService: ContactService,
    private loginService: LoginService,
    private bceidLookupService: BCeIdLookupService,
    public dialog: MatDialog
  ) {
    this.formBuilder = formBuilder;
    this.formCreationService = formCreationService;
    this.isReadOnly = (dfaApplicationMainDataService.getViewOrEdit() === 'view'
      || dfaApplicationMainDataService.getViewOrEdit() === 'edit'
      || dfaApplicationMainDataService.getViewOrEdit() === 'viewOnly');
    this.setViewOrEditControls();

    this.dfaApplicationMainDataService.changeViewOrEdit.subscribe((vieworedit) => {
      this.isReadOnly = (vieworedit === 'view'
        || vieworedit === 'edit'
        || vieworedit === 'viewOnly');
      this.setViewOrEditControls();
    })

    this.vieworedit = dfaApplicationMainDataService.getViewOrEdit();
  }

  setViewOrEditControls() {
    if (!this.contactsForm) return;
    if (this.isReadOnly) {
      this.contactsForm.controls.doingBusinessAs.disable();
      this.contactsForm.controls.businessNumber.disable();
      this.contactsForm.controls.mailingAddress1.disable();
      this.contactsForm.controls.mailingAddress2.disable();
      this.contactsForm.controls.city.disable();
      this.contactsForm.controls.province.disable();
      this.contactsForm.controls.postalCode.disable();
      this.contactsForm.controls.primaryContactSearch.disable();
      this.contactsForm.controls.primaryContactValidated.disable();
      this.contactsForm.controls.primaryContactDisplay.disable();

    } else {
      this.contactsForm.controls.doingBusinessAs.disable();
      this.contactsForm.controls.businessNumber.enable();
      this.contactsForm.controls.mailingAddress1.enable();
      this.contactsForm.controls.mailingAddress2.enable();
      this.contactsForm.controls.city.enable();
      this.contactsForm.controls.province.enable();
      this.contactsForm.controls.postalCode.enable();
      this.contactsForm.controls.primaryContactSearch.enable();
      this.contactsForm.controls.primaryContactValidated.enable();
      this.contactsForm.controls.primaryContactDisplay.enable();

    }
  }

  ngOnInit(): void {
    this.contactsForm$ = this.formCreationService
      .getContactsForm()
      .subscribe((contactDetails) => {
        contactDetails.controls.legalName.setValue(this.dfaApplicationMainDataService.getBusiness());
        this.contactsForm = contactDetails;
        this.setViewOrEditControls();
        this.dfaApplicationMainDataService.contacts = {
          legalName: this.dfaApplicationMainDataService.getBusiness(),
          doingBusinessAs: null,
          mailingAddress1: null,
          mailingAddress2: null,
          city: null,
          province: null,
          postalCode: null,
          primaryContactSearch: null,
          primaryContactValidated: false,
          primaryContactDisplay: null

        }
      });


      this.contactsForm
      .get('primaryContactSearch')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.contactsForm.get('primaryContactSearch').reset();
        }
      });

      this.contactService.contactGetAppCities().subscribe({
        next: (appCities) => {
          this.appCities = appCities;
        },
        error: (error) => {
          console.error(error);
          //document.location.href = 'https://dfa.gov.bc.ca/error.html';
        }
      });  
      
      this.contactService.contactGetAppProvinces().subscribe({
        next: (appProvinces) => {
          this.appProvinces = appProvinces;
        },
        error: (error) => {
          console.error(error);
          //document.location.href = 'https://dfa.gov.bc.ca/error.html';
        }
      });  

      this.getContactsForApplication(this.dfaApplicationMainDataService.getApplicationId());
  };

  getContactsForApplication(applicationId: string) {
    if (applicationId) {

    }
  }

  onSelectCity(citySelected: AppCity) {

  }

  onSelectProvince(provSelected: AppProvince) {

  }

  searchForContact() {
    var userId = this.contactsForm.get('primaryContactSearch')?.value;
    console.debug("searchForContact parameter: " + userId);

    if (userId) {
      this.bceidLookupService.bCeIdLookupGetBCeIdOtherInfo({userId}).subscribe((bceidBusiness: BCeIdBusiness) => {
        if (bceidBusiness && bceidBusiness.isValidResponse) {
          console.log('Primary contact: ' + bceidBusiness.individualFirstname + ' ' + bceidBusiness.individualSurname);

          // found a valid Primary Contact
          this.dfaApplicationMainDataService.contacts = {
            primaryContactSearch: bceidBusiness.userId,
            primaryContactValidated: true,
            primaryContactDisplay: bceidBusiness.individualFirstname + ' ' + bceidBusiness.individualSurname,
          }
          this.contactsForm.get('primaryContactSearch').setValue(bceidBusiness.userId);
        }
        else {
          this.dfaApplicationMainDataService.contacts = {
            primaryContactValidated: false,
            primaryContactDisplay: '** Not Found **',
          }
        }    
      });
    }
    else {
      this.dfaApplicationMainDataService.contacts = {
        primaryContactValidated: false,
        primaryContactDisplay: '',
      }
    }
  }

  ngOnDestroy(): void {
    this.contactsForm$.unsubscribe();
  }
}
  
@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    DirectivesModule,
    MatTableModule,
    CustomPipeModule,
    NgxMaskDirective, NgxMaskPipe,
    MatSelectModule
  ],
  declarations: [ContactsComponent]
})
class ContactsModule { }


