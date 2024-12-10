import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DFAProjectMainComponent } from './dfa-project-main.component';

const routes: Routes = [{ path: '', component: DFAProjectMainComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DFAProjectMainRoutingModule {}
