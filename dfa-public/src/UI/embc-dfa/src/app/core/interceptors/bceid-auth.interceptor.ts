import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { first, mergeMap, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class BceidAuthInterceptor implements HttpInterceptor {

  constructor(private oidcSecurityService: OidcSecurityService) {}

  /* 
   * 2024-07-08 EMCRI-363 waynezen: for some reason, the angular-auth-oidc-client pkg 
   *  isn't setting the Authorization: Bearer token in the header.
   *  Must manually set the Bearer token.
  */
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.includes("/api")) {
      return this.oidcSecurityService.checkAuth()
        .pipe(first(),
        mergeMap((isAuthenticated) => {
          if (isAuthenticated) {
            return this.oidcSecurityService.getAccessToken().pipe(
              first(),
              mergeMap((token) => {

                const headers = req.headers
                  .set('Authorization', `Bearer ${token}`)
                const authReq = req.clone({ headers });
                return next.handle(authReq);
              })
            );
          }
          return next.handle(req);
        }));
    }
    return next.handle(req);
  }
}
