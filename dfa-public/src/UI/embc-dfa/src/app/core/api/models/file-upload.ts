/* tslint:disable */
/* eslint-disable */
import { FileCategory } from './file-category';
import { RequiredDocumentType } from './required-document-type';

/**
 * File Upload
 */
export interface FileUpload {
  applicationId?: string;
  contentType?: null | string;
  deleteFlag?: boolean;
  fileData?: null | string;
  fileDescription?: null | string;
  fileName?: null | string;
  fileSize?: null | number;
  fileType?: null | FileCategory;
  id?: null | string;
  modifiedBy?: null | string;
  requiredDocumentType?: null | RequiredDocumentType;
  uploadedDate?: null | string;
}
