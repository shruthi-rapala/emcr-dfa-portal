/* tslint:disable */
/* eslint-disable */
import { DfaProjectMain } from './dfa-project-main';
import { FileCategory } from './file-category';
import { RequiredDocumentType } from './required-document-type';

/**
 * File Upload
 */
export interface FileUpload {
  contentType?: null | string;
  deleteFlag?: boolean;
  fileData?: null | string;
  fileDescription?: null | string;
  fileName?: null | string;
  fileSize?: null | number;
  fileType?: null | FileCategory;
  id?: null | string;
  modifiedBy?: null | string;
  project?: DfaProjectMain;
  projectId?: string;
  requiredDocumentType?: null | RequiredDocumentType;
  uploadedDate?: null | string;
}
