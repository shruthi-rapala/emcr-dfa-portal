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

import { CurrentClaim } from '../models/current-claim';
import { CurrentProject } from '../models/current-project';
import { DfaClaimMain } from '../models/dfa-claim-main';

@Injectable({
  providedIn: 'root',
})
export class ClaimService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation claimGetDfaClaims
   */
  static readonly ClaimGetDfaClaimsPath = '/api/claims/dfaclaims';

  /**
   * get dfa claims.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `claimGetDfaClaims()` instead.
   *
   * This method doesn't expect any request body.
   */
  claimGetDfaClaims$Response(params?: {

    /**
     * The project Id.
     */
    projectId?: string;
  }): Observable<StrictHttpResponse<Array<CurrentClaim>>> {

    const rb = new RequestBuilder(this.rootUrl, ClaimService.ClaimGetDfaClaimsPath, 'get');
    if (params) {
      rb.query('projectId', params.projectId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CurrentClaim>>;
      })
    );
  }

  /**
   * get dfa claims.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `claimGetDfaClaims$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  claimGetDfaClaims(params?: {

    /**
     * The project Id.
     */
    projectId?: string;
  }): Observable<Array<CurrentClaim>> {

    return this.claimGetDfaClaims$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CurrentClaim>>) => r.body as Array<CurrentClaim>)
    );
  }

  /**
   * Path part for operation claimUpsertClaim
   */
  static readonly ClaimUpsertClaimPath = '/api/claims/update';

  /**
   * create or update claim.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `claimUpsertClaim()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  claimUpsertClaim$Response(params: {

    /**
     * The claim information
     */
    body: DfaClaimMain
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ClaimService.ClaimUpsertClaimPath, 'put');
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
   * create or update claim.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `claimUpsertClaim$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  claimUpsertClaim(params: {

    /**
     * The claim information
     */
    body: DfaClaimMain
  }): Observable<string> {

    return this.claimUpsertClaim$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation claimGetClaimMain
   */
  static readonly ClaimGetClaimMainPath = '/api/claims/appmain/byId';

  /**
   * Get project main by Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `claimGetClaimMain()` instead.
   *
   * This method doesn't expect any request body.
   */
  claimGetClaimMain$Response(params?: {

    /**
     * The project Id.
     */
    projectId?: string;
  }): Observable<StrictHttpResponse<DfaClaimMain>> {

    const rb = new RequestBuilder(this.rootUrl, ClaimService.ClaimGetClaimMainPath, 'get');
    if (params) {
      rb.query('projectId', params.projectId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DfaClaimMain>;
      })
    );
  }

  /**
   * Get project main by Id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `claimGetClaimMain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  claimGetClaimMain(params?: {

    /**
     * The project Id.
     */
    projectId?: string;
  }): Observable<DfaClaimMain> {

    return this.claimGetClaimMain$Response(params).pipe(
      map((r: StrictHttpResponse<DfaClaimMain>) => r.body as DfaClaimMain)
    );
  }

  /**
   * Path part for operation claimGetProjectDetailsForClaim
   */
  static readonly ClaimGetProjectDetailsForClaimPath = '/api/claims/dfaprojectbyID';

  /**
   * get dfa project details.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `claimGetProjectDetailsForClaim()` instead.
   *
   * This method doesn't expect any request body.
   */
  claimGetProjectDetailsForClaim$Response(params?: {

    /**
     * The project Id.
     */
    projectId?: string;
  }): Observable<StrictHttpResponse<CurrentProject>> {

    const rb = new RequestBuilder(this.rootUrl, ClaimService.ClaimGetProjectDetailsForClaimPath, 'get');
    if (params) {
      rb.query('projectId', params.projectId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CurrentProject>;
      })
    );
  }

  /**
   * get dfa project details.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `claimGetProjectDetailsForClaim$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  claimGetProjectDetailsForClaim(params?: {

    /**
     * The project Id.
     */
    projectId?: string;
  }): Observable<CurrentProject> {

    return this.claimGetProjectDetailsForClaim$Response(params).pipe(
      map((r: StrictHttpResponse<CurrentProject>) => r.body as CurrentProject)
    );
  }

}
