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

import { DisasterEvent } from '../models/disaster-event';

@Injectable({
  providedIn: 'root',
})
export class EligibilityService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation eligibilityGetEvents
   */
  static readonly EligibilityGetEventsPath = '/api/eligibility/checkEventsAvailable';

  /**
   * Checking events are present in the system.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `eligibilityGetEvents()` instead.
   *
   * This method doesn't expect any request body.
   */
  eligibilityGetEvents$Response(params?: {
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, EligibilityService.EligibilityGetEventsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * Checking events are present in the system.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `eligibilityGetEvents$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  eligibilityGetEvents(params?: {
  }): Observable<boolean> {

    return this.eligibilityGetEvents$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation eligibilityGetPrescreeningEvents
   */
  static readonly EligibilityGetPrescreeningEventsPath = '/api/eligibility/prescreeningEvents';

  /**
   * Retrieve list of open events for prescreening.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `eligibilityGetPrescreeningEvents()` instead.
   *
   * This method doesn't expect any request body.
   */
  eligibilityGetPrescreeningEvents$Response(params?: {
  }): Observable<StrictHttpResponse<Array<DisasterEvent>>> {

    const rb = new RequestBuilder(this.rootUrl, EligibilityService.EligibilityGetPrescreeningEventsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<DisasterEvent>>;
      })
    );
  }

  /**
   * Retrieve list of open events for prescreening.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `eligibilityGetPrescreeningEvents$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  eligibilityGetPrescreeningEvents(params?: {
  }): Observable<Array<DisasterEvent>> {

    return this.eligibilityGetPrescreeningEvents$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DisasterEvent>>) => r.body as Array<DisasterEvent>)
    );
  }

}
