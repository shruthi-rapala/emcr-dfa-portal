/* tslint:disable */
/* eslint-disable */
import { SecondaryApplicantTypeOption } from './secondary-applicant-type-option';

/**
 * Seoondary Applicant
 */
export interface SecondaryApplicant {
  applicantType?: SecondaryApplicantTypeOption;
  applicationId?: string;
  deleteFlag?: boolean;
  email?: string;
  firstName?: string;
  id?: null | string;
  lastName?: string;
  phoneNumber?: string;
}
