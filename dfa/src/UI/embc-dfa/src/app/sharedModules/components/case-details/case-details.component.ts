import { Component, Input } from '@angular/core';
import { DFAAppealDataService } from 'src/app/feature-components/dfa-appeal/dfa-appeal-data.service';
import { DfaApplicationMain } from 'src/app/core/api/models';


@Component({
  selector: 'app-case-details',
  standalone: false,
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss']
})
export default class CaseDetailsComponent {
  caseDetails: any;
  applicationDetails: DfaApplicationMain;

  constructor(private appealDataService: DFAAppealDataService) {}

  ngOnInit() {
    this.caseDetails = this.appealDataService.getCaseDetails();
    this.applicationDetails = this.appealDataService.getFullApplication();
  }
}