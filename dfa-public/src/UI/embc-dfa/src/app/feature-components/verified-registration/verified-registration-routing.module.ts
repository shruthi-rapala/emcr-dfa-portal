import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllowNavigationGuard } from '../../core/services/allowNavigation.guard';
import { VerifiedRegistrationComponent } from './verified-registration.component';

const routes: Routes = [
  {
    path: '',
    component: VerifiedRegistrationComponent,
    children: [
      {
        path: 'conflicts',
        loadChildren: () =>
          import(
            '../../sharedModules/components/conflict-management/conflict-management.module'
          ).then((m) => m.ConflictManagementModule),
        data: { flow: 'verified-registration' },
        canActivate: [AllowNavigationGuard]
      },
      {
        path: 'collection-notice',
        loadChildren: () =>
          import('../collection-notice/collection-notice.module').then(
            (m) => m.CollectionNoticeModule
          ),
        data: { flow: 'verified-registration' }
      },
      {
        path: 'nextstep-profile',
        loadChildren: () =>
          import('../nextstepsprofile/nextstepsprofile.module').then(
            (m) => m.NextstepsprofileModule
          ),
        data: { flow: 'verified-registration' }
      },
      {
        path: 'create-profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfileModule),
        data: { flow: 'verified-registration' }
      },
      {
        path: 'dfa-application-start',
        loadChildren: () =>
          import('../dfa-application-start/dfa-application-start.module').then((m) => m.DFAApplicationStartModule),
        data: { flow: 'verified-registration' }
      },
      {
        path: 'dfa-prescreening',
        loadChildren: () =>
          import('../dfa-prescreening/dfa-prescreening.module').then((m) => m.DFAPrescreeningModule),
        data: { flow: 'verified-registration' }
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import(
            '../../sharedModules/components/dashboard/dashboard.module'
          ).then((m) => m.DashboardModule),
        data: { flow: 'verified-registration' }
      },
      {
        path: 'edit/:type',
        loadChildren: () =>
          import('../edit/edit.module').then((m) => m.EditModule),
        data: { flow: 'verified-registration' }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifiedRegistrationRoutingModule {}
