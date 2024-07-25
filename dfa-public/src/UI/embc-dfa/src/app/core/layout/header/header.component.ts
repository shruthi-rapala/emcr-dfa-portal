import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormCreationService } from '../../services/formCreation.service';
import { LoginService } from '../../services/login.service';
import { CacheService } from '../../services/cache.service';
import { AuthModule, AuthOptions, LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { ContactService } from 'src/app/core/api/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showLoginMatMenu: boolean;

  firstName: string = "";
  lastName: string = "";

  constructor(
    public formCreationService: FormCreationService,
    private oidcSecurityService: OidcSecurityService,
    private router: Router,
    public loginService: LoginService,
    private cacheService: CacheService,
    private contactService: ContactService,
  ) {}

  ngOnInit(): void {
    console.log('header comp');

    // // 2024-07-22 EMCRI-440 waynezen; use new ContactService to get user name from Keycloak access token
    this.contactService.contactGetDashboardContactInfo().subscribe(contact => {
      if (contact) {
        this.showLoginMatMenu = true;
        this.firstName = contact.individualFirstname;
      }
    });
    
  }

  homeButton(): void {}

  public async signOut(): Promise<void> {
    // 2024-06-05 EMCRI-217 waynezen: use new BCeID async Auth
    await this.oidcSecurityService.logoffAndRevokeTokens();
    this.loginService.currentUser(false);
    this.cacheService.clear();
    localStorage.clear();
    this.router.navigate(['/registration-method']);
  }
}
