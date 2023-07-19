import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dfa-profile',
  templateUrl: './dfa-profile.component.html',
  styleUrls: ['./dfa-profile.component.scss']
})
export class DfaProfileComponent implements OnInit {
  type = 'profile';
  profileHeading: string;
  parentPageName = 'dashboard';
  currentFlow: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.currentFlow = this.route.snapshot.data.flow;
  }

}
