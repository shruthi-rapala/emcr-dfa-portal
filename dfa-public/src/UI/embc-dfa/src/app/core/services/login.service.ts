import { Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable, ReplaySubject, switchMap, mergeMap, tap, map, of } from 'rxjs';
import { AuthModule, AuthOptions, LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root'
})
// 2024-07-26 EMCRI-507 waynezen: re-write to centralize oidcSecurityService calls
export class LoginService  {

  private _isAuth: boolean | null = null;
  private _accesstoken: string = null;

  constructor(private oidcSecurityService: OidcSecurityService) {
    console.debug("[DFA] loginService: constructor");
  }

  public checkAuth(): Observable<LoginResponse> {
    return this.oidcSecurityService.checkAuth()
      .pipe(
        tap((response: LoginResponse) => { 
          console.debug('[DFA] loginService called oidcSecurityService.checkAuth() isAuthenticated: ' + response?.isAuthenticated);
          this._isAuth = response?.isAuthenticated;
          this._accesstoken = response?.accessToken;

          if (response?.isAuthenticated) {
            this._isAuth = true;
          }
        }));
  }

  public authorize() : void {
    console.debug("[DFA] loginService authorize");
    this._isAuth = false;
    this.oidcSecurityService.authorize();
  }

  public isAuthenticated(): boolean {
    console.debug('[DFA] loginService isAuthenticated: ' + this._isAuth);
    return this._isAuth;
  }

  public getAccessToken(): Observable<string> {
      return this.oidcSecurityService.getAccessToken()
        .pipe(
          tap((response: string) => {
            if (response) {
              //console.debug('[DFA] loginService returning access_token: ' + response);
              this._accesstoken = response;
            }
          }));
    }
}
  
