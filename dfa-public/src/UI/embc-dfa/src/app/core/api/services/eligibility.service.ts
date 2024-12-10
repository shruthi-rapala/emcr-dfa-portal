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
import { EffectedRegionCommunity } from '../models/effected-region-community';

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
  static readonly EligibilityGetEventsPath = '/api/eligibility/checkPublicEventsAvailable';

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
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, EligibilityService.EligibilityGetEventsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
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
  }): Observable<number> {

    return this.eligibilityGetEvents$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation eligibilityGetOpenEvents
   */
  static readonly EligibilityGetOpenEventsPath = '/api/eligibility/openEvents';

  /**
   * Retrieve list of open events.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `eligibilityGetOpenEvents()` instead.
   *
   * This method doesn't expect any request body.
   */
  eligibilityGetOpenEvents$Response(params?: {
  }): Observable<StrictHttpResponse<Array<DisasterEvent>>> {

    const rb = new RequestBuilder(this.rootUrl, EligibilityService.EligibilityGetOpenEventsPath, 'get');
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
   * Retrieve list of open events.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `eligibilityGetOpenEvents$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  eligibilityGetOpenEvents(params?: {
  }): Observable<Array<DisasterEvent>> {

    return this.eligibilityGetOpenEvents$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DisasterEvent>>) => r.body as Array<DisasterEvent>)
    );
  }

  /**
   * Path part for operation eligibilityGetRegionCommunties
   */
  static readonly EligibilityGetRegionCommuntiesPath = '/api/eligibility/regionCommunities';

  /**
   * Retrieve list of effected region communities.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `eligibilityGetRegionCommunties()` instead.
   *
   * This method doesn't expect any request body.
   */
  eligibilityGetRegionCommunties$Response(params?: {
  }): Observable<StrictHttpResponse<Array<EffectedRegionCommunity>>> {

    const rb = new RequestBuilder(this.rootUrl, EligibilityService.EligibilityGetRegionCommuntiesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<EffectedRegionCommunity>>;
      })
    );
  }

  /**
   * Retrieve list of effected region communities.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `eligibilityGetRegionCommunties$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  eligibilityGetRegionCommunties(params?: {
  }): Observable<Array<EffectedRegionCommunity>> {

    return this.eligibilityGetRegionCommunties$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EffectedRegionCommunity>>) => r.body as Array<EffectedRegionCommunity>)
    );
  }

}
