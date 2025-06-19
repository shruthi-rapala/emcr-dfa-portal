import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { DfaClaimMain } from 'src/app/core/api/models';
import { ClaimService } from 'src/app/core/api/services';
import { CoreModule } from 'src/app/core/core.module';
import { DFAClaimMainMappingService } from 'src/app/feature-components/dfa-claim-main/dfa-claim-main-mapping.service';
@Component({
  selector: 'app-claim-decision',
  standalone: true,
  imports: [CoreModule, MatCardModule],
  templateUrl: './claim-decision.component.html',
  styleUrl: './claim-decision.component.scss'
})
export class ClaimDecisionComponent implements OnInit {

  recoveryClaim?: DfaClaimMain;
     private dfaClaimMainMapping: DFAClaimMainMappingService

  recoveryClaimFormAbstract: [];
  constructor(
     private claimService: ClaimService,
     private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    var claimId = this.route.snapshot.paramMap.get('id');
    console.log('Claim ID from route:', claimId);
    if (claimId) {  
    this.getRecoveryClaim(claimId);
    console.log('recoveryClaim?.id:', this.recoveryClaim?.id);
    }
    console.log('Claim Decision Component Initialized');
  
  }


  getRecoveryClaim(claimId: string) {
    if (claimId) {
      this.claimService.claimGetClaimMain({ claimId: claimId }).subscribe({
        next: (dfaClaimMain) => {
          this.recoveryClaim = dfaClaimMain;
          //this.dfaClaimMainMapping.mapDFAClaimMain(dfaClaimMain);
          console.log('Recovery Claim:', this.recoveryClaim);
        },
        error: (_error) => {}
      });
    }
  }

  BackToDashboard(){
  }
}
