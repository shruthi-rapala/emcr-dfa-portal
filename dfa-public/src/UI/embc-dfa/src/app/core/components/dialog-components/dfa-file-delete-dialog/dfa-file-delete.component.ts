import { Component, EventEmitter, Input, Output, Inject } from '@angular/core';
import { DialogContent } from 'src/app/core/model/dialog-content.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dfa-file-delete-dialog',
  templateUrl: './dfa-file-delete.component.html',
  styleUrls: ['./dfa-file-delete.component.scss']
})
export class DFAFileDeleteDialogComponent {
  public content: DialogContent;
  @Input() initDialog: boolean;
  @Output() outputEvent = new EventEmitter<string>();

  constructor(
    public dialogRef: MatDialogRef<DFAFileDeleteDialogComponent>,
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
