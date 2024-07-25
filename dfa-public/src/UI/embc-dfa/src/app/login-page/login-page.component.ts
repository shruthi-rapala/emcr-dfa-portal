import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormCreationService } from '../core/services/formCreation.service';
import { LoginService } from '../core/services/login.service';
import { AuthModule, AuthOptions, LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { first } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  isAuthenticated = false;

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

    this.oidcSecurityService.checkAuth()
      .pipe(first())
      .subscribe((response) => {
        if (response?.isAuthenticated == true)
        {
          this.router.navigate(['/dfa-dashboard']);
        }
        else
        {
          this.router.navigate(['/registration-method']);
        }
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

    this.oidcSecurityService.logoff();
  }


}
