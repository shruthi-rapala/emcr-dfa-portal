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

import { SecondaryApplicant } from '../models/secondary-applicant';

@Injectable({
  providedIn: 'root',
})
export class SecondaryApplicantService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation secondaryApplicantUpsertDeleteSecondaryApplicant
   */
  static readonly SecondaryApplicantUpsertDeleteSecondaryApplicantPath = '/api/secondaryapplicant';

  /**
   * Create / update / delete a secondary applicant.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `secondaryApplicantUpsertDeleteSecondaryApplicant()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  secondaryApplicantUpsertDeleteSecondaryApplicant$Response(params: {

    /**
     * The secondary applicant information
     */
    body: SecondaryApplicant
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, SecondaryApplicantService.SecondaryApplicantUpsertDeleteSecondaryApplicantPath, 'post');
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
   * Create / update / delete a secondary applicant.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `secondaryApplicantUpsertDeleteSecondaryApplicant$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  secondaryApplicantUpsertDeleteSecondaryApplicant(params: {

    /**
     * The secondary applicant information
     */
    body: SecondaryApplicant
  }): Observable<string> {

    return this.secondaryApplicantUpsertDeleteSecondaryApplicant$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation secondaryApplicantGetSecondaryApplicants
   */
  static readonly SecondaryApplicantGetSecondaryApplicantsPath = '/api/secondaryapplicant/byApplicationId';

  /**
   * Get a list of secondary applicants by id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `secondaryApplicantGetSecondaryApplicants()` instead.
   *
   * This method doesn't expect any request body.
   */
  secondaryApplicantGetSecondaryApplicants$Response(params?: {

    /**
     * The application Id.
     */
    applicationId?: string;
  }): Observable<StrictHttpResponse<Array<SecondaryApplicant>>> {

    const rb = new RequestBuilder(this.rootUrl, SecondaryApplicantService.SecondaryApplicantGetSecondaryApplicantsPath, 'get');
    if (params) {
      rb.query('applicationId', params.applicationId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SecondaryApplicant>>;
      })
    );
  }

  /**
   * Get a list of secondary applicants by id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `secondaryApplicantGetSecondaryApplicants$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  secondaryApplicantGetSecondaryApplicants(params?: {

    /**
     * The application Id.
     */
    applicationId?: string;
  }): Observable<Array<SecondaryApplicant>> {

    return this.secondaryApplicantGetSecondaryApplicants$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SecondaryApplicant>>) => r.body as Array<SecondaryApplicant>)
    );
  }

}
