import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DfaEventsComponent } from './dfa-events.component';

const routes: Routes = [{
  path: '', component: DfaEventsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DFAEventsRoutingModule { }
