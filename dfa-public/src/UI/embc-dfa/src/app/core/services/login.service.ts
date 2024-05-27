import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModule, LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { lastValueFrom, Observable, Subject } from 'rxjs';
import { Profile } from '../api/models';
import { ProfileService } from '../api/services';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit {
  public isLoggedIn$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private oauthService: OidcSecurityService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit() {
    this.oauthService
      .checkAuth()
      .subscribe((loginResponse: LoginResponse) => {
        const { isAuthenticated, userData, accessToken, idToken, configId } =
          loginResponse;


      });
  }

  public async login(targetUrl: string = undefined): Promise<boolean> {

    // 2024-05-24 EMCRI-21 waynezen: fix this
    return await this.oauthService.authorize.call(() => {
      return Promise.resolve(true);

    });


    //return await this.oauthService.tryLoginImplicitFlow().then(() => {

    //  //debugger
    //  if (!this.oauthService.hasValidAccessToken()) {
    //    if (targetUrl == '/verified-registration') {
    //      this.oauthService.initImplicitFlow(targetUrl);
    //      this.isLoggedIn$.next(false);
    //      return Promise.resolve(false);
    //    }
    //    else {
    //      this.router.navigateByUrl('/');
    //      this.isLoggedIn$.next(false);
    //      return Promise.resolve(false);
    //    }
    //  }

    //  this.isLoggedIn$.next(true);
    //  return Promise.resolve(true);
    //});
  }

  // 2024-05-24 EMCRI-21 waynezen: fix this
  public async logout(): Promise<void> {
    await this.oauthService.logoff();
    this.isLoggedIn$.next(false);
  }

  public isLoggedIn(): Observable<boolean> {
    return this.oauthService.isAuthenticated();

  }

  // 2024-05-24 EMCRI-21 waynezen: not used
  //public getUserSession(): string {
  //  return btoa(this.oauthService.getAccessToken());
  //}

  // 2024-05-27 EMCRI-21 waynezen: not used
  //public async getUserProfile(): Promise<Profile> {
  //  const profile = await lastValueFrom(
  //    this.profileService.profileGetProfile()
  //  );
  //  return profile;
  //}

  // 2024-05-24 EMCRI-21 waynezen: fix this
  public async tryLogin(): Promise<void> {
    this.login();

    };

    //=> {
    //  if (this.oauthService.hasValidAccessToken()) {
    //    this.oauthService.setupAutomaticSilentRefresh();
    //    this.isLoggedIn$.next(true);
    //    const targetUrl = this.oauthService.state;
    //    if (targetUrl) {
    //      return this.router.navigateByUrl(decodeURIComponent(targetUrl));
    //    }
    //  }
    //});

}
