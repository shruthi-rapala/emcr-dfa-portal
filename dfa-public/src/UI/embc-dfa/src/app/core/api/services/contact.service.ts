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

import { AppCity } from '../models/app-city';
import { AppProvince } from '../models/app-province';
import { BCeIdBusiness } from '../models/b-ce-id-business';
import { BceidUserData } from '../models/bceid-user-data';

@Injectable({
  providedIn: 'root',
})
export class ContactService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation contactGetDashboardContactInfo
   */
  static readonly ContactGetDashboardContactInfoPath = '/api/contacts/dashboard';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `contactGetDashboardContactInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  contactGetDashboardContactInfo$Response(params?: {
  }): Observable<StrictHttpResponse<BCeIdBusiness>> {

    const rb = new RequestBuilder(this.rootUrl, ContactService.ContactGetDashboardContactInfoPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BCeIdBusiness>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `contactGetDashboardContactInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  contactGetDashboardContactInfo(params?: {
  }): Observable<BCeIdBusiness> {

    return this.contactGetDashboardContactInfo$Response(params).pipe(
      map((r: StrictHttpResponse<BCeIdBusiness>) => r.body as BCeIdBusiness)
    );
  }

  /**
   * Path part for operation contactGetLoginInfo
   */
  static readonly ContactGetLoginInfoPath = '/api/contacts/login';

  /**
   * If user isn't authenticated, return NULL.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `contactGetLoginInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  contactGetLoginInfo$Response(params?: {
  }): Observable<StrictHttpResponse<BceidUserData>> {

    const rb = new RequestBuilder(this.rootUrl, ContactService.ContactGetLoginInfoPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BceidUserData>;
      })
    );
  }

  /**
   * If user isn't authenticated, return NULL.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `contactGetLoginInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  contactGetLoginInfo(params?: {
  }): Observable<BceidUserData> {

    return this.contactGetLoginInfo$Response(params).pipe(
      map((r: StrictHttpResponse<BceidUserData>) => r.body as BceidUserData)
    );
  }

  /**
   * Path part for operation contactGetAppCities
   */
  static readonly ContactGetAppCitiesPath = '/api/contacts/cities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `contactGetAppCities()` instead.
   *
   * This method doesn't expect any request body.
   */
  contactGetAppCities$Response(params?: {
  }): Observable<StrictHttpResponse<Array<AppCity>>> {

    const rb = new RequestBuilder(this.rootUrl, ContactService.ContactGetAppCitiesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<AppCity>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `contactGetAppCities$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  contactGetAppCities(params?: {
  }): Observable<Array<AppCity>> {

    return this.contactGetAppCities$Response(params).pipe(
      map((r: StrictHttpResponse<Array<AppCity>>) => r.body as Array<AppCity>)
    );
  }

  /**
   * Path part for operation contactGetAppProvinces
   */
  static readonly ContactGetAppProvincesPath = '/api/contacts/provinces';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `contactGetAppProvinces()` instead.
   *
   * This method doesn't expect any request body.
   */
  contactGetAppProvinces$Response(params?: {
  }): Observable<StrictHttpResponse<Array<AppProvince>>> {

    const rb = new RequestBuilder(this.rootUrl, ContactService.ContactGetAppProvincesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<AppProvince>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `contactGetAppProvinces$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  contactGetAppProvinces(params?: {
  }): Observable<Array<AppProvince>> {

    return this.contactGetAppProvinces$Response(params).pipe(
      map((r: StrictHttpResponse<Array<AppProvince>>) => r.body as Array<AppProvince>)
    );
  }

}
