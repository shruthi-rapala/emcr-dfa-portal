import { EventEmitter, Injectable } from '@angular/core';
import { FullTimeOccupant, DfaApplicationMain, OtherContact, SecondaryApplicant } from 'src/app/core/model/dfa-application-main.model';
import { DFAProjectMainMappingService } from './dfa-project-main-mapping.service';
import { DFAProjectMainDataService } from './dfa-project-main-data.service';
import { DfaProjectMain, FileUpload } from 'src/app/core/model/dfa-project-main.model';
import { Observable } from 'rxjs';
import { ApplicationService } from 'src/app/core/api/services';

@Injectable({ providedIn: 'root' })
export class DFAProjectMainService {
  private _fullTimeOccupants: Array<FullTimeOccupant> = [];
  private _otherContacts: Array<OtherContact> = [];
  private _secondaryApplicants: Array<SecondaryApplicant> = [];
  public deleteDamagePhoto = new EventEmitter<FileUpload>();
  public deleteCleanupLog = new EventEmitter<FileUpload>();

  constructor(
    private dfaApplicationMainMapping: DFAProjectMainMappingService,
    private dfaApplicationMainDataService: DFAProjectMainDataService,
    private applicationService: ApplicationService
  ) {}

  //public upsertProject(updatedProject: DfaProjectMain): Observable<string> {
  //  return this.applicationService.applicationUpdateApplication({ body: updatedProject });
  //}
}
