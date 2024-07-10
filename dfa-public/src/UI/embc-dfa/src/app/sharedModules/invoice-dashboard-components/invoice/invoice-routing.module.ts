import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DfaDashInvoiceComponent } from './invoice.component';

const routes: Routes = [{
  path: '', component: DfaDashInvoiceComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DFADashInvoiceRoutingModule { }
