import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateMaskDirective } from './DateMask.directive';
import { PhoneMaskDirective } from './PhoneMask.directive';
import { FileDragNDropDirective } from './draganddrop';

@NgModule({
  declarations: [DateMaskDirective, PhoneMaskDirective, FileDragNDropDirective],
  imports: [CommonModule],
  exports: [DateMaskDirective, PhoneMaskDirective, FileDragNDropDirective]
})
export class DirectivesModule {}
