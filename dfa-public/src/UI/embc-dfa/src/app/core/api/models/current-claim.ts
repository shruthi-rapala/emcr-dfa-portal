/* tslint:disable */
/* eslint-disable */
import { ClaimStatusBar } from './claim-status-bar';
export interface CurrentClaim {
  applicationId?: string;
  claimId?: string;
  createdDate?: string;
  deadline18Month?: string;
  emcrApprovedAmount?: string;
  estimatedCompletionDate?: string;
  isErrorInStatus?: boolean;
  isHidden?: boolean;
  projectId?: string;
  projectName?: string;
  projectNumber?: string;
  siteLocation?: string;
  stage?: string;
  status?: string;
  statusBar?: Array<ClaimStatusBar>;
  statusColor?: string;
  statusLastUpdated?: string;
}
