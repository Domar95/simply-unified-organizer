import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecordsComponent } from './components/records.component';
import { KnowledgeComponent, ProgrammingProjectComponent } from './components';
import { AddRecordComponent } from './pages';

// TODO: fix issue when opening knowledge/ that it opens as programming-project/ tab
const routes: Routes = [
  {
    path: '',
    component: RecordsComponent,
    children: [
      { path: '', redirectTo: 'programming-project', pathMatch: 'full' },
      { path: 'programming-project', component: ProgrammingProjectComponent },
      {
        path: 'knowledge',
        component: KnowledgeComponent,
      },
      { path: ':category/new', component: AddRecordComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordsRoutingModule {}
