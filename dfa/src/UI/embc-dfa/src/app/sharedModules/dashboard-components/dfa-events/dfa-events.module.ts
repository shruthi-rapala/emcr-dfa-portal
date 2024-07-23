import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DFAEventsRoutingModule } from './dfa-events-routing.module';
import { DfaEventsComponent } from './dfa-events.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CustomPipeModule } from 'src/app/core/pipe/customPipe.module';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [DfaEventsComponent],
  imports: [
    CommonModule,
    DFAEventsRoutingModule,
    MatButtonModule,
    MatTableModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    CustomPipeModule,
    CoreModule]
})
export class DFAEventsModule { }
