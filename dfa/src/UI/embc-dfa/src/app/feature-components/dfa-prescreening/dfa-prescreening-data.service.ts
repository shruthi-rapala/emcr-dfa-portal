import { Injectable } from '@angular/core';
import { DfaPrescreening } from 'src/app/core/model/dfa-prescreening.model';

@Injectable({ providedIn: 'root' })
export class DFAPrescreeningDataService {
  private _dfaPrescreening: DfaPrescreening;

  constructor(
  ) {
  }
  public get dfaPrescreening(): DfaPrescreening {
    return this._dfaPrescreening;
  }

  public set dfaPrescreening(value: DfaPrescreening) {
    this._dfaPrescreening = value;
  }
}
