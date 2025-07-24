import { ChangeDetectorRef, Component, OnDestroy, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormCreationService } from 'src/app/core/services/formCreation.service';
import { DFAAppealDataService } from 'src/app/feature-components/dfa-appeal/dfa-appeal-data.service';
import { DfaApplicationMain } from 'src/app/core/api/models';

@Component({
  selector: 'app-appeal-reason',
  standalone: false,
  templateUrl: './appeal-reason.component.html',
  styleUrls: ['./appeal-reason.component.scss']
})
export default class AppealReasonComponent implements OnInit, OnDestroy {
  appealReasonForm: FormGroup;
  appealReasonForm$: Subscription;
  appealType: string;
  @Input() applicationDetails: DfaApplicationMain = this.appealDataService.getFullApplication();
  @Input() caseDetails: any;

  constructor(
    private formCreationService: FormCreationService,
    private appealDataService: DFAAppealDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log("Application Details: ", this.applicationDetails);
    // this.appealType = this.caseDetails?.type;

    this.cdr.detectChanges();

    // Initialize form
    this.appealReasonForm$ = this.formCreationService.getAppealReasonForm().subscribe((form) => {
      if (form) {
        this.appealReasonForm = form;
        
      }
    });
  }

  ngOnDestroy(): void {
    this.appealReasonForm$?.unsubscribe();
  }
}
