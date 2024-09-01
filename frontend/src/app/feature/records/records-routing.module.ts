import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecordsComponent } from './components/records.component';
import { KnowledgeComponent, ProgrammingProjectComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: RecordsComponent,
    children: [
      { path: '', redirectTo: 'programming-project', pathMatch: 'full' },
      {
        path: 'programming-project',
        component: ProgrammingProjectComponent,
      },
      {
        path: 'knowledge',
        component: KnowledgeComponent,
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
