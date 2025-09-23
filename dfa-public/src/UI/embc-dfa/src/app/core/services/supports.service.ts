import { Injectable } from '@angular/core';
import { Code } from '../api/models';
import { ConfigurationService } from '../api/services';
import { AlertService } from './alert.service';
import * as globalConst from './globalConstants';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SupportsService {
  private supportStatusVal: Code[] = [];
  private supportMethodVal: Code[] = [];

  constructor(
    private configService: ConfigurationService,
    private alertService: AlertService,
    private _snackBar: MatSnackBar
  ) {}

  get supportStatus() {
    return this.supportStatusVal;
  }

  set supportStatus(supportStatusVal: Code[]) {
    this.supportStatusVal = supportStatusVal;
  }

  get supportMethods() {
    return this.supportMethodVal;
  }

  set supportMethods(supportMethodVal: Code[]) {
    this.supportMethodVal = supportMethodVal;
  }

  public getSupportStatusList(): void {
    this.configService
      .configurationGetCodes({ forEnumType: 'SupportStatus' })
      .subscribe({
        next: (supStatus: Code[]) => {
          this.supportStatus = supStatus.filter(
            (status) => status.description !== null
          );
        },
        error: (error) => {
          //document.location.href = 'https://dfa.gov.bc.ca/error.html';
          this._snackBar.open(
            'Unable to Get Support Status List. Please try again later.',
            'Close',
            {
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
        }
      });
  }
}
