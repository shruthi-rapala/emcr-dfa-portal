import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DFADashInvoiceRoutingModule } from './invoice-routing.module';
import { DfaDashInvoiceComponent } from './invoice.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [DfaDashInvoiceComponent],
  imports: [CommonModule, DFADashInvoiceRoutingModule, MatButtonModule, MatIconModule, CoreModule, MatSelectModule]
})
export class DFADashInvoiceModule { }
