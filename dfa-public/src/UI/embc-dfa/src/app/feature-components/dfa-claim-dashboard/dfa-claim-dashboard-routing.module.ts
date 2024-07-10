import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DFAClaimComponent } from './dfa-claim-dashboard.component';

const routes: Routes = [{
  path: '', component: DFAClaimComponent,
  children: [
    {
      path: '',
      redirectTo: 'open',
      pathMatch: 'full'
    },
    {
      path: 'open',
      loadChildren: () =>
        import(
          'src/app/sharedModules/claim-dashboard-components/claim/claim.module'
        ).then((m) => m.DFADashClaimModule),
      data: { flow: 'dfa-claim-dashboard', apptype: 'open' }
    },
    {
      path: 'close',
      loadChildren: () =>
        import(
          'src/app/sharedModules/claim-dashboard-components/claim/claim.module'
        ).then((m) => m.DFADashClaimModule),
      data: { flow: 'dfa-claim-dashboard', apptype: 'closed' }
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DFAClaimRoutingModule {}
