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

import { OtherContact } from '../models/other-contact';

@Injectable({
  providedIn: 'root',
})
export class OtherContactService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation otherContactUpsertDeleteOtherContact
   */
  static readonly OtherContactUpsertDeleteOtherContactPath = '/api/othercontacts';

  /**
   * Create / update / delete an other contact.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `otherContactUpsertDeleteOtherContact()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  otherContactUpsertDeleteOtherContact$Response(params: {

    /**
     * The other contact information
     */
    body: OtherContact
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, OtherContactService.OtherContactUpsertDeleteOtherContactPath, 'post');
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
   * Create / update / delete an other contact.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `otherContactUpsertDeleteOtherContact$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  otherContactUpsertDeleteOtherContact(params: {

    /**
     * The other contact information
     */
    body: OtherContact
  }): Observable<string> {

    return this.otherContactUpsertDeleteOtherContact$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation otherContactGetOtherContacts
   */
  static readonly OtherContactGetOtherContactsPath = '/api/othercontacts/byApplicationId';

  /**
   * Get a list of other contacts by application id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `otherContactGetOtherContacts()` instead.
   *
   * This method doesn't expect any request body.
   */
  otherContactGetOtherContacts$Response(params?: {

    /**
     * The application Id.
     */
    applicationId?: string;
  }): Observable<StrictHttpResponse<Array<OtherContact>>> {

    const rb = new RequestBuilder(this.rootUrl, OtherContactService.OtherContactGetOtherContactsPath, 'get');
    if (params) {
      rb.query('applicationId', params.applicationId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<OtherContact>>;
      })
    );
  }

  /**
   * Get a list of other contacts by application id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `otherContactGetOtherContacts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  otherContactGetOtherContacts(params?: {

    /**
     * The application Id.
     */
    applicationId?: string;
  }): Observable<Array<OtherContact>> {

    return this.otherContactGetOtherContacts$Response(params).pipe(
      map((r: StrictHttpResponse<Array<OtherContact>>) => r.body as Array<OtherContact>)
    );
  }

}
