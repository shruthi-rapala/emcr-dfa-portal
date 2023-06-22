import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { NextstepsprofileRoutingModule } from './nextstepsprofile-routing.module';
import { NextstepsprofileComponent } from './nextstepsprofile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [NextstepsprofileComponent],
  imports: [
    CommonModule,
    NextstepsprofileRoutingModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ]
})
export class NextstepsprofileModule { }
