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

import { CurrentProject } from '../models/current-project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation projectGetDfaProjects
   */
  static readonly ProjectGetDfaProjectsPath = '/api/projects/dfaprojects';

  /**
   * get dfa applications.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `projectGetDfaProjects()` instead.
   *
   * This method doesn't expect any request body.
   */
  projectGetDfaProjects$Response(params?: {

    /**
     * The application Id.
     */
    applicationId?: string;
  }): Observable<StrictHttpResponse<Array<CurrentProject>>> {

    const rb = new RequestBuilder(this.rootUrl, ProjectService.ProjectGetDfaProjectsPath, 'get');
    if (params) {
      rb.query('applicationId', params.applicationId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CurrentProject>>;
      })
    );
  }

  /**
   * get dfa applications.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `projectGetDfaProjects$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  projectGetDfaProjects(params?: {

    /**
     * The application Id.
     */
    applicationId?: string;
  }): Observable<Array<CurrentProject>> {

    return this.projectGetDfaProjects$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CurrentProject>>) => r.body as Array<CurrentProject>)
    );
  }

}
