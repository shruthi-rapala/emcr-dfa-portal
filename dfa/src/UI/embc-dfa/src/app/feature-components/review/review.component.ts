import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, mapTo } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { FormCreationService } from '../../core/services/formCreation.service';
import {
  CaptchaResponse,
  CaptchaResponseType
} from 'src/app/core/components/captcha-v2/captcha-v2.component';
import { ApplicantOption } from 'src/app/core/api/models';
import { MatTableDataSource } from '@angular/material/table';
import { RoomType } from 'src/app/core/model/dfa-application-main.model';

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
  damagedRoomDataSource = new MatTableDataSource();
  damagedRoomColumnsToDisplay = ['roomType', 'description'];
  damagePhotoDataSource = new MatTableDataSource();
  damagePhotoColumnsToDisplay = ['fileName', 'fileDescription', 'uploadedDate'];
  supportingDocumentDataSource = new MatTableDataSource();
  supportingDocumentColumnsToDisplay = ['fileName', 'fileDescription', 'fileType', 'uploadedDate'];
  RoomTypes = RoomType;

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
    const _fullTimeOccupantsFormArray = this.formCreationService.occupantsForm.value.get('fullTimeOccupants');
    _fullTimeOccupantsFormArray.valueChanges
      .pipe(
        mapTo(_fullTimeOccupantsFormArray.getRawValue())
        ).subscribe(data => this.fullTimeOccupantsDataSource.data = data);

    // subscribe to changes in secondary applicants
    const _secondaryApplicantsFormArray = this.formCreationService.occupantsForm.value.get('secondaryApplicants');
    _secondaryApplicantsFormArray.valueChanges
      .pipe(
        mapTo(_secondaryApplicantsFormArray.getRawValue())
        ).subscribe(data => this.secondaryApplicantsDataSource.data = data);

    // subscribe to changes in other contacts
    const _otherContactsFormArray = this.formCreationService.occupantsForm.value.get('otherContacts');
    _otherContactsFormArray.valueChanges
      .pipe(
        mapTo(_otherContactsFormArray.getRawValue())
        ).subscribe(data => this.otherContactsDataSource.data = data);

    // subscribe to changes in clean up logs
    const _cleanUpWorkFormArray = this.formCreationService.cleanUpLogForm.value.get('cleanuplogs');
    _cleanUpWorkFormArray.valueChanges
      .pipe(
        mapTo(_cleanUpWorkFormArray.getRawValue())
        ).subscribe(data => this.cleanUpWorkDataSource.data = data);

    // subscribe to changes in receipts and invocies
    const _cleanUpWorkFileFormArray = this.formCreationService.cleanUpLogForm.value.get('cleanuplogFiles');
    _cleanUpWorkFileFormArray.valueChanges
      .pipe(
        mapTo(_cleanUpWorkFileFormArray.getRawValue())
        ).subscribe(data => this.cleanUpWorkFileDataSource.data = data);

    // subscribe to changes in damaged rooms
    const _damagedRoomFormArray = this.formCreationService.damagedItemsByRoomForm.value.get('damagedRooms');
    _damagedRoomFormArray.valueChanges
      .pipe(
        mapTo(_damagedRoomFormArray.getRawValue())
        ).subscribe(data => this.damagedRoomDataSource.data = data);

    // subscribe to changes in damage photos
    const _damagePhotoFormArray = this.formCreationService.damagedItemsByRoomForm.value.get('damagePhotos');
    _damagePhotoFormArray.valueChanges
      .pipe(
        mapTo(_damagePhotoFormArray.getRawValue())
        ).subscribe(data => this.damagePhotoDataSource.data = data);

    // subscribe to changes in supporting documents
    const _supportingDocumentsFormArray = this.formCreationService.supportingDocumentsForm.value.get('supportingDocuments');
    _supportingDocumentsFormArray.valueChanges
      .pipe(
        mapTo(_supportingDocumentsFormArray.getRawValue())
        ).subscribe(data => this.supportingDocumentDataSource.data = data);
  }

  // callParentMoveStep(index: number) {
  //   this.parentApi.callParentMoveStep(index)
  // }

  navigateToStep(stepIndex: number) {
    this.stepToNavigate.emit(stepIndex);
  }

  editDetails(componentToEdit: string): void {
    let route: string;
    if (this.currentFlow === 'non-verified-registration') {
      route = '/non-verified-registration/edit/' + componentToEdit;
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
