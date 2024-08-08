/* tslint:disable */
/* eslint-disable */
import { Invoice } from './invoice';
import { ProjectStageOptionSet } from './project-stage-option-set';
export interface RecoveryClaim {
  claimGrossGST?: string;
  claimNumber?: string;
  claimPST?: string;
  claimStatus?: ProjectStageOptionSet;
  invoices?: Array<Invoice>;
  isFirstClaimApproved?: boolean;
  isThisFinalClaim?: boolean;
  totalActualClaim?: string;
  totalInvoicesBeingClaimed?: string;
}
