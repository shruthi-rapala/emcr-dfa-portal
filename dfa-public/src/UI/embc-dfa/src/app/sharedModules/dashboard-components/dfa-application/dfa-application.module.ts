import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DFAApplicationRoutingModule } from './dfa-application-routing.module';
import { DfaApplicationComponent } from './dfa-application.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { CoreModule } from 'src/app/core/core.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [DfaApplicationComponent],
  imports: [CommonModule, DFAApplicationRoutingModule, MatButtonModule, MatIconModule, CoreModule, FormsModule, ReactiveFormsModule]
})
export class DFADashApplicationModule { }
