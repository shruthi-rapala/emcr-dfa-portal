/* tslint:disable */
/* eslint-disable */
import { OtherContact } from './other-contact';
import { ProfileVerification } from './profile-verification';
import { PropertyDamage } from './property-damage';
export interface DfaApplicationMain {
  deleteFlag?: boolean;
  id?: string;
  notifyUser?: boolean;
  otherContact?: null | Array<OtherContact>;
  profileVerification?: null | ProfileVerification;
  propertyDamage?: null | PropertyDamage;
}
