import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DFAEventsRoutingModule } from './dfa-events-routing.module';
import { DfaEventsComponent } from './dfa-events.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DfaEventsComponent],
  imports: [CommonModule, DFAEventsRoutingModule, MatButtonModule]
})
export class DFAEventsModule { }
