import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [{
  path: '', component: DashboardComponent,
  children: [
    {
      path: '',
      redirectTo: 'eventlist',
      pathMatch: 'full'
    },
    //{
    //  path: 'current',
    //  loadChildren: () =>
    //    import(
    //      'src/app/sharedModules/components/evacuation-file/evacuation-file-list/evacuation-file-list.module'
    //    ).then((m) => m.EvacuationFileListModule),
    //  data: { flow: 'verified-registration' }
    //},
    //{
    //  path: 'past',
    //  loadChildren: () =>
    //    import(
    //      'src/app/sharedModules/components/evacuation-file/evacuation-file-list/evacuation-file-list.module'
    //    ).then((m) => m.EvacuationFileListModule),
    //  data: { flow: 'verified-registration' }
    //},
    {
      path: 'eventlist',
      loadChildren: () =>
        import(
          'src/app/sharedModules/dashboard-components/dfa-events/dfa-events.module'
        ).then((m) => m.DFAEventsModule),
      data: { flow: 'dfa-dashboard' }
    }
    //{
    //  path: 'current/:essFile',
    //  loadChildren: () =>
    //    import(
    //      'src/app/sharedModules/components/evacuation-file/evacuation-details/evacuation-details.module'
    //    ).then((m) => m.EvacuationDetailsModule),
    //  data: { flow: 'verified-registration' }
    //},
    //{
    //  path: 'past/:essFile',
    //  loadChildren: () =>
    //    import(
    //      'src/app/sharedModules/components/evacuation-file/evacuation-details/evacuation-details.module'
    //    ).then((m) => m.EvacuationDetailsModule),
    //  data: { flow: 'verified-registration' }
    //}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
