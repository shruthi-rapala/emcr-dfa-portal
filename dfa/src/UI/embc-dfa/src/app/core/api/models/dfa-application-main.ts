/* tslint:disable */
/* eslint-disable */
import { CleanUpLog } from './clean-up-log';
import { DamagedPropertyAddress } from './damaged-property-address';
import { PropertyDamage } from './property-damage';
import { SignAndSubmit } from './sign-and-submit';
import { SupportingDocuments } from './supporting-documents';
export interface DfaApplicationMain {
  cleanUpLog?: CleanUpLog;
  damagedPropertyAddress?: DamagedPropertyAddress;
  id?: string;
  propertyDamage?: PropertyDamage;
  signAndSubmit?: SignAndSubmit;
  supportingDocuments?: SupportingDocuments;
}
