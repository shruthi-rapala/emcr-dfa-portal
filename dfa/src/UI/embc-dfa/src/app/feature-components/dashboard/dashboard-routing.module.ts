import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [{
  path: '', component: DashboardComponent,
  children: [
    {
      path: '',
      redirectTo: 'current',
      pathMatch: 'full'
    },
    {
      path: 'eventlist',
      loadChildren: () =>
        import(
          'src/app/sharedModules/dashboard-components/dfa-events/dfa-events.module'
        ).then((m) => m.DFAEventsModule),
      data: { flow: 'dfa-dashboard' }
    },
    {
      path: 'current',
      loadChildren: () =>
        import(
          'src/app/sharedModules/dashboard-components/dfa-application/dfa-application.module'
        ).then((m) => m.DFADashApplicationModule),
      data: { flow: 'dfa-dashboard' }
    },
    {
      path: 'past',
      loadChildren: () =>
        import(
          'src/app/sharedModules/dashboard-components/dfa-events/dfa-events.module'
        ).then((m) => m.DFAEventsModule),
      data: { flow: 'dfa-dashboard' }
    },
    {
      path: 'profile',
      loadChildren: () =>
        import(
          'src/app/sharedModules/dashboard-components/dfa-profile/dfa-profile.module'
        ).then((m) => m.DFAProfileModule),
      data: { flow: 'dfa-dashboard' }
    },
    {
      path: 'edit/:type',
      loadChildren: () =>
        import('../edit/edit.module').then((m) => m.EditModule),
      data: { flow: 'dfa-dashboard' }
    }
    //{
    //  path: 'profile',
    //  loadChildren: () =>
    //    import(
    //      'src/app/feature-components/review/review.module'
    //    ).then((m) => m.ReviewModule),
    //  data: { flow: 'dfa-dashboard' }
    //}
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
