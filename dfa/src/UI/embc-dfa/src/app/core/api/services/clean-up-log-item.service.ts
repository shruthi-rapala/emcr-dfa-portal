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

import { CleanUpLogItem } from '../models/clean-up-log-item';

@Injectable({
  providedIn: 'root',
})
export class CleanUpLogItemService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation cleanUpLogItemUpsertDeleteCleanUpLogItem
   */
  static readonly CleanUpLogItemUpsertDeleteCleanUpLogItemPath = '/api/cleanuplogitems';

  /**
   * Create / update / delete a clean up log item.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `cleanUpLogItemUpsertDeleteCleanUpLogItem()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  cleanUpLogItemUpsertDeleteCleanUpLogItem$Response(params: {

    /**
     * The clean up log item information
     */
    body: CleanUpLogItem
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, CleanUpLogItemService.CleanUpLogItemUpsertDeleteCleanUpLogItemPath, 'post');
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
   * Create / update / delete a clean up log item.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `cleanUpLogItemUpsertDeleteCleanUpLogItem$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  cleanUpLogItemUpsertDeleteCleanUpLogItem(params: {

    /**
     * The clean up log item information
     */
    body: CleanUpLogItem
  }): Observable<string> {

    return this.cleanUpLogItemUpsertDeleteCleanUpLogItem$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation cleanUpLogItemGetCleanUpLogItems
   */
  static readonly CleanUpLogItemGetCleanUpLogItemsPath = '/api/cleanuplogitems/byApplicationId';

  /**
   * Get a list of clean up log items by application Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `cleanUpLogItemGetCleanUpLogItems()` instead.
   *
   * This method doesn't expect any request body.
   */
  cleanUpLogItemGetCleanUpLogItems$Response(params?: {

    /**
     * The application Id.
     */
    applicationId?: string;
  }): Observable<StrictHttpResponse<Array<CleanUpLogItem>>> {

    const rb = new RequestBuilder(this.rootUrl, CleanUpLogItemService.CleanUpLogItemGetCleanUpLogItemsPath, 'get');
    if (params) {
      rb.query('applicationId', params.applicationId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CleanUpLogItem>>;
      })
    );
  }

  /**
   * Get a list of clean up log items by application Id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `cleanUpLogItemGetCleanUpLogItems$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  cleanUpLogItemGetCleanUpLogItems(params?: {

    /**
     * The application Id.
     */
    applicationId?: string;
  }): Observable<Array<CleanUpLogItem>> {

    return this.cleanUpLogItemGetCleanUpLogItems$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CleanUpLogItem>>) => r.body as Array<CleanUpLogItem>)
    );
  }

}
