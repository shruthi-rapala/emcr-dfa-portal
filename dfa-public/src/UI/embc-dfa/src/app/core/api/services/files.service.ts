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

import { ApplicationResult } from '../models/application-result';

@Injectable({
  providedIn: 'root',
})
export class FilesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation filesDownloadFile
   */
  static readonly FilesDownloadFilePath = '/api/Files/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `filesDownloadFile()` instead.
   *
   * This method doesn't expect any request body.
   */
  filesDownloadFile$Response(params: {
    id: string;
    'file-folder'?: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, FilesService.FilesDownloadFilePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.header('file-folder', params['file-folder'], {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/octet-stream'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `filesDownloadFile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  filesDownloadFile(params: {
    id: string;
    'file-folder'?: string;
  }): Observable<Blob> {

    return this.filesDownloadFile$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation filesUploadFile
   */
  static readonly FilesUploadFilePath = '/api/Files/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `filesUploadFile()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  filesUploadFile$Response(params: {
    id: string;
    'file-classification'?: string;
    'file-tag'?: string;
    'file-folder'?: string;
    body?: {
'File'?: Blob | null;
}
  }): Observable<StrictHttpResponse<ApplicationResult>> {

    const rb = new RequestBuilder(this.rootUrl, FilesService.FilesUploadFilePath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.header('file-classification', params['file-classification'], {});
      rb.header('file-tag', params['file-tag'], {});
      rb.header('file-folder', params['file-folder'], {});
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ApplicationResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `filesUploadFile$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  filesUploadFile(params: {
    id: string;
    'file-classification'?: string;
    'file-tag'?: string;
    'file-folder'?: string;
    body?: {
'File'?: Blob | null;
}
  }): Observable<ApplicationResult> {

    return this.filesUploadFile$Response(params).pipe(
      map((r: StrictHttpResponse<ApplicationResult>) => r.body as ApplicationResult)
    );
  }

  /**
   * Path part for operation filesDeleteFile
   */
  static readonly FilesDeleteFilePath = '/api/Files/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `filesDeleteFile()` instead.
   *
   * This method doesn't expect any request body.
   */
  filesDeleteFile$Response(params: {
    id: string;
    'file-folder'?: string;
  }): Observable<StrictHttpResponse<ApplicationResult>> {

    const rb = new RequestBuilder(this.rootUrl, FilesService.FilesDeleteFilePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
      rb.header('file-folder', params['file-folder'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ApplicationResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `filesDeleteFile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  filesDeleteFile(params: {
    id: string;
    'file-folder'?: string;
  }): Observable<ApplicationResult> {

    return this.filesDeleteFile$Response(params).pipe(
      map((r: StrictHttpResponse<ApplicationResult>) => r.body as ApplicationResult)
    );
  }

  /**
   * Path part for operation filesReactivateFile
   */
  static readonly FilesReactivateFilePath = '/api/Files/{id}/reactivate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `filesReactivateFile()` instead.
   *
   * This method doesn't expect any request body.
   */
  filesReactivateFile$Response(params: {
    id: string;
    'file-folder'?: string;
  }): Observable<StrictHttpResponse<ApplicationResult>> {

    const rb = new RequestBuilder(this.rootUrl, FilesService.FilesReactivateFilePath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.header('file-folder', params['file-folder'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ApplicationResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `filesReactivateFile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  filesReactivateFile(params: {
    id: string;
    'file-folder'?: string;
  }): Observable<ApplicationResult> {

    return this.filesReactivateFile$Response(params).pipe(
      map((r: StrictHttpResponse<ApplicationResult>) => r.body as ApplicationResult)
    );
  }

}
