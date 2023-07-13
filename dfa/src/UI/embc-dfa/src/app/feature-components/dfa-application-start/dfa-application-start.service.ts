import { Injectable } from '@angular/core';
import { DFAApplicationStart } from 'src/app/core/model/dfa-application-start.model';
// import { DFAApplicationStartService as Service } from '../../core/api/services/dfa-application.service';
import { DFAApplicationStartMappingService } from './dfa-application-start-mapping.service';
import { Observable } from 'rxjs';
import { ApplicationService } from '../../core/api/services/application.service';

@Injectable({ providedIn: 'root' })
export class DFAApplicationStartService {
  constructor(
    private applicationService: ApplicationService,
  ) {}

 public upsertApplication(updatedApplication: DFAApplicationStart): Observable<string> {
    // return this.applicationService.applicationAddApplication({ body: updatedApplication });
    return this.applicationService.applicationAddApplication( { application: "Hello"});
  }
}
