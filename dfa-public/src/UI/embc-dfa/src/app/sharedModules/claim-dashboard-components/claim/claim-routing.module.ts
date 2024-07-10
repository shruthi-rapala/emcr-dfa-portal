import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DfaDashClaimComponent } from './claim.component';

const routes: Routes = [{
  path: '', component: DfaDashClaimComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DFADashClaimRoutingModule { }
