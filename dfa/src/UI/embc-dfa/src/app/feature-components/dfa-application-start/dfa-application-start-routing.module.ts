import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DFAApplicationStartComponent } from './dfa-application-start.component';

const routes: Routes = [{ path: '', component: DFAApplicationStartComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DFAApplicationStartRoutingModule {}
