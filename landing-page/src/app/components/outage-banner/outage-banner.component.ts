import { Component, OnInit } from '@angular/core';
import { EnvironmentBannerService, EnvironmentInformation } from '../../services/environment.service';

@Component({
  selector: 'app-outage-banner',
  imports: [],
  templateUrl: './outage-banner.component.html',
  styleUrl: './outage-banner.component.scss'
})
export class OutageBannerComponent implements OnInit {

  
  public environment?: EnvironmentInformation;

  constructor(private environmentBannerService: EnvironmentBannerService) { }

  ngOnInit(): void {
    this.environmentBannerService.getEnvironment().subscribe(environment => {
      this.environment = environment;
    });
  }

}
