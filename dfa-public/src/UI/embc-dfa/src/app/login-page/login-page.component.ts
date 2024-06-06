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
  
    this.loginService.getLogoutStatus.subscribe((data) => {
      if (data !== null || data !== '')
      {
        if(data === 'BCeID Login'){
          this.login();
        }
        else
          if(data === 'Logout'){
            this.logout();
          }
      }
    })

    this.oidcSecurityService.checkAuth().subscribe(
      ({ isAuthenticated}) => {
        if (isAuthenticated === true)
        {
          this.router.navigate(['/dfa-application-start']);
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
