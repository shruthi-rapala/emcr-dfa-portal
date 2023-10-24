/* tslint:disable */
/* eslint-disable */
import { SignatureBlock } from './signature-block';

/**
 * Damaged Property Address
 */
export interface SignAndSubmit {
  applicantSignature?: null | SignatureBlock;
  ninetyDayDeadline?: string;
  secondaryApplicantSignature?: null | SignatureBlock;
}
