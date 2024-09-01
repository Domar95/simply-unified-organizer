import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecordsComponent } from './components/records.component';
import {
  KnowledgeComponent,
  ProgrammingProjectComponent,
  RecordsFormComponent,
} from './components';

const routes: Routes = [
  {
    path: '',
    component: RecordsComponent,
    children: [
      { path: '', redirectTo: 'programming-project', pathMatch: 'full' },
      {
        path: 'programming-project',
        children: [
          { path: '', component: ProgrammingProjectComponent },
          { path: 'new', component: RecordsFormComponent },
        ],
      },
      {
        path: 'knowledge',
        children: [
          { path: '', component: KnowledgeComponent },
          { path: 'new', component: RecordsFormComponent },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordsRoutingModule {}
