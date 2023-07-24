/* tslint:disable */
/* eslint-disable */
import { Address } from './address';
import { ContactDetails } from './contact-details';
import { PersonDetails } from './person-details';

/**
 * User's profile
 */
export interface Profile {
  bcServiceCardId?: null | string;
  contactDetails?: ContactDetails;
  id?: null | string;
  isMailingAddressSameAsPrimaryAddress?: string;
  mailingAddress?: Address;
  personalDetails?: PersonDetails;
  primaryAddress?: Address;
}
