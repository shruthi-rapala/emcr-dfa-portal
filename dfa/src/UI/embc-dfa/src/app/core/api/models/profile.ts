/* tslint:disable */
/* eslint-disable */
import { Address } from './address';
import { ContactDetails } from './contact-details';
import { PersonDetails } from './person-details';

/**
 * User's profile
 */
export interface Profile {
  contactDetails?: ContactDetails;
  id?: null | string;
  isMailingAddressSameAsPrimaryAddress?: boolean;
  mailingAddress?: Address;
  personalDetails?: PersonDetails;
  primaryAddress?: Address;
}
