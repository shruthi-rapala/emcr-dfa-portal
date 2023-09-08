import { Component, EventEmitter, Input, Output, Inject } from '@angular/core';
import { DialogContent } from 'src/app/core/model/dialog-content.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bcsc-email-error-dialog',
  templateUrl: './bcsc-email-error-dialog.component.html',
  styleUrls: ['./bcsc-email-error-dialog.component.scss']
})
export class BCSCEmailErrorDialogComponent {
  public content: DialogContent;
  @Input() initDialog: boolean;
  @Output() outputEvent = new EventEmitter<string>();

  constructor(
    public dialogRef: MatDialogRef<BCSCEmailErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.content = this.data.content;
    }

  confirm(): void {
    this.dialogRef.close('confirm');
  }
}
