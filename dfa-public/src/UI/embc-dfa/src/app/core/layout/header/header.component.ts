import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormCreationService } from '../../services/formCreation.service';
import { CacheService } from '../../services/cache.service';
import { ContactService } from 'src/app/core/api/services';
import { LoginService } from '../../../core/services/login.service';

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
    private router: Router,
    private cacheService: CacheService,
    private contactService: ContactService,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {

    this.showLoginMatMenu = false;

    console.debug('[DFA] header.component about to call middle-tier API. isAuthenticated: ' + this.loginService?.isAuthenticated());

    // 2024-07-22 EMCRI-440 waynezen; use new ContactService to get Business Name from Keycloak access token
    this.contactService.contactGetLoginInfo().subscribe(loginInfo => {
      if (loginInfo) {
        console.debug("[DFA] header.component: got names");
        this.showLoginMatMenu = true;
        this.lastName = loginInfo?.name;
      }
    });
  }

  homeButton(): void { }

  public async signOut(): Promise<void> {
    // 2024-06-05 EMCRI-217 waynezen: use new BCeID async Auth
    // await this.oidcSecurityService.logoffAndRevokeTokens();
    this.cacheService.clear();
    localStorage.clear();
    this.router.navigate(['/registration-method']);
  }
}
