import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, mapTo } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { FormCreationService } from '../../core/services/formCreation.service';
import {
  CaptchaResponse,
  CaptchaResponseType
} from 'src/app/core/components/captcha-v2/captcha-v2.component';
import { ApplicantOption, FileCategory, RoomType } from 'src/app/core/api/models';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  @Output() captchaPassed = new EventEmitter<CaptchaResponse>();
  // @Input() parentApi !: any;
  @Input() type: string;
  @Input() showHeading: boolean;
  @Input() currentFlow: string;
  @Input() parentPageName: string;
  @Input() allowEdit: boolean;
  @Output() stepToNavigate = new EventEmitter<number>();
  componentToLoad: Observable<any>;
  cs: any;
  siteKey: string;
  ApplicantOptions = ApplicantOption;
  hideCard = false;
  navigationExtras: NavigationExtras;
  fullTimeOccupantsDataSource = new MatTableDataSource();
  fullTimeOccupantsColumnsToDisplay = ['name', 'relationship'];
  secondaryApplicantsDataSource = new MatTableDataSource();
  secondaryApplicantsColumnsToDisplay = ['applicantType', 'name', 'phoneNumber', 'email'];
  otherContactsDataSource = new MatTableDataSource();
  otherContactsColumnsToDisplay = ['name', 'phoneNumber', 'email'];
  cleanUpWorkDataSource = new MatTableDataSource();
  cleanUpWorkColumnsToDisplay = ['date', 'name','hours','description'];
  cleanUpWorkFileDataSource = new MatTableDataSource();
  cleanUpWorkFileColumnsToDisplay = ['fileName', 'fileDescription', 'fileDate'];
  damagedRoomsDataSource = new MatTableDataSource();
  damagedRoomsColumnsToDisplay = ['roomType', 'description'];
  damagePhotosDataSource = new MatTableDataSource();
  damagePhotosColumnsToDisplay = ['fileName', 'fileDescription', 'uploadedDate'];
  supportingDocumentsDataSource = new MatTableDataSource();
  supportingDocumentsColumnsToDisplay = ['fileName', 'fileDescription', 'fileType', 'uploadedDate'];
  RoomTypes = RoomType;
  FileCategories = FileCategory;

  constructor(
    private router: Router,
    public formCreationService: FormCreationService
  ) {
  }

  ngOnInit(): void {
    this.navigationExtras = { state: { parentPageName: this.parentPageName } };
    if (this.currentFlow === 'verified-registration') {
      this.captchaPassed.emit({
        type: CaptchaResponseType.success
      });
    }

    // subscribe to changes in full time occupants
    const _fullTimeOccupantsFormArray = this.formCreationService.fullTimeOccupantsForm.value.get('fullTimeOccupants');
    _fullTimeOccupantsFormArray.valueChanges
      .pipe(
        mapTo(_fullTimeOccupantsFormArray.getRawValue())
        ).subscribe(data => this.fullTimeOccupantsDataSource.data = data);

    // subscribe to changes in secondary applicants
    const _secondaryApplicantsFormArray = this.formCreationService.secondaryApplicantsForm.value.get('secondaryApplicants');
    _secondaryApplicantsFormArray.valueChanges
      .pipe(
        mapTo(_secondaryApplicantsFormArray.getRawValue())
        ).subscribe(data => this.secondaryApplicantsDataSource.data = data);

    // subscribe to changes in other contacts
    const _otherContactsFormArray = this.formCreationService.otherContactsForm.value.get('otherContacts');
    _otherContactsFormArray.valueChanges
      .pipe(
        mapTo(_otherContactsFormArray.getRawValue())
        ).subscribe(data => this.otherContactsDataSource.data = data);

    // subscribe to changes in clean up logs
    const _cleanUpWorkFormArray = this.formCreationService.cleanUpLogItemsForm.value.get('cleanuplogs');
    _cleanUpWorkFormArray.valueChanges
      .pipe(
        mapTo(_cleanUpWorkFormArray.getRawValue())
        ).subscribe(data => this.cleanUpWorkDataSource.data = data);

    // subscribe to changes in receipts and invocies
    const _cleanUpWorkFileFormArray = this.formCreationService.fileUploadsForm.value.get('fileUploads');
    _cleanUpWorkFileFormArray.valueChanges
      .pipe(
        mapTo(_cleanUpWorkFileFormArray.getRawValue())
        ).subscribe(data => { this.cleanUpWorkFileDataSource.data = data.filter(x => x.fileType === this.FileCategories.Cleanup && x.deleteFlag == false) });

    // subscribe to changes in damaged rooms
    const _damagedRoomsFormArray = this.formCreationService.damagedRoomsForm.value.get('damagedRooms');
    _damagedRoomsFormArray.valueChanges
      .pipe(
        mapTo(_damagedRoomsFormArray.getRawValue())
        ).subscribe(data => this.damagedRoomsDataSource.data = data);

    // subscribe to changes in damage photos
    const _damagePhotosFormArray = this.formCreationService.fileUploadsForm.value.get('fileUploads');
    _damagePhotosFormArray.valueChanges
      .pipe(
        mapTo(_damagePhotosFormArray.getRawValue())
        ).subscribe(data => this.damagePhotosDataSource.data = data.filter(x => x.fileType === this.FileCategories.DamagePhoto && x.deleteFlag == false));

    // subscribe to changes in supporting documents
    const _supportingDocumentsFormArray = this.formCreationService.fileUploadsForm.value.get('fileUploads');
    _supportingDocumentsFormArray.valueChanges
      .pipe(
        mapTo(_supportingDocumentsFormArray.getRawValue())
        ).subscribe(data => { this.supportingDocumentsDataSource.data = data.filter(x => x.fileType !== this.FileCategories.DamagePhoto && x.fileType !== this.FileCategories.Cleanup && x.deleteFlag == false) } );
  }

  // callParentMoveStep(index: number) {
  //   this.parentApi.callParentMoveStep(index)
  // }

  navigateToStep(stepIndex: number) {
    this.stepToNavigate.emit(stepIndex);
  }

  editDetails(componentToEdit: string): void {
    let route: string;
    if (this.currentFlow === 'dfa-dashboard') {
      route = '/dfa-dashboard/edit/' + componentToEdit;
    } else {
      route = '/verified-registration/edit/' + componentToEdit;
    }
    this.router.navigate([route], this.navigationExtras);
  }

  back(): void {
    this.hideCard = false;
  }

  formatPostalCode(postalCode: string): string {
    let rtnPostalCode = postalCode;
    if (postalCode.length === 6) { return postalCode.substring(0,3) + " " + postalCode.substring(3,6)};
    return rtnPostalCode;
  }

  onTokenResponse($event: CaptchaResponse) {
    this.captchaPassed.emit($event);
  }
}
