import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecordsComponent, RecordsFormComponent } from './components';

const routes: Routes = [
  { path: '', component: RecordsComponent },

  // TODO update route apth
  { path: 'new/programming-project', component: RecordsFormComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordsRoutingModule {}
