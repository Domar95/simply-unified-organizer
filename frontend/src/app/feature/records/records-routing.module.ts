import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecordsComponent } from './components/records.component';
import { KnowledgeComponent, NoteComponent, ProgrammingProjectComponent } from './components';
import { AddRecordComponent, EditRecordPageComponent } from './pages';

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
      {
        path: 'note',
        component: NoteComponent,
      },
      { path: ':category/new', component: AddRecordComponent },
      { path: ':category/edit/:id', component: EditRecordPageComponent },

    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordsRoutingModule { }
