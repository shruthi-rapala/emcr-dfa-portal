/* tslint:disable */
/* eslint-disable */
import { StatusBar } from './status-bar';
export interface CurrentApplication {
  applicationId?: string;
  applicationType?: string;
  caseNumber?: string;
  damagedAddress?: string;
  dateFileClosed?: string;
  dateOfDamage?: string;
  dateOfDamageTo?: string;
  eventId?: string;
  floodDamage?: null | boolean;
  isErrorInStatus?: boolean;
  landslideDamage?: null | boolean;
  otherDamage?: null | boolean;
  otherDamageText?: null | string;
  primaryApplicantSignedDate?: string;
  status?: string;
  statusBar?: Array<StatusBar>;
  statusLastUpdated?: string;
  stormDamage?: null | boolean;
  wildfireDamage?: null | boolean;
}
