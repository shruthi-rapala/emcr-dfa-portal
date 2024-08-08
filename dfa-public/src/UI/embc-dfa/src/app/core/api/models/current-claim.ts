/* tslint:disable */
/* eslint-disable */
import { ClaimStatusBar } from './claim-status-bar';
export interface CurrentClaim {
  applicationId?: string;
  claimId?: string;
  claimNumber?: string;
  createdDate?: string;
  deadline18Month?: string;
  emcrApprovedAmount?: string;
  estimatedCompletionDate?: string;
  finalClaim?: string;
  firstClaim?: string;
  isErrorInStatus?: boolean;
  isHidden?: boolean;
  projectId?: string;
  stage?: string;
  status?: string;
  statusBar?: Array<ClaimStatusBar>;
  statusColor?: string;
  statusLastUpdated?: string;
}
