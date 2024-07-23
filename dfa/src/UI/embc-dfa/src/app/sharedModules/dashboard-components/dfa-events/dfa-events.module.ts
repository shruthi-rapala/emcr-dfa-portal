import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DFAEventsRoutingModule } from './dfa-events-routing.module';
import { DfaEventsComponent } from './dfa-events.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
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
