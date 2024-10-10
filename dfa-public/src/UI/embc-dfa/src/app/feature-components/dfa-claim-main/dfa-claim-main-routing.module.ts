import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DFAClaimMainComponent } from './dfa-claim-main.component';

const routes: Routes = [{ path: '', component: DFAClaimMainComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DFAClaimMainRoutingModule {}
