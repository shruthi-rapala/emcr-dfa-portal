import { Injectable } from '@angular/core';
import { DfaApplicationStart } from 'src/app/core/api/models';
import { Observable } from 'rxjs';
import { ApplicationService } from '../../core/api/services/application.service';

@Injectable({ providedIn: 'root' })
export class DFAApplicationStartService {
  constructor(
    private applicationService: ApplicationService,
  ) {}

 public upsertApplication(updatedApplication: DfaApplicationStart): Observable<string> {
    return this.applicationService.applicationAddApplication({ body: updatedApplication });
  }
}
