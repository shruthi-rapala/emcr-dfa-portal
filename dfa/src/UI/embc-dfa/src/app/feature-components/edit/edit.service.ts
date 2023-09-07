import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { FormCreationService } from 'src/app/core/services/formCreation.service';
import { ProfileDataService } from '../profile/profile-data.service';

@Injectable({ providedIn: 'root' })
export class EditService {
  constructor(
    private profileDataService: ProfileDataService,
    private formCreationService: FormCreationService,
  ) {}

  /**
   * Updates the form with latest values
   *
   * @param component current component name
   */
  saveFormData(component: string, form: UntypedFormGroup, path: string): void {
    switch (component) {
      case 'personal-details':
        this.profileDataService.personalDetails = form.value;
        break;
      case 'address':
        this.profileDataService.primaryAddressDetails =
          form.get('address').value;
        this.profileDataService.mailingAddressDetails =
          form.get('mailingAddress').value;
        this.profileDataService.IsMailingAddressSameAsPrimaryAddressDetails =
          form.get('isNewMailingAddress').value;
        let evacFromPrimary: string;

        if (evacFromPrimary === 'Yes') {
          const evacuationAddress = form.get('address').value;
        }
        break;
      case 'contact-info':
        this.profileDataService.contactDetails = form.value;
        break;
      default:
    }
  }

  /**
   * Cancels the updates and sets the form with existing values
   *
   * @param component current component name
   * @param form  form to update
   */
  cancelFormData(
    component: string,
    form: UntypedFormGroup,
    path: string
  ): void {
    switch (component) {
      case 'personal-details':
        if (this.profileDataService.personalDetails !== undefined) {
          form.patchValue(this.profileDataService.personalDetails);
        } else {
          form.reset();
        }
        break;
      case 'address':
        if (
          this.profileDataService.primaryAddressDetails !== undefined &&
          this.profileDataService.mailingAddressDetails !== undefined
        ) {
          form
            .get('address')
            .patchValue(this.profileDataService.primaryAddressDetails);
          form
            .get('mailingAddress')
            .patchValue(this.profileDataService.mailingAddressDetails);
        } else {
          form.reset();
        }
        break;
      case 'contact-info':
        if (this.profileDataService.contactDetails !== undefined) {
          form.patchValue(this.profileDataService.contactDetails);
        } else {
          form.reset();
        }
        break;
      default:
    }
  }

}
