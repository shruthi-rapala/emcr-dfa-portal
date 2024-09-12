/* tslint:disable */
/* eslint-disable */
import { ApplicationStageOptionSet } from './application-stage-option-set';

/**
 * Property Damage
 */
export interface ApplicationDetails {
  appStatus?: null | ApplicationStageOptionSet;
  applicantSubSubtype?: null | string;
  applicantSubtype?: null | string;
  damageFromDate?: null | string;
  damageToDate?: null | string;
  estimatedPercent?: null | string;
  eventId?: null | string;
  eventName?: null | string;
  floodDamage?: null | boolean;
  guidanceSupport?: null | boolean;
  landslideDamage?: null | boolean;
  legalName?: null | string;
  otherDamage?: null | boolean;
  otherDamageText?: null | string;
  stormDamage?: null | boolean;
  subtypeDFAComment?: null | string;
  subtypeOtherDetails?: null | string;
  wildfireDamage?: null | boolean;
}
