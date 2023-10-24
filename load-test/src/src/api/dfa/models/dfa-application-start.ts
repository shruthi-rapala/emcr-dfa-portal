/* tslint:disable */
/* eslint-disable */
import { AppTypeInsurance } from './app-type-insurance';
import { Consent } from './consent';
import { ProfileVerification } from './profile-verification';

/**
 * Application
 */
export interface DfaApplicationStart {
  appTypeInsurance?: AppTypeInsurance;
  consent?: Consent;
  id?: null | string;
  profileVerification?: ProfileVerification;
}
