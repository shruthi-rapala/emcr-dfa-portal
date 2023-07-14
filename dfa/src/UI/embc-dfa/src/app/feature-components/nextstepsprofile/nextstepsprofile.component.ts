import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nextstepsprofile',
  templateUrl: './nextstepsprofile.component.html',
  styleUrls: ['./nextstepsprofile.component.scss']
})
export class NextstepsprofileComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  navigateToDFAApplicationStart(): void {
    this.router.navigate(['/dfa-application-start']);
  }

  navigateToDashboard(): void {
    this.router.navigate(['/dfa-dashboard']);
  }

}
