import {
  UntypedFormBuilder,
  UntypedFormGroup,
  AbstractControl,
  FormsModule,
  Validators
} from '@angular/forms';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormCreationService } from 'src/app/core/services/formCreation.service';
import { CustomValidationService } from 'src/app/core/services/customValidation.service';
import { DFAApplicationMainDataService } from 'src/app/feature-components/dfa-application-main/dfa-application-main-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DFAApplicationMainMappingService } from 'src/app/feature-components/dfa-application-main/dfa-application-main-mapping.service';
import { ApplicationService } from 'src/app/core/api/services';

@Component({
  selector: 'app-create-application1',
  standalone: true,
  imports: [],
  templateUrl: './create-application1.component.html',
  styleUrl: './create-application1.component.scss'
})
export default class CreateApplication1Component implements OnInit {
  @Input() createApplication1Form: UntypedFormGroup;
  // formBuilder: UntypedFormBuilder;
  // propertyDamageForm$: Subscription;
  // formCreationService: FormCreationService;
  // isReadOnly: boolean;
  // vieworedit: string;

  constructor() {}

  ngOnInit(): void {}

/*
  constructor(
    // @Inject('formBuilder') formBuilder: UntypedFormBuilder,
    // @Inject('formCreationService') formCreationService: FormCreationService,
    public customValidator: CustomValidationService,
    public dfaApplicationMainDataService: DFAApplicationMainDataService,
    private applicationService: ApplicationService,
    private dfaApplicationMainMapping: DFAApplicationMainMappingService,
    public dialog: MatDialog
  ) {
    // this.formBuilder = formBuilder;
    // this.formCreationService = formCreationService;
    this.isReadOnly = (dfaApplicationMainDataService.getViewOrEdit() === 'view'
    || dfaApplicationMainDataService.getViewOrEdit() === 'edit'
    || dfaApplicationMainDataService.getViewOrEdit() === 'viewOnly');
    this.setViewOrEditControls();

    this.dfaApplicationMainDataService.changeViewOrEdit.subscribe((vieworedit) => {
      this.isReadOnly = (vieworedit === 'view'
      || vieworedit === 'edit'
        || vieworedit === 'viewOnly');
      this.setViewOrEditControls();
    })

    this.vieworedit = dfaApplicationMainDataService.getViewOrEdit();
  }

  setViewOrEditControls() {
    if (!this.createApplication1Form) return;
    if (this.isReadOnly) {
      this.createApplication1Form.controls.legalName.disable();
    } else {
      this.createApplication1Form.controls.legalName.enable();

    }
  }

  ngOnInit(): void {
    this.propertyDamageForm$ = this.formCreationService
      .getCreateApplication1Form()
      .subscribe((createApplication1) => {
        this.createApplication1Form = createApplication1;
        this.setViewOrEditControls();
        // this.dfaApplicationMainDataService.propertyDamage = {
        //   damageFromDate: null,
        //   damageToDate: null,
        //   floodDamage: null,
        //   landslideDamage: null,
        //   otherDamage: null,
        //   otherDamageText: null,
        //   stormDamage: null,
        //   wildfireDamage: null,
        //   guidanceSupport: null,
        //   applicantSubtype: null
        // }
      });
    }

  get createApplication1FormControl(): { [key: string]: AbstractControl } {
    return this.createApplication1Form.controls;
  }
*/


  // ngOnDestroy(): void {
  //   this.propertyDamageForm$.unsubscribe();
  // }
}
