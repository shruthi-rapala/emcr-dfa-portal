import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Community, Country, StateProvince } from './address';
import { CustomValidationService } from '../services/customValidation.service';
import { SignatureBlock, SecondaryApplicantTypeOption, FileCategory, RoomType, RequiredDocumentType, ProjectStageOptionSet } from 'src/app/core/api/models';
import { Invoice } from './dfa-invoice.model';


export class RecoveryClaim {
  claimNumber?: null | string;
  claimStatus?: null | ProjectStageOptionSet;
  isFirstClaimApproved?: null | boolean;
  isThisFinalClaim?: null | boolean;
  totalInvoicesBeingClaimed?: null | string;
  claimPST?: null | string;
  claimGrossGST?: null | string;
  totalActualClaim?: null | string;
  invoices?: null | Invoice[];
  

  constructor(
    claimNumber?: null | string,
    claimStatus?: null | ProjectStageOptionSet,
    isFirstClaimApproved?: null | boolean,
    isThisFinalClaim?: null | boolean,
    totalInvoicesBeingClaimed?: null | string,
    claimPST?: null | string,
    claimGrossGST?: null | string,
    totalActualClaim?: null | string,
    invoices?: null | Invoice[]
  ) { }
}

export class RecoveryClaimForm {
  claimNumber = new UntypedFormControl();
  claimStatus = new UntypedFormControl();
  isFirstClaimApproved = new UntypedFormControl();
  isThisFinalClaim = new UntypedFormControl();
  totalInvoicesBeingClaimed = new UntypedFormControl();
  claimPST = new UntypedFormControl();
  claimGrossGST = new UntypedFormControl();
  totalActualClaim = new UntypedFormControl();
  invoices = new UntypedFormControl();

  constructor(
    recoveryClaim: RecoveryClaim,
    customValidator: CustomValidationService
  ) {
    
    if (recoveryClaim.claimNumber) {
      this.claimNumber.setValue(recoveryClaim.claimNumber);
    }
    else {
      this.claimNumber.setValue(0);
    }
    this.claimNumber.setValidators(null);

    if (recoveryClaim.claimStatus) {
      this.claimStatus.setValue(recoveryClaim.claimStatus);
    }
    this.claimStatus.setValidators(null);

    if (recoveryClaim.isFirstClaimApproved) {
      this.isFirstClaimApproved.setValue(recoveryClaim.isFirstClaimApproved);
    }
    else {
      this.isFirstClaimApproved.setValue('false');
    }
    this.isFirstClaimApproved.setValidators(null);

    if (recoveryClaim.isThisFinalClaim) {
      this.isThisFinalClaim.setValue(recoveryClaim.isThisFinalClaim);
    }
    this.isThisFinalClaim.setValidators(null);

    if (recoveryClaim.totalInvoicesBeingClaimed) {
      this.totalInvoicesBeingClaimed.setValue(recoveryClaim.totalInvoicesBeingClaimed);
    }
    else {
      this.totalInvoicesBeingClaimed.setValue(0);
    }
    this.totalInvoicesBeingClaimed.setValidators(null);

    if (recoveryClaim.claimPST) {
      this.claimPST.setValue(recoveryClaim.claimPST);
    }
    else {
      this.claimPST.setValue(0);
    }
    this.claimPST.setValidators(null);

    if (recoveryClaim.claimGrossGST) {
      this.claimGrossGST.setValue(recoveryClaim.claimGrossGST);
    }
    else {
      this.claimGrossGST.setValue(0);
    }
    this.claimGrossGST.setValidators(null);

    if (recoveryClaim.totalActualClaim) {
      this.totalActualClaim.setValue(recoveryClaim.totalActualClaim);
    }
    else {
      this.totalActualClaim.setValue(0);
    }
    this.totalActualClaim.setValidators(null);

    if (recoveryClaim.invoices) {
      this.invoices.setValue(recoveryClaim.invoices);
    }
    this.invoices.setValidators(null);

  }
}

export class FileUpload {
  applicationId?: string;
  contentType?: string;
  deleteFlag?: boolean;
  fileData?: string;
  fileDescription?: string;
  fileName?: string;
  fileSize?: number;
  fileType?: FileCategory;
  requiredDocumentType?: RequiredDocumentType;
  id?: null | string;
  modifiedBy?: string;
  uploadedDate?: string;
  applicantType?: string;
  smallBusinessOption?: string;
  farmOption?: string;
}

