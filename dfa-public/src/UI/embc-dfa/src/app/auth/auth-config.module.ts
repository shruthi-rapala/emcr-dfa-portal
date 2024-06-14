import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthModule, LogLevel, StsConfigHttpLoader, StsConfigLoader } from 'angular-auth-oidc-client';
import { map } from 'rxjs/operators';

export const httpLoaderFactory = (httpClient: HttpClient) => {
  const config$ = httpClient.get<any>(`assets/config/oidc.json`).pipe(
    map((customConfig: any) => {
      return {
        configId: customConfig.configId,
        authority: customConfig.authority,
        redirectUrl: customConfig.redirectUrl,
        postLogoutRedirectUri: customConfig.postLogoutRedirectUri,
        clientId: customConfig.clientId,
        scope: customConfig.scope, // 'openid profile offline_access ' + your scopes
        responseType: customConfig.responseType,
        silentRenew: customConfig.silentRenew,
        useRefreshToken: customConfig.useRefreshToken,
        renewTimeBeforeTokenExpiresInSeconds: customConfig.renewTimeBeforeTokenExpiresInSeconds,
      };
    })
  );

  return new StsConfigHttpLoader(config$);
};

@NgModule({
  imports: [
    AuthModule.forRoot({
      loader: {
        provide: StsConfigLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
