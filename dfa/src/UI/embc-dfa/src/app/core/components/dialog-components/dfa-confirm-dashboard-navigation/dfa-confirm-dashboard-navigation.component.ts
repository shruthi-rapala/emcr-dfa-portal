import { Component, EventEmitter, Input, Output, Inject } from '@angular/core';
import { DialogContent } from 'src/app/core/model/dialog-content.model';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-dfa-confirm-dashboard-navigation-dialog',
  templateUrl: './dfa-confirm-dashboard-navigation.component.html',
  styleUrls: ['./dfa-confirm-dashboard-navigation.component.scss']
})
export class DFAConfirmDashboardNavigationDialogComponent {
  public content: DialogContent;
  @Input() initDialog: boolean;
  @Output() outputEvent = new EventEmitter<string>();
  public isLoggedIn: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DFAConfirmDashboardNavigationDialogComponent>,
    loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
      this.content = this.data.content;
      if (loginService.isLoggedIn()) this.isLoggedIn = true;
    }

  cancel() {
    this.dialogRef.close('cancel');
  }

  confirm(): void {
    this.dialogRef.close('confirm');
  }
}
