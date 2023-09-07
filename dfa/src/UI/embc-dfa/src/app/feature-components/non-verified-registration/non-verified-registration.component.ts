import { Component, OnInit } from '@angular/core';
import { FormCreationService } from '../../core/services/formCreation.service';

@Component({
  selector: 'app-non-verified-registration',
  templateUrl: './non-verified-registration.component.html',
  styleUrls: ['./non-verified-registration.component.scss']
})
export class NonVerifiedRegistrationComponent implements OnInit {
  constructor(
    private formCreationService: FormCreationService,
  ) {}

  ngOnInit(): void {
    // this.formCreationService.clearProfileData();
  }
}
