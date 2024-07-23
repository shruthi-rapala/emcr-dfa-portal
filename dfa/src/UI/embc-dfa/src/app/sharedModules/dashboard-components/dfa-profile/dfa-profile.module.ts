import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DFAProfileRoutingModule } from './dfa-profile-routing.module';
import { DfaProfileComponent } from './dfa-profile.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { ReviewModule } from '../../../feature-components/review/review.module';

@NgModule({
  declarations: [DfaProfileComponent],
  imports: [CommonModule, DFAProfileRoutingModule, MatButtonModule, ReviewModule]
})
export class DFAProfileModule { }
