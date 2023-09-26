import { DialogContent } from '../model/dialog-content.model';

export const datePattern =
  '^(0[1-9]|1[0-2])/([1-9]|[1-2][0-9]|3[0-1])/[0-9]{4}$';
export const postalPattern = '^[A-Za-z][0-9][A-Za-z]?[0-9][A-Za-z][0-9]$';
export const defaultProvince = { code: 'BC', name: 'British Columbia' };
export const defaultCountry = { code: 'CAN', name: 'Canada' };
export const usDefaultObject = {
  code: 'USA',
  name: 'United States of America'
};
export const zipCodePattern = '^([0-9]{5}-[0-9]{4}|[0-9]{5})$';
export const petsQuantityPattern = '^([1-9][0-9]{0,2})$';

export const radioButton1 = [
  { name: 'Yes', value: true },
  { name: 'No', value: false }
];

export const insuranceOptions = [
  { name: 'Yes', value: 'Yes' },
  {
    name: 'Unsure',
    value: 'Yes, but I am unsure if I have coverage for this event.'
  },
  { name: 'No', value: 'No' },
  { name: 'Unknown', value: "I don't know" }
];

export const needsOptions = [
  { name: 'Yes', value: 'Yes', apiValue: true },
  { name: 'No', value: 'No', apiValue: false },
  { name: "I'm not sure", value: 'Unsure', apiValue: null }
];

export const gender = [
  { name: 'Male', value: 'Male' },
  { name: 'Female', value: 'Female' },
  { name: 'X', value: 'X' }
];

export const yesFullyInsuredBody: DialogContent = {
  text: 'Insurable damages in the private sector aren’t eligible.' +
  '<br/><br/> To determine if your damages are insurable or uninsurable, contact your insurance provider as a first step. They will provide you with information about your insurance coverage.<br/><br/>' +
  'Program staff are available to discuss how your insurance relates to your eligibility and application. Please call <span style="white-space: nowrap; font-weight: bold;">1-888-257-4777.</span><br/><br/>' +
  '<p><b>Do you have insurance that will cover all your losses?</b></p>',
  cancelButton: 'Yes, Cancel my Application',
  confirmButton: 'No, Go Back & Edit'
}

export const confirmSubmitApplicationBody: DialogContent = {
  text: 'Are you sure you want to submit your application?<br/><br/>' +
  'You can\'t change your application or delete uploaded files once your application has been submitted.<br/><br/>' +
  'After submitting, you may continue to add or Update Other Contacts, add to the Clean Up Log, add items to the Damaged Items by Room list, and add additional documents. You can\'t delete any documents that you upload.',
  confirmButton: 'Yes, I want to submit my application.',
  cancelButton: 'No, I don\'t want to submit my application yet'
}

export const bcscMissingEmail: DialogContent = {
  text: 'You must provide your BC Services Card email address to online services to create a DFA application.<br/><br/>' +
  'In your BC Services Card account, select <b>Account Details</b>, under <b>Preferences</b>, select <b>Manage Preferences</b>, and then select <b>Edit</b>. For the question, <b>When should your ' +
  'email address be provided to an online service that requires it?</b> select <b>Every time I log in</b>.<br/><br/>' +
  '<a href="https://id.gov.bc.ca/account/" target="_blank">Go to BC Services Card Account</a>',
  confirmButton: 'Ok'
}

export const dontOccupyDamagedPropertyBody: DialogContent = {
  text: '<p>You must have occupied the property as your principal residence at the time of the event to be eligible for DFA.</p><p>You may call us to discuss further at 1-888-257-4777.</p><p><b>Did you occupy the damaged property as your principal residence at the time of the event? If you are a landlord, you must apply and qualify as a small business owner.</b></p>',
  cancelButton: 'No, Save & Close my Application',
  confirmButton: 'Yes, Continue my Application'
}

export const businessNotManagedByAllOwnersOnDayToDayBasis: DialogContent = {
  text: '<p>To be eligible for DFA, your business must be managed by all owners on a day to day basis.</p><p>You may call us to discuss further at 1-888-257-4777.</p><p><b> Is your business managed by all owners on a day to day basis?</b></p>',
  cancelButton: 'No, Save & Close my Application',
  confirmButton: 'Yes, Continue my Application'
}

export const lossesDontExceed1000: DialogContent = {
  text: '<p>To be eligible for DFA, your losses must exceed $1,000.</p><p>You may call us to discuss further at 1-888-257-4777.</p><p><b>Excluding luxury/non-essential items and landscaping, do your losses total more than $1,000?</b></p>',
  cancelButton: 'No, Save & Close my Application',
  confirmButton: 'Yes, Continue my Application'
}

export const farmoperation: DialogContent = {
  text: '<p>To be eligible for DFA, your farm operation must be identified in the current assessment of the British Columbia Assessment Authority as a developing or established agricultural operation.</p><p>You may call us to discuss further at 1-888-257-4777.</p><p><b>Is the farm operation identified in the current assessment of the British Columbia Assessment Authority as a developing or established agricultural operation?</b></p>',
  cancelButton: 'No, Save & Close my Application',
  confirmButton: 'Yes, Continue my Application'
}

