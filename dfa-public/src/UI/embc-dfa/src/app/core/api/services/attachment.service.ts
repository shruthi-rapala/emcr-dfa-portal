/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { FileUpload } from '../models/file-upload';

@Injectable({
  providedIn: 'root',
})
export class AttachmentService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation attachmentUpsertDeleteAttachment
   */
  static readonly AttachmentUpsertDeleteAttachmentPath = '/api/attachments';

  /**
   * Create / update / delete a file attachment.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `attachmentUpsertDeleteAttachment()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  attachmentUpsertDeleteAttachment$Response(params: {

    /**
     * The attachment information
     */
    body: FileUpload
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, AttachmentService.AttachmentUpsertDeleteAttachmentPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * Create / update / delete a file attachment.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `attachmentUpsertDeleteAttachment$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  attachmentUpsertDeleteAttachment(params: {

    /**
     * The attachment information
     */
    body: FileUpload
  }): Observable<string> {

    return this.attachmentUpsertDeleteAttachment$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation attachmentUpsertDeleteProjectAttachment
   */
  static readonly AttachmentUpsertDeleteProjectAttachmentPath = '/api/attachments/projectdocument';

  /**
   * Create / update / delete a file attachment.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `attachmentUpsertDeleteProjectAttachment()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  attachmentUpsertDeleteProjectAttachment$Response(params: {

    /**
     * The attachment information
     */
    body: FileUpload
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, AttachmentService.AttachmentUpsertDeleteProjectAttachmentPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * Create / update / delete a file attachment.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `attachmentUpsertDeleteProjectAttachment$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  attachmentUpsertDeleteProjectAttachment(params: {

    /**
     * The attachment information
     */
    body: FileUpload
  }): Observable<string> {

    return this.attachmentUpsertDeleteProjectAttachment$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation attachmentGetAttachments
   */
  static readonly AttachmentGetAttachmentsPath = '/api/attachments/byProjectIdId';

  /**
   * Get a list of attachments by project Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `attachmentGetAttachments()` instead.
   *
   * This method doesn't expect any request body.
   */
  attachmentGetAttachments$Response(params?: {

    /**
     * The project Id.
     */
    projectId?: string;
  }): Observable<StrictHttpResponse<Array<FileUpload>>> {

    const rb = new RequestBuilder(this.rootUrl, AttachmentService.AttachmentGetAttachmentsPath, 'get');
    if (params) {
      rb.query('projectId', params.projectId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<FileUpload>>;
      })
    );
  }

  /**
   * Get a list of attachments by project Id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `attachmentGetAttachments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  attachmentGetAttachments(params?: {

    /**
     * The project Id.
     */
    projectId?: string;
  }): Observable<Array<FileUpload>> {

    return this.attachmentGetAttachments$Response(params).pipe(
      map((r: StrictHttpResponse<Array<FileUpload>>) => r.body as Array<FileUpload>)
    );
  }

}
