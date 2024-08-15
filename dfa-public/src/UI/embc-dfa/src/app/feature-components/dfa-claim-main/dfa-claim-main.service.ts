import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClaimService } from 'src/app/core/api/services';
import { DfaClaimMain } from '../../core/model/dfa-claim-main.model';

@Injectable({ providedIn: 'root' })
export class DFAClaimMainService {

  constructor(
    private claimService: ClaimService
  ) {}

  public upsertClaim(updatedClaim: DfaClaimMain): Observable<string> {
    return this.claimService.claimUpsertClaim({ body: updatedClaim });
  }
}
