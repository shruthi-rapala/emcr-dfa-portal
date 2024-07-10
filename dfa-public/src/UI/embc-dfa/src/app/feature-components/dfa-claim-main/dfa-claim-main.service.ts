import { EventEmitter, Injectable } from '@angular/core';
import { FullTimeOccupant, DfaApplicationMain, OtherContact, SecondaryApplicant } from 'src/app/core/model/dfa-application-main.model';
import { Observable } from 'rxjs';
import { ApplicationService } from 'src/app/core/api/services';
import { ProjectService } from 'src/app/core/api/services';
import { DfaClaimMain, FileUpload } from '../../core/model/dfa-claim-main.model';

@Injectable({ providedIn: 'root' })
export class DFAClaimMainService {
  private _fullTimeOccupants: Array<FullTimeOccupant> = [];
  private _otherContacts: Array<OtherContact> = [];
  private _secondaryApplicants: Array<SecondaryApplicant> = [];
  public deleteDamagePhoto = new EventEmitter<FileUpload>();
  public deleteCleanupLog = new EventEmitter<FileUpload>();

  constructor(
    private applicationService: ApplicationService,
    private projectService: ProjectService
  ) {}

  public upsertClaim(updatedProject: DfaClaimMain): Observable<string> {
    return this.projectService.projectUpsertProject({ body: updatedProject });
  }
}
