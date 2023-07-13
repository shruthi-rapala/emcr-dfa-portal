/* tslint:disable */
/* eslint-disable */
import { ApplicantOption } from './applicant-option';
import { FarmOption } from './farm-option';
import { InsuranceOption } from './insurance-option';
import { SignatureBlock } from './signature-block';
import { SmallBusinessOption } from './small-business-option';

/**
 * Application Type and Insurance
 */
export interface AppTypeInsurance {
  applicantOption?: ApplicantOption;
  applicantSignature?: null | SignatureBlock;
  farmOption?: null | FarmOption;
  insuranceOption?: InsuranceOption;
  secondaryApplicantSignature?: null | SignatureBlock;
  smallBusinessOption?: null | SmallBusinessOption;
}
