/* tslint:disable */
/* eslint-disable */
import { ApplicantSubtypeSubCategories } from './applicant-subtype-sub-categories';

/**
 * Property Damage
 */
export interface PropertyDamage {
  applicantSubSubtype?: null | ApplicantSubtypeSubCategories;
  applicantSubtype?: null | string;
  damageFromDate?: null | string;
  damageToDate?: null | string;
  estimatedPercent?: null | string;
  floodDamage?: null | boolean;
  guidanceSupport?: null | boolean;
  landslideDamage?: null | boolean;
  otherDamage?: null | boolean;
  otherDamageText?: null | string;
  stormDamage?: null | boolean;
  subtypeDFAComment?: null | string;
  subtypeOtherDetails?: null | string;
  wildfireDamage?: null | boolean;
}
