import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentMetaDataModel } from '../model/componentMetaData.model';

@Injectable({ providedIn: 'root' })
export class ComponentCreationService {
  dynamicComponents: any = [
    { type: 'personal-details' },
    { type: 'address' },
    { type: 'contact-info' },
    { type: 'review' }
  ];
  profileComponents: Array<any> = [
    {
      component: 'personal-details',
      nextButtonLabel: 'Next - Address',
      backButtonLabel: 'Go Back & Edit',
      isLast: false,
      loadWrapperButton: false,
      lastStep: -2,
      stepName: 'Personal Details'
    },
    {
      component: 'address',
      nextButtonLabel: 'Next - Contact Information',
      backButtonLabel: 'Go Back & Edit',
      isLast: false,
      loadWrapperButton: false,
      lastStep: 0,
      stepName: 'Address'
    },
    {
      component: 'contact-info',
      nextButtonLabel: 'Next - Review & Submit',
      backButtonLabel: 'Go Back & Edit',
      isLast: false,
      loadWrapperButton: false,
      lastStep: 0,
      stepName: 'Contact'
    }
    //,
    //{
    //  component: 'security-questions',
    //  nextButtonLabel: 'Next - Create Evacuation File',
    //  backButtonLabel: 'Go Back & Edit',
    //  isLast: true,
    //  loadWrapperButton: false,
    //  lastStep: 0,
    //  stepName: 'Security Questions'
    //}
  ];

  dfaApplicationStartComponents: Array<any> = [
    {
      component: 'consent',
      nextButtonLabel: 'Next - Profile Verification',
      backButtonLabel: 'Cancel',
      isLast: false,
      loadWrapperButton: false,
      lastStep: -2,
      stepName: 'Consent'
    },
    {
      component: 'profile-verification',
      nextButtonLabel: 'Next - Application Type',
      backButtonLabel: 'Cancel',
      isLast: false,
      loadWrapperButton: false,
      lastStep: 0,
      stepName: 'Profile Verification'
    },
    {
      component: 'apptype-insurance',
      nextButtonLabel: 'Next - Damaged Property',
      backButtonLabel: 'Cancel',
      isLast: true,
      loadWrapperButton: false,
      lastStep: 0,
      stepName: 'Application Type & Insurance'
    }
  ];

  dfaApplicationMainComponents: Array<any> = [
    {
      component: 'damaged-property-address',
      nextButtonLabel: 'Next - Cause of Damage',
      backButtonLabel: 'Go Back & Edit',
      isLast: false,
      loadWrapperButton: false,
      lastStep: -2,
      stepName: 'Damaged Property'
    },
    {
      component: 'property-damage',
      nextButtonLabel: 'Next - Occupants',
      backButtonLabel: 'Go Back & Edit',
      isLast: false,
      loadWrapperButton: false,
      lastStep: 0,
      stepName: 'Damage'
    },
    {
      component: 'occupants',
      nextButtonLabel: 'Next - Clean Up Log',
      backButtonLabel: 'Go Back & Edit',
      isLast: false,
      loadWrapperButton: false,
      lastStep: 0,
      stepName: 'Occupants'
    },
    {
      component: 'clean-up-log',
      nextButtonLabel: 'Next - Damaged Items By Room',
      backButtonLabel: 'Go Back & Edit',
      isLast: false,
      loadWrapperButton: false,
      lastStep: 0,
      stepName: 'Clean Up Log'
    },
    {
      component: 'damaged-items-by-room',
      nextButtonLabel: 'Next - Supporting Documents',
      backButtonLabel: 'Go Back & Edit',
      isLast: false,
      loadWrapperButton: false,
      lastStep: 0,
      stepName: 'Damaged Items By Room'
    },
    {
      component: 'supporting-documents',
      nextButtonLabel: 'Next - Review',
      backButtonLabel: 'Go Back & Edit',
      isLast: false,
      loadWrapperButton: false,
      lastStep: 0,
      stepName: 'Supporting Documents'
    }

  ];

  needsAssessmentComponents: Array<any> = [
    {
      component: 'evac-address',
      nextButtonLabel: 'Next - Household Information',
      backButtonLabel: 'Go Back & Edit',
      isLast: false,
      loadWrapperButton: false,
      lastStep: -1,
      stepName: 'Location'
    },
    {
      component: 'family-information',
      nextButtonLabel: 'Next - Pets',
      backButtonLabel: 'Go Back & Edit',
      isLast: false,
      loadWrapperButton: false,
      lastStep: 0,
      stepName: 'Household Members'
    },
    {
      component: 'pets',
      nextButtonLabel: 'Next - Identify Needs',
      backButtonLabel: 'Go Back & Edit',
      isLast: false,
      loadWrapperButton: false,
      lastStep: 0,
      stepName: 'Pets'
    },
    {
      component: 'identify-needs',
      nextButtonLabel: 'Next - Security Phrase',
      backButtonLabel: 'Go Back & Edit',
      isLast: false,
      loadWrapperButton: false,
      lastStep: 0,
      stepName: 'Needs'
    },
    {
      component: 'secret',
      nextButtonLabel: 'Next - Review Submission',
      backButtonLabel: 'Go Back & Edit',
      isLast: false,
      loadWrapperButton: false,
      lastStep: 0,
      stepName: 'Security Phrase'
    }
  ];

  getProfileComponents(): Observable<any> {
    const profile = new Observable((observer) => {
      observer.next(this.dynamicComponents);
      observer.complete();
    });
    return profile;
  }

  createProfileSteps(): Array<ComponentMetaDataModel> {
    const componentArr: Array<ComponentMetaDataModel> =
      new Array<ComponentMetaDataModel>();
    for (const comp of this.profileComponents) {
      componentArr.push(Object.assign(new ComponentMetaDataModel(), comp));
    }
    return componentArr;
  }

  createDFAApplicationStartSteps(): Array<ComponentMetaDataModel> {
    const componentArr: Array<ComponentMetaDataModel> =
      new Array<ComponentMetaDataModel>();
    for (const comp of this.dfaApplicationStartComponents) {
      componentArr.push(Object.assign(new ComponentMetaDataModel(), comp));
    }
    return componentArr;
  }

  createDFAApplicationMainSteps(): Array<ComponentMetaDataModel> {
    const componentArr: Array<ComponentMetaDataModel> =
      new Array<ComponentMetaDataModel>();
    for (const comp of this.dfaApplicationMainComponents) {
      componentArr.push(Object.assign(new ComponentMetaDataModel(), comp));
    }
    return componentArr;
  }

  createEvacSteps(): Array<ComponentMetaDataModel> {
    const componentArr: Array<ComponentMetaDataModel> =
      new Array<ComponentMetaDataModel>();
    for (const comp of this.needsAssessmentComponents) {
      componentArr.push(Object.assign(new ComponentMetaDataModel(), comp));
    }
    return componentArr;
  }
}
