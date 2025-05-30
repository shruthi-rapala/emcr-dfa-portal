import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CaseEligibility } from 'src/app/core/model/caseEligibilityEnum';
import { DialogContent } from 'src/app/core/model/dialog-content.model';


@Component({
  standalone: true,
  selector: 'app-appeal-confirmation-dialog',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './appeal-confirmation-dialog.component.html',
  styleUrl: './appeal-confirmation-dialog.component.scss'
})
export class AppealConfirmationDialogComponent {

  public content: any;
   CaseElibilityEnum = CaseEligibility;
   
  constructor(
    public dialogRef: MatDialogRef<AppealConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { content: any }
  ) {
    this.content = this.data.content;
  }

  cancel() {
    this.dialogRef.close('cancel');
  }

}
