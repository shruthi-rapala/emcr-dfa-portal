import { Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable, ReplaySubject, switchMap, mergeMap, tap, map, of, retry, delay } from 'rxjs';
import { AuthenticatedResult, AuthModule, AuthOptions, LoginResponse, LogoutAuthOptions, OidcSecurityService } from 'angular-auth-oidc-client';
import { CacheService } from '../../core/services/cache.service';

@Injectable({
  providedIn: 'root'
})
// 2024-07-26 EMCRI-507 waynezen: re-write to centralize oidcSecurityService calls
export class LoginService  {

  private _isAuth: boolean | null = null;
  private _accesstoken: string = null;

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private cacheService: CacheService) {  }

  public checkAuth(): Observable<LoginResponse> {
    return this.oidcSecurityService.checkAuth()
      .pipe(
        tap((response: LoginResponse) => { 

          this._isAuth = response?.isAuthenticated;          
          this._accesstoken = response?.accessToken;

          if (response?.isAuthenticated) {
            this._isAuth = true;
            this.isAuthenticated.next(true);
          }
        }));
  }

  public authorize() : void {
    // console.debug("[DFA] loginService authorize");
    this._isAuth = false;
    this.oidcSecurityService.authorize();
  }

  private isAuthenticated: BehaviorSubject<boolean> =
    new BehaviorSubject(false);

  // EMCRI-939 waynezen; angular-auth-oidc-client is slow - wait a bit before checking isAuthenticated status
  public isAuthenticated$: Observable<boolean> =
    this.isAuthenticated.asObservable().pipe(delay(500));

  public forceAuthenticated(): void {
    this.isAuthenticated.next(true);
  }

  public getAccessToken(): Observable<string> {
      return this.oidcSecurityService.getAccessToken()
        .pipe(
          tap((response: string) => {
            if (response) {
              // console.debug('[DFA] loginService returning access_token: ' + response);
              this._accesstoken = response;
            }
          }));
    }

    public logOff(): void {

      this.oidcSecurityService.logoff('').subscribe((result) => {
        localStorage.clear();
        this.cacheService.clear();
        this.isAuthenticated.next(false);
      });
      
    }
}
  
