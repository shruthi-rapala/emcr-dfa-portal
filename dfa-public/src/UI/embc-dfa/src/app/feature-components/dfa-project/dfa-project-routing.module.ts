import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DFAProjectComponent } from './dfa-project.component';

const routes: Routes = [{
  path: '', component: DFAProjectComponent,
  children: [
    {
      path: '',
      redirectTo: 'current',
      pathMatch: 'full'
    },
    {
      path: 'current',
      loadChildren: () =>
        import(
          'src/app/sharedModules/project-dashboard-components/project/project.module'
        ).then((m) => m.DFADashProjectModule),
      data: { flow: 'dfa-project-dashboard', apptype: 'current' }
    },
    {
      path: 'past',
      loadChildren: () =>
        import(
          'src/app/sharedModules/project-dashboard-components/project/project.module'
        ).then((m) => m.DFADashProjectModule),
      data: { flow: 'dfa-project-dashboard', apptype: 'closed' }
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DFAProjectRoutingModule {}
