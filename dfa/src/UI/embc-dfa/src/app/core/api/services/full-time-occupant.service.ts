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

import { FullTimeOccupant } from '../models/full-time-occupant';

@Injectable({
  providedIn: 'root',
})
export class FullTimeOccupantService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation fullTimeOccupantUpsertDeleteFullTimeOccupant
   */
  static readonly FullTimeOccupantUpsertDeleteFullTimeOccupantPath = '/api/fulltimeoccupants';

  /**
   * Create / update / delete a full time occupant.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fullTimeOccupantUpsertDeleteFullTimeOccupant()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  fullTimeOccupantUpsertDeleteFullTimeOccupant$Response(params: {

    /**
     * The full time occupant information
     */
    body: FullTimeOccupant
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, FullTimeOccupantService.FullTimeOccupantUpsertDeleteFullTimeOccupantPath, 'post');
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
   * Create / update / delete a full time occupant.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `fullTimeOccupantUpsertDeleteFullTimeOccupant$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  fullTimeOccupantUpsertDeleteFullTimeOccupant(params: {

    /**
     * The full time occupant information
     */
    body: FullTimeOccupant
  }): Observable<string> {

    return this.fullTimeOccupantUpsertDeleteFullTimeOccupant$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation fullTimeOccupantGetFullTimeOccupants
   */
  static readonly FullTimeOccupantGetFullTimeOccupantsPath = '/api/fulltimeoccupants/byApplicationId';

  /**
   * Get a list of full time occupants by application Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fullTimeOccupantGetFullTimeOccupants()` instead.
   *
   * This method doesn't expect any request body.
   */
  fullTimeOccupantGetFullTimeOccupants$Response(params?: {

    /**
     * The application Id.
     */
    applicationId?: string;
  }): Observable<StrictHttpResponse<Array<FullTimeOccupant>>> {

    const rb = new RequestBuilder(this.rootUrl, FullTimeOccupantService.FullTimeOccupantGetFullTimeOccupantsPath, 'get');
    if (params) {
      rb.query('applicationId', params.applicationId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<FullTimeOccupant>>;
      })
    );
  }

  /**
   * Get a list of full time occupants by application Id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `fullTimeOccupantGetFullTimeOccupants$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  fullTimeOccupantGetFullTimeOccupants(params?: {

    /**
     * The application Id.
     */
    applicationId?: string;
  }): Observable<Array<FullTimeOccupant>> {

    return this.fullTimeOccupantGetFullTimeOccupants$Response(params).pipe(
      map((r: StrictHttpResponse<Array<FullTimeOccupant>>) => r.body as Array<FullTimeOccupant>)
    );
  }

}
