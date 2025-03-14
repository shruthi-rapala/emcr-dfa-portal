import { EventEmitter, Injectable } from '@angular/core';
import { CacheService } from 'src/app/core/services/cache.service';
import { ApplicationService, AttachmentService } from 'src/app/core/api/services';
import { BehaviorSubject, Observable } from 'rxjs';
import { DfaProjectMain, FileUpload, RecoveryPlan } from '../../core/model/dfa-project-main.model';

@Injectable({ providedIn: 'root' })
export class DFAProjectMainDataService {
  private _recoveryPlan: RecoveryPlan;
  private _fileUploads = [];
  private _dfaProjectMain: DfaProjectMain;
  private _isSubmitted: boolean = false;
  private _applicationId: string;
  private _projectId: string;
  private _claimId: string;
  private _vieworedit: string;
  private _stepselected: string;
  private _isdisabled: string;
  private _editstep: string;
  private _requiredDocuments = [];
  public changeViewOrEdit: EventEmitter<string> = new EventEmitter<string>();
  public changeDisableFileUpload: EventEmitter<string> = new EventEmitter<string>();
  public stepSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private cacheService: CacheService,
    private fileUploadsService: AttachmentService,
    private applicationService: ApplicationService
  ) {
  }

  public get recoveryPlan(): RecoveryPlan {
    return this._recoveryPlan;
  }

  public set recoveryPlan(value: RecoveryPlan) {
    this._recoveryPlan = value;
  }


  public get requiredDocuments(): Array<string> {
    return this._requiredDocuments;
  }

  public set requiredDocuments(value: Array<string>) {
    this._requiredDocuments = value;
  }

  public get fileUploads(): Array<FileUpload> {
    return this._fileUploads;
  }
  public set fileUploads(value: Array<FileUpload>) {
    this._fileUploads = value;
  }

  public getDFAProjectMain(): DfaProjectMain {
    if (this._dfaProjectMain === null || undefined) {
      this._dfaProjectMain = JSON.parse(this.cacheService.get('dfa-project-main'));
    }
    return this._dfaProjectMain;
  }

  public get isSubmitted(): boolean {
    return this._isSubmitted;
  }
  public set isSubmitted(value: boolean) {
    this._isSubmitted = value;
  }

  public setDFAProjectMain(dfaProjectMain: DfaProjectMain): void {
    this._dfaProjectMain = dfaProjectMain;
    this.cacheService.set('dfa-project-main', dfaProjectMain);
  }

  public setApplicationId(applicationId: string): void {
    this._applicationId = applicationId;
  }

  public getApplicationId(): string {
    return this._applicationId;
  }

  public setProjectId(projectId: string): void {
    this._projectId = projectId;
  }

  public getProjectId(): string {
    return this._projectId;
  }

  public setClaimId(claimId: string): void {
    this._claimId = claimId;
  }

  public getClaimId(): string {
    return this._claimId;
  }

  public setViewOrEdit(vieworedit: string): void {
    this._vieworedit = vieworedit;
    this.changeViewOrEdit.emit(vieworedit);
  }
  public getViewOrEdit(): string {
    return this._vieworedit;
  }

  public setCurrentStepSelected(step: string): void {
    this._stepselected = step;
    this.stepSelected.emit(step);
  }
  public getCurrentStepSelected(): string {
    return this._stepselected;
  }

  public setDisableFileUpload(isdisabled: string): void {
    this._isdisabled = isdisabled;
    this.changeDisableFileUpload.emit(isdisabled);
  }
  public getDisableFileUpload(): string {
    return this._isdisabled;
  }

  public setEditStep(editstep: string): void {
    this._editstep = editstep;
  }
  public getEditStep(): string {
    return this._editstep;
  }

   public createDFAProjectMainDTO(): DfaProjectMain {
    return {
      id: this._projectId,
      applicationId: this._applicationId,
      project: this._recoveryPlan
    };
  }
}
