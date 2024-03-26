import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DfaApplicationComponent } from './dfa-application.component';

const routes: Routes = [{
  path: '', component: DfaApplicationComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DFAApplicationRoutingModule { }
