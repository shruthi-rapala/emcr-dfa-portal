import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NonVerifiedRegistrationComponent } from './non-verified-registration.component';

const routes: Routes = [
  {
    path: '',
    component: NonVerifiedRegistrationComponent,
    children: [
      {
        path: '',
        redirectTo: 'collection-notice',
        pathMatch: 'full'
      },
      {
        path: 'collection-notice',
        loadChildren: () =>
          import('../collection-notice/collection-notice.module').then(
            (m) => m.CollectionNoticeModule
          ),
        data: { flow: 'non-verified-registration' }
      },
      {
        path: 'create-profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfileModule),
        data: { flow: 'non-verified-registration' }
      },
      {
        path: 'dfa-application',
        loadChildren: () =>
          import('../dfa-application-start/dfa-application-start.module').then((m) => m.DFAApplicationStartModule),
        data: { flow: 'non-verified-registration' }
      },
      {
        path: 'edit/:type',
        loadChildren: () =>
          import('../edit/edit.module').then((m) => m.EditModule),
        data: { flow: 'non-verified-registration' }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NonVerifiedRegistrationRoutingModule {}
