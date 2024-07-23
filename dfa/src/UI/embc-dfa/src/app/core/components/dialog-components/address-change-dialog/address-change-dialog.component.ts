import { Component, EventEmitter, Input, Output, Inject } from '@angular/core';
import { DialogContent } from 'src/app/core/model/dialog-content.model';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { ProfileService } from 'src/app/core/api/services';

@Component({
  selector: 'app-addresschange-dialog',
  templateUrl: './address-change-dialog.component.html',
  styleUrls: ['./address-change-dialog.component.scss']
})
export class AddressChangeComponent {
  @Input() content: DialogContent;
  @Output() outputEvent = new EventEmitter<string>();

  constructor(
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<AddressChangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.content = this.data.content;
  }

  confirm(): void {
    this.dialogRef.close('confirm');
  }

  cancel(): void {
    //this.outputEvent.emit('cancel');
    //this.profileService.profileMarkAddressChangeMessageDisplay().subscribe(profile => {
    //  console.log('success')
    //});
    this.dialogRef.close('confirm');
  }

  //confirm(): void {
  //  this.outputEvent.emit('confirm');
  //}
}
