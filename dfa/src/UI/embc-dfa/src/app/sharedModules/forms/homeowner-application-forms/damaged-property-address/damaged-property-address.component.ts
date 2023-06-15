import { Component, OnInit, NgModule, Inject, OnDestroy } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  AbstractControl,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormCreationService } from 'src/app/core/services/formCreation.service';
import { Subscription } from 'rxjs';
import { DirectivesModule } from '../../../../core/directives/directives.module';
import { CustomValidationService } from 'src/app/core/services/customValidation.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { RegAddress } from 'src/app/core/model/address';
import { AddressFormsModule } from '../../address-forms/address-forms.module';

@Component({
  selector: 'app-damaged-property-address',
  templateUrl: './damaged-property-address.component.html',
  styleUrls: ['./damaged-property-address.component.scss']
})
export default class DamagedPropertyAddressComponent implements OnInit, OnDestroy {
  damagedPropertyAddressForm: UntypedFormGroup;
  formBuilder: UntypedFormBuilder;
  damagedPropertyAddressForm$: Subscription;
  formCreationService: FormCreationService;
  useProfileAddress: string = "1";
  private _profileAddress: RegAddress;

  constructor(
    @Inject('formBuilder') formBuilder: UntypedFormBuilder,
    @Inject('formCreationService') formCreationService: FormCreationService,
    public customValidator: CustomValidationService
  ) {
    this.formBuilder = formBuilder;
    this.formCreationService = formCreationService;
  }

  public get profileAddress(): RegAddress {
    return this._profileAddress;
  }
  public set profileAddress(value: RegAddress) {
    this._profileAddress = value;
  }

  ngOnInit(): void {
    this.damagedPropertyAddressForm$ = this.formCreationService
      .getDamagedPropertyAddressForm()
      .subscribe((damagedPropertyAddress) => {
        this.damagedPropertyAddressForm = damagedPropertyAddress;
        this.damagedPropertyAddressForm.updateValueAndValidity();
      });


    this.damagedPropertyAddressForm
      .get('addressLine1')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.damagedPropertyAddressForm.get('addressLine1').reset();
        }
      });

    this.damagedPropertyAddressForm
      .get('addressLine2')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.damagedPropertyAddressForm.get('addressLine2').reset();
        }
      });

    this.damagedPropertyAddressForm
      .get('community')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.damagedPropertyAddressForm.get('community').reset();
        }
      });

    this.damagedPropertyAddressForm
      .get('stateProvince')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.damagedPropertyAddressForm.get('stateProvince').reset();
        }
      });

    this.damagedPropertyAddressForm
      .get('country')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.damagedPropertyAddressForm.get('country').reset();
        }
      });

    this.damagedPropertyAddressForm
      .get('postalCode')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.damagedPropertyAddressForm.get('postalCode').reset();
        }
      });

    this.damagedPropertyAddressForm
      .get('occupyAsPrimaryResidence')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.damagedPropertyAddressForm.get('occupyAsPrimaryResidence').reset();
        }
      });

    this.damagedPropertyAddressForm
      .get('onAFirstNationsReserve')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.damagedPropertyAddressForm.get('onAFirstNationsReserve').reset();
        }
      });

    this.damagedPropertyAddressForm
      .get('firstNationsReserve')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.damagedPropertyAddressForm.get('firstNationsReserve').reset();
        }
      });

    this.damagedPropertyAddressForm
      .get('manufacturedHome')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.damagedPropertyAddressForm.get('manufacturedHome').reset();
        }
      });

    this.damagedPropertyAddressForm
      .get('eligibleForHomeOwnerGrant')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.damagedPropertyAddressForm.get('eligibleForHomeOwnerGrant').reset();
        }
      });

    // TODO: retrieve actual profile address
    this.profileAddress = {
      addressLine1: "564 Vedder Rd.",
      addressLine2: null,
      community: "Abbotsford",
      country: { name: "Canada", code: "CAN" },
      stateProvince: "BC",
      postalCode: "V1V 1V1"
    }
    this.onUseProfileAddressChoice("1");
  }

  onUseProfileAddressChoice(choice: any) {
    this.damagedPropertyAddressForm.controls.country.setValue("Canada");
    this.damagedPropertyAddressForm.controls.stateProvince.setValue("BC");
    if (!choice.value) return; // not a radio button change
    if (choice.value == "0") // yes
    {
      // TODO: Update these values from Profile
      this.damagedPropertyAddressForm.controls.addressLine1.setValue(this.profileAddress.addressLine1);
      this.damagedPropertyAddressForm.controls.addressLine2.setValue(this.profileAddress.addressLine2);
      this.damagedPropertyAddressForm.controls.community.setValue(this.profileAddress.community);
      this.damagedPropertyAddressForm.controls.country.setValue(this.profileAddress.country.name);
      this.damagedPropertyAddressForm.controls.stateProvince.setValue(this.profileAddress.stateProvince);
      this.damagedPropertyAddressForm.controls.postalCode.setValue(this.profileAddress.postalCode);

    } else { // no

      this.damagedPropertyAddressForm.controls.addressLine1.setValue(null);
      this.damagedPropertyAddressForm.controls.addressLine2.setValue(null);
      this.damagedPropertyAddressForm.controls.community.setValue(null);
      this.damagedPropertyAddressForm.controls.postalCode.setValue(null);

    }
  }

  /**
   * Returns the control of the form
   */
  get damagedPropertyAddressFormControl(): { [key: string]: AbstractControl } {
    return this.damagedPropertyAddressForm.controls;
  }

  ngOnDestroy(): void {
    this.damagedPropertyAddressForm$.unsubscribe();
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    DirectivesModule,
    AddressFormsModule
  ],
  declarations: [DamagedPropertyAddressComponent]
})
class DamagedPropertyAddressModule {}
