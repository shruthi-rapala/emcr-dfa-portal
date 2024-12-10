import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DFADashProjectRoutingModule } from './project-routing.module';
import { DfaDashProjectComponent } from './project.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [DfaDashProjectComponent],
  imports: [CommonModule, DFADashProjectRoutingModule, MatButtonModule, MatIconModule, CoreModule, MatSelectModule]
})
export class DFADashProjectModule { }