export class FileUploadsForm {
  applicationId = new UntypedFormControl();
  applicantType = new UntypedFormControl();
  smallBusinessOption = new UntypedFormControl();
  farmOption = new UntypedFormControl();
  deleteFlag = new UntypedFormControl();
  id = new UntypedFormControl();
  fileName = new UntypedFormControl();
  fileDescription = new UntypedFormControl();
  fileType = new UntypedFormControl();
  requiredDocumentType = new UntypedFormControl();
  uploadedDate = new UntypedFormControl();
  modifiedBy = new UntypedFormControl();
  fileData = new UntypedFormControl();
  contentType = new UntypedFormControl();
  fileSize = new UntypedFormControl();
  cleanupFileUpload: UntypedFormGroup;
  insuranceTemplateFileUpload: UntypedFormGroup;
  T1IncomeTaxReturnFileUpload: UntypedFormGroup;
  T2IncomeTaxReturnFileUpload: UntypedFormGroup;
  proofOfOwnershipFileUpload: UntypedFormGroup;
  T776FileUpload: UntypedFormGroup;
  financialStatementsFileUpload: UntypedFormGroup;
  tenancyAgreementFileUpload: UntypedFormGroup;
  rentalAgreementFileUpload: UntypedFormGroup;
  identificationFileUpload: UntypedFormGroup;
  directorsListingFileUpload: UntypedFormGroup;
  registrationProofFileUpload: UntypedFormGroup;
  structureAndPurposeFileUpload: UntypedFormGroup;
  damagePhotoFileUpload: UntypedFormGroup;
  supportingFilesFileUpload: UntypedFormGroup;
  fileUploads = new UntypedFormControl([]);
  addNewFileUploadIndicator = new UntypedFormControl(false);

