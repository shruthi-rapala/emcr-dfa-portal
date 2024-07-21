import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormCreationService } from '../core/services/formCreation.service';
import { LoginService } from '../core/services/login.service';
import { AuthModule, AuthOptions, LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private router: Router,
    private formCreationService: FormCreationService,
    private loginService: LoginService
  ) {

  }

  ngOnInit(): void {
    this.formCreationService.clearProfileData();
  
    console.log('login page component!');

    this.oidcSecurityService.checkAuth().subscribe(
      ({ isAuthenticated}) => {
        if (isAuthenticated === true)
        {
          // this.router.navigate(['/dfa-dashboard']);
          this.router.navigate(['/dfa-collection-notice']);
        }
        else
        {
          this.router.navigate(['/']);
        }

        this.loginService.currentUser(isAuthenticated);
      });

  }

  verifyUser(): void {

    // TODO: EMCRI-217 waynezen finish
    alert('verifyUser');

  }

  login() {

    this.oidcSecurityService.authorize();
  }

  logout() {

    this.oidcSecurityService.logoffAndRevokeTokens();
  }


}
