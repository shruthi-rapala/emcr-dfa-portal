import { Component, EventEmitter, Input, Output, Inject } from '@angular/core';
import { DialogContent } from 'src/app/core/model/dialog-content.model';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-dfa-eligibility-dialog',
  templateUrl: './dfa-eligibility-dialog.component.html',
  styleUrls: ['./dfa-eligibility-dialog.component.scss']
})
export class DFAEligibilityDialogComponent {
  public content: DialogContent;
  @Input() initDialog: boolean;
  @Output() outputEvent = new EventEmitter<string>();

  constructor(
    public dialogRef: MatDialogRef<DFAEligibilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.content = this.data.content;
    }

  cancel() {
    this.dialogRef.close('cancel');
  }

  confirm(): void {
    this.dialogRef.close('confirm');
  }
}
