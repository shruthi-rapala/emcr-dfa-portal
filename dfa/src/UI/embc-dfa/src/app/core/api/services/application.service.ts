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

import { DfaApplicationStart } from '../models/dfa-application-start';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation applicationAddApplication
   */
  static readonly ApplicationAddApplicationPath = '/api/applications/create';

  /**
   * Create or update an application.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `applicationAddApplication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  applicationAddApplication$Response(params: {

    /**
     * The application information
     */
    body: DfaApplicationStart
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ApplicationService.ApplicationAddApplicationPath, 'post');
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
   * Create or update an application.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `applicationAddApplication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  applicationAddApplication(params: {

    /**
     * The application information
     */
    body: DfaApplicationStart
  }): Observable<string> {

    return this.applicationAddApplication$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation applicationGetApplicationStart
   */
  static readonly ApplicationGetApplicationStartPath = '/api/applications/appstart/byId';

  /**
   * Get an application by Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `applicationGetApplicationStart()` instead.
   *
   * This method doesn't expect any request body.
   */
  applicationGetApplicationStart$Response(params?: {

    /**
     * The application Id.
     */
    applicationId?: string;
  }): Observable<StrictHttpResponse<DfaApplicationStart>> {

    const rb = new RequestBuilder(this.rootUrl, ApplicationService.ApplicationGetApplicationStartPath, 'get');
    if (params) {
      rb.query('applicationId', params.applicationId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DfaApplicationStart>;
      })
    );
  }

  /**
   * Get an application by Id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `applicationGetApplicationStart$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  applicationGetApplicationStart(params?: {

    /**
     * The application Id.
     */
    applicationId?: string;
  }): Observable<DfaApplicationStart> {

    return this.applicationGetApplicationStart$Response(params).pipe(
      map((r: StrictHttpResponse<DfaApplicationStart>) => r.body as DfaApplicationStart)
    );
  }

}
