import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NextstepsprofileComponent } from './nextstepsprofile.component';

const routes: Routes = [{ path: '', component: NextstepsprofileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NextstepsprofileRoutingModule { }
