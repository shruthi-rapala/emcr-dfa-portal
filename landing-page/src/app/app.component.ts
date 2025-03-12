import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatCard, MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EnvironmentBannerComponent } from './components/environment-banner/environment-banner.component';
import { OutageBannerComponent } from './components/outage-banner/outage-banner.component';


@Component({
  selector: 'app-root',
  imports: [
  RouterOutlet,
  MatCardModule, 
  MatCard,
  MatIconModule,
  MatButtonModule,
  EnvironmentBannerComponent,
  OutageBannerComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  title = 'landing-page';

  public privatePortal = 'https://portal.dev.dfa.gov.bc.ca';
  public publicPortal = 'https://publicsector-dev.dfa.gov.bc.ca';

  private privateUrlRegistration = this.privatePortal + '/registration-method';
	private publicUrlRegistration = this.privatePortal + '/registration-method';
  
  naviagteToPublicDFA(){
    window.open(  this.publicUrlRegistration, '_blank');
  }

  naviagteToPrivateDFA(){
    window.open(  this.privateUrlRegistration, '_blank');
  }
}
