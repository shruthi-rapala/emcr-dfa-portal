import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class BceidAuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (!environment.production) {
      // just log it for now
      console.log("Bceid-auth.interceptor: begin");
      var requestAuthHeader;
      if (request.headers.has("Authorization")) {
        requestAuthHeader = request.headers.get("Authorization");
        console.log("Bceid-auth.interceptor: Authorization request header: " + requestAuthHeader);
      }
    }

    return next.handle(request);
  }
}
