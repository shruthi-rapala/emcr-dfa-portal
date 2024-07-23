import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

import { NextstepsprofileRoutingModule } from './nextstepsprofile-routing.module';
import { NextstepsprofileComponent } from './nextstepsprofile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [NextstepsprofileComponent],
  imports: [
    CommonModule,
    NextstepsprofileRoutingModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    CommonModule,
    CoreModule
  ]
})
export class NextstepsprofileModule { }
