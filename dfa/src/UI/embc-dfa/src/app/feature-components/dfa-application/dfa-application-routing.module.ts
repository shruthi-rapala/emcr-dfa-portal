import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DFAApplicationComponent } from './dfa-application.component';

const routes: Routes = [{ path: '', component: DFAApplicationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DFAApplicationRoutingModule {}
