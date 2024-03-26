/* tslint:disable */
/* eslint-disable */
import { SignatureBlock } from './signature-block';

/**
 * Damaged Property Address
 */
export interface SignAndSubmit {
  applicantSignature?: null | SignatureBlock;
  ninetyDayDeadline?: null | string;
  secondaryApplicantSignature?: null | SignatureBlock;
}
