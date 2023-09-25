import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DFAPrescreeningComponent } from './dfa-prescreening.component';

const routes: Routes = [{ path: '', component: DFAPrescreeningComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DFAPrescreeningRoutingModule {}
