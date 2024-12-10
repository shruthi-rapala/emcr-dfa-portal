import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DFADashClaimRoutingModule } from './claim-routing.module';
import { DfaDashClaimComponent } from './claim.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [DfaDashClaimComponent],
  imports: [CommonModule, DFADashClaimRoutingModule, MatButtonModule, MatIconModule, CoreModule, MatSelectModule]
})
export class DFADashClaimModule { }
