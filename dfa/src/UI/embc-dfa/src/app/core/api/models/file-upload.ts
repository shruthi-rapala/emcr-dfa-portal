/* tslint:disable */
/* eslint-disable */
import { FileCategory } from './file-category';

/**
 * File Upload
 */
export interface FileUpload {
  applicationId?: string;
  contentType?: string;
  deleteFlag?: boolean;
  fileDescription?: string;
  fileName?: string;
  fileSize?: number;
  fileType?: FileCategory;
  id?: null | string;
  modifiedBy?: string;
  uploadedDate?: string;
}
