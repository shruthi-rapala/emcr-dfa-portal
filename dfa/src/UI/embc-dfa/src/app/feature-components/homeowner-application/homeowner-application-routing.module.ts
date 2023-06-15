import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeOwnerApplicationComponent } from './homeowner-application.component';

const routes: Routes = [{ path: '', component: HomeOwnerApplicationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeOwnerApplicationRoutingModule {}
