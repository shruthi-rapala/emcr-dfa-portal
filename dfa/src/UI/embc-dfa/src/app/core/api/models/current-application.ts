/* tslint:disable */
/* eslint-disable */
import { StatusBar } from './status-bar';
export interface CurrentApplication {
  applicationId?: string;
  applicationSubType?: string;
  applicationType?: string;
  caseNumber?: string;
  damagedAddress?: string;
  dateFileClosed?: string;
  dateOfDamage?: string;
  eventId?: string;
  hasAppealStages?: boolean;
  isErrorInStatus?: boolean;
  legalName?: string;
  primaryApplicantSignedDate?: string;
  status?: string;
  statusBar?: Array<StatusBar>;
  statusLastUpdated?: string;
}