  constructor(
    fileUploads: Array<FileUpload>,
    customValidator: CustomValidationService,
    builder: UntypedFormBuilder
  ) {
    this.insuranceTemplateFileUpload = builder.group({
      deleteFlag: [
        false,
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      applicationId: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      id: [
        '',
      ],

      fileName: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileDescription: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator),
          customValidator
            .maxLengthValidator(100)
            .bind(customValidator)
        ]
      ],
      fileType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      requiredDocumentType: [
        ''
      ],
      uploadedDate: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      modifiedBy: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileData: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      contentType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileSize: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ]
    });
    this.T1IncomeTaxReturnFileUpload = builder.group({
      deleteFlag: [
        false,
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      applicationId: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      id: [
        '',
      ],

      fileName: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileDescription: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator),
          customValidator
            .maxLengthValidator(100)
            .bind(customValidator)
        ]
      ],
      fileType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      requiredDocumentType: [
        ''
      ],
      uploadedDate: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      modifiedBy: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileData: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      contentType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileSize: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ]
    });
    this.T2IncomeTaxReturnFileUpload = builder.group({
      deleteFlag: [
        false,
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      applicationId: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      id: [
        '',
      ],

      fileName: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileDescription: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator),
          customValidator
            .maxLengthValidator(100)
            .bind(customValidator)
        ]
      ],
      fileType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      requiredDocumentType: [
        ''
      ],
      uploadedDate: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      modifiedBy: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileData: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      contentType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileSize: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ]
    });
    this.proofOfOwnershipFileUpload = builder.group({
      deleteFlag: [
        false,
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      applicationId: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      id: [
        '',
      ],

      fileName: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileDescription: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator),
          customValidator
            .maxLengthValidator(100)
            .bind(customValidator)
        ]
      ],
      fileType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      requiredDocumentType: [
        ''
      ],
      uploadedDate: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      modifiedBy: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileData: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      contentType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileSize: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ]
    });
    this.T776FileUpload = builder.group({
      deleteFlag: [
        false,
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      applicationId: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      id: [
        '',
      ],

      fileName: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileDescription: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator),
          customValidator
            .maxLengthValidator(100)
            .bind(customValidator)
        ]
      ],
      fileType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      requiredDocumentType: [
        ''
      ],
      uploadedDate: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      modifiedBy: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileData: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      contentType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileSize: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ]
    });
    this.financialStatementsFileUpload = builder.group({
      deleteFlag: [
        false,
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      applicationId: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      id: [
        '',
      ],

      fileName: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileDescription: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator),
          customValidator
            .maxLengthValidator(100)
            .bind(customValidator)
        ]
      ],
      fileType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      requiredDocumentType: [
        ''
      ],
      uploadedDate: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      modifiedBy: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileData: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      contentType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileSize: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ]
    });
    this.tenancyAgreementFileUpload = builder.group({
      deleteFlag: [
        false,
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      applicationId: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      id: [
        '',
      ],

      fileName: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileDescription: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator),
          customValidator
            .maxLengthValidator(100)
            .bind(customValidator)
        ]
      ],
      fileType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      requiredDocumentType: [
        ''
      ],
      uploadedDate: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      modifiedBy: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileData: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      contentType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileSize: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ]
    });
    this.rentalAgreementFileUpload = builder.group({
      deleteFlag: [
        false,
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      applicationId: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      id: [
        '',
      ],

      fileName: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileDescription: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator),
          customValidator
            .maxLengthValidator(100)
            .bind(customValidator)
        ]
      ],
      fileType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      requiredDocumentType: [
        ''
      ], uploadedDate: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      modifiedBy: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileData: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      contentType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileSize: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ]
    });
    this.identificationFileUpload = builder.group({
      deleteFlag: [
        false,
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      applicationId: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      id: [
        '',
      ],

      fileName: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileDescription: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator),
          customValidator
            .maxLengthValidator(100)
            .bind(customValidator)
        ]
      ],
      fileType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      requiredDocumentType: [
        ''
      ], uploadedDate: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      modifiedBy: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileData: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      contentType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileSize: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ]
    });
    this.supportingFilesFileUpload = builder.group({
      deleteFlag: [
        false,
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      applicationId: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      id: [
        '',
      ],
      fileName: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileDescription: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator),
          customValidator
            .maxLengthValidator(100)
            .bind(customValidator)
        ]
      ],
      fileType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      requiredDocumentType: [
        ''
      ],
      uploadedDate: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      modifiedBy: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileData: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      contentType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileSize: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ]
    });
    this.damagePhotoFileUpload = builder.group({
      deleteFlag: [
        false,
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      applicationId: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      id: [
        '',
      ],
      fileName: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileDescription: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator),
          customValidator
            .maxLengthValidator(100)
            .bind(customValidator)
        ]
      ],
      fileType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      requiredDocumentType: [
        ''
      ],
      uploadedDate: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      modifiedBy: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileData: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      contentType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileSize: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ]
    });
    this.cleanupFileUpload = builder.group({
      deleteFlag: [
        false,
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      applicationId: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      id: [
        '',
      ],

      fileName: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileDescription: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator),
          customValidator
            .maxLengthValidator(100)
            .bind(customValidator)
        ]
      ],
      fileType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      requiredDocumentType: [
        ''
      ],
      uploadedDate: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      modifiedBy: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileData: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      contentType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileSize: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ]
    });
    this.directorsListingFileUpload = builder.group({
      deleteFlag: [
        false,
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      applicationId: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      id: [
        '',
      ],

      fileName: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileDescription: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator),
          customValidator
            .maxLengthValidator(100)
            .bind(customValidator)
        ]
      ],
      fileType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      requiredDocumentType: [
        ''
      ],
      uploadedDate: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      modifiedBy: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileData: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      contentType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileSize: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ]
    });
    this.registrationProofFileUpload = builder.group({
      deleteFlag: [
        false,
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      applicationId: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      id: [
        '',
      ],

      fileName: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileDescription: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator),
          customValidator
            .maxLengthValidator(100)
            .bind(customValidator)
        ]
      ],
      fileType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      requiredDocumentType: [
        ''
      ],
      uploadedDate: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      modifiedBy: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileData: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      contentType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileSize: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ]
    });
    this.structureAndPurposeFileUpload = builder.group({
      deleteFlag: [
        false,
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      applicationId: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      id: [
        '',
      ],

      fileName: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileDescription: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator),
          customValidator
            .maxLengthValidator(100)
            .bind(customValidator)
        ]
      ],
      fileType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      requiredDocumentType: [
        ''
      ],
      uploadedDate: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      modifiedBy: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileData: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      contentType: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ],
      fileSize: [
        '',
        [
          customValidator
            .conditionalValidation(
              () => this.addNewFileUploadIndicator.value,
              Validators.required
            )
            .bind(customValidator)
        ]
      ]
    });
  }
}

export class SupportingDocuments {
  hasCopyOfARentalAgreementOrLease?: boolean;

  constructor(
  ) { }
}

export class SupportingDocumentsForm {
  hasCopyOfARentalAgreementOrLease = new UntypedFormControl();

  constructor(
    supportingDocuments: SupportingDocuments,
  ) {
    if (supportingDocuments.hasCopyOfARentalAgreementOrLease != null) {
      this.hasCopyOfARentalAgreementOrLease.setValue(supportingDocuments.hasCopyOfARentalAgreementOrLease);
    }
    this.hasCopyOfARentalAgreementOrLease.setValidators(null);
  }
}

/**
 * DFA Application Main
 **/
export interface DfaClaimMain {
  id?: string;
  applicationId?: string;
  claim?: RecoveryClaim;
  invoices?: Invoice[];
}
