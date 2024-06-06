import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormCreationService } from '../../services/formCreation.service';
import { LoginService } from '../../services/login.service';
import { CacheService } from '../../services/cache.service';
import { AuthModule, AuthOptions, LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showLoginMatMenu: boolean;

  constructor(
    public formCreationService: FormCreationService,
    private oidcSecurityService: OidcSecurityService,
    public loginService: LoginService,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    console.log('header comp');

    // 2024-06-05 EMCRI-217 waynezen: use new BCeID async Auth
    this.oidcSecurityService.isAuthenticated().subscribe(isAuthenticated => {
      this.showLoginMatMenu = isAuthenticated;
    });

  }

  homeButton(): void {}

  public async signOut(): Promise<void> {
    // 2024-06-05 EMCRI-217 waynezen: use new BCeID async Auth
    await this.oidcSecurityService.logoffAndRevokeTokens();
    this.cacheService.clear();
    localStorage.clear();
  }
}
