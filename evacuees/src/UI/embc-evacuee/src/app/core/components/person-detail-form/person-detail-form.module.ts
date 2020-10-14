import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonDetailFormComponent } from '../person-detail-form/person-detail-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    PersonDetailFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    DirectivesModule
  ],
  exports: [
    PersonDetailFormComponent
  ]
})
export class PersonDetailFormModule { }
