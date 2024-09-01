import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '@shared/components/views/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'records',
    pathMatch: 'full',
  },
  {
    path: 'records',
    loadChildren: () =>
      import('@feature/records/records.module').then((m) => m.RecordsModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