export const ownedandoperatedbya: DialogContent = {
  text: '<p>To be eligible for DFA, your farm operation must be owned and operated by a person(s) who full-time employment is as a farmer?.</p><p>You may call us to discuss further at 1-888-257-4777.</p><p><b> Is the farm operation owned and operated by a person(s) who full-time employment is as a farmer?</b></p>',
  cancelButton: 'No, Save & Close my Application',
  confirmButton: 'Yes, Continue my Application'
}

export const farmoperationderivesthatpersonsmajorincom: DialogContent = {
  text: '<p>To be eligible for DFA, your farm operation must be the means by which the owner(s) derives the majority of that person\’s income?.</p><p>You may call us to discuss further at 1-888-257-4777.</p><p><b> Is the farm operation the means by which the owner(s) derives the majority of that person\’s income?</b></p>',
  cancelButton: 'No, Save & Close my Application',
  confirmButton: 'Yes, Continue my Application'
}

export const wrongGrossRevenues: DialogContent = {
  text: '<p>To be eligible for DFA, the gross revenue of your business must be more than $10,000 but less than $2 million in the year before the disaster.</p><p>You may call us to discuss further at 1-888-257-4777.</p><p><b>Are the gross revenues of the business more than $10,000 but less than $2 million in the year before the disaster?</b></p>',
  cancelButton: 'No, Save & Close my Application',
  confirmButton: 'Yes, Continue my Application'
}

export const dontEmployLessThan50EmployeesAtAnyOneTime: DialogContent = {
  text: '<p>To be eligible for DFA, your business must employ less than 50 employees at any one time.</p><p>You may call us to discuss further at 1-888-257-4777.</p><p><b>Does the business employ less than 50 employees at any one time?</b></p>',
  cancelButton: 'No, Save & Close my Application',
  confirmButton: 'Yes, Continue my Application'
}

export const deleteMemberInfoBody: DialogContent = {
  text: '<p>Are you sure you want to remove this household member from your Emergency Support Services (ESS) file?</p>',
  cancelButton: 'No, Cancel',
  confirmButton: 'Yes, remove this household member'
};

export const addEssFile: DialogContent = {
  text: 'Add Another Evacuation File'
};

export const newEssFile: DialogContent = {
  text: 'Submission Complete'
};

export const invalidGoBack: DialogContent = {
  text: '<p>The Go Back action is disabled on this page</p>',
  cancelButton: 'Close'
};

export const successfulBcscInvite: DialogContent = {
  text: '<p>Email successfully sent.</p>',
  cancelButton: 'Close'
};

export const securityQuesError =
  'An error occurred while loading the security questions. Please try again later';
export const systemError =
  'The service is temporarily unavailable. Please try again later';
export const profileExistError = 'User profile does not exist.';
export const editProfileError =
  'Unable to update profile at this time. Please try again later';
export const editNeedsError =
  'Unable to update needs assessment at this time. Please try again later';
export const saveProfileError =
  'Unable to save profile at this time. Please try again later';
export const getProfileError =
  'Unable to retrieve profile at this time. Please try again later';
export const submissionError =
  'Unable to submit request at this time. Please try again later';
export const genericError =
  'An error occurred while loading this page. Please refresh and try again.';
export const currentEvacError =
  'Unable to retrieve current evacuations at this time. Please try again later';
export const pastEvacError =
  'Unable to retrieve past evacuations at this time. Please try again later';
export const bcscInviteError =
  'Unable to send BC Services Card invitation at this time. Please try again later';
export const supportCategoryListError =
  'Unable to retrieve support categories at this time. Please try again later';
export const supportStatusListError =
  'Unable to retrieve support status at this time. Please try again later';
  export const saveApplicationError =
  'Unable to save application at this time. Please try again later';

export const zeroFileMessage = 'Attachment file size must be greater than 0Kb';
export const fileTooLargeMessage = 'Attachment file size must not be more than 50Mb';
export const fileTypeMessage = 'Invalid file type.';
export const fileNameFormat = /^[\w,\s-_()]+\.[A-Za-z]{3,4}$/;
export const invalidFileNameMessage =
  'File name must not contain the following characters: ~ " . # % & * : < > ? /  { | }. Leading and trailing spaces are not allowed.';
  export const allowedFileTypes = [
    'application/pdf',
    'image/jpg',
    'image/jpeg',
    'image/png'
];

export const uneditableApplicationTypeAlert: DialogContent = {
  text: 'You can\'t change the application type or insurance selection after this page.' +
    '<br/><br/>Are you sure you want to continue?<br/><br/>',
  cancelButton: 'No, I want to change the application<br/>\r\ntype or insurance selection',
  confirmButton: 'Yes, I have selected the correct\r\napplication type and insurance selection'
}


