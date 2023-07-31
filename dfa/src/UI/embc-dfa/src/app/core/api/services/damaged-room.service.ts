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

import { DamagedRoom } from '../models/damaged-room';

@Injectable({
  providedIn: 'root',
})
export class DamagedRoomService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation damagedRoomUpsertDeleteDamagedRoom
   */
  static readonly DamagedRoomUpsertDeleteDamagedRoomPath = '/api/damagedrooms';

  /**
   * Create / update / delete a damaged room.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `damagedRoomUpsertDeleteDamagedRoom()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  damagedRoomUpsertDeleteDamagedRoom$Response(params: {

    /**
     * The damaged room information
     */
    body: DamagedRoom
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, DamagedRoomService.DamagedRoomUpsertDeleteDamagedRoomPath, 'post');
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
   * Create / update / delete a damaged room.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `damagedRoomUpsertDeleteDamagedRoom$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  damagedRoomUpsertDeleteDamagedRoom(params: {

    /**
     * The damaged room information
     */
    body: DamagedRoom
  }): Observable<string> {

    return this.damagedRoomUpsertDeleteDamagedRoom$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation damagedRoomGetDamagedRooms
   */
  static readonly DamagedRoomGetDamagedRoomsPath = '/api/damagedrooms/byApplicationId';

  /**
   * Get a list of damaged rooms by application Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `damagedRoomGetDamagedRooms()` instead.
   *
   * This method doesn't expect any request body.
   */
  damagedRoomGetDamagedRooms$Response(params?: {

    /**
     * The application Id.
     */
    applicationId?: string;
  }): Observable<StrictHttpResponse<Array<DamagedRoom>>> {

    const rb = new RequestBuilder(this.rootUrl, DamagedRoomService.DamagedRoomGetDamagedRoomsPath, 'get');
    if (params) {
      rb.query('applicationId', params.applicationId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<DamagedRoom>>;
      })
    );
  }

  /**
   * Get a list of damaged rooms by application Id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `damagedRoomGetDamagedRooms$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  damagedRoomGetDamagedRooms(params?: {

    /**
     * The application Id.
     */
    applicationId?: string;
  }): Observable<Array<DamagedRoom>> {

    return this.damagedRoomGetDamagedRooms$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DamagedRoom>>) => r.body as Array<DamagedRoom>)
    );
  }

}
