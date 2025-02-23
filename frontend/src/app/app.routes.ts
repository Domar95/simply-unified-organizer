import { Routes } from '@angular/router';

import { HomePageComponent } from '@feature/home/pages/home-page/home-page.component';
import {
  KnowledgeComponent,
  NoteComponent,
  ProgrammingProjectComponent,
  RecordsComponent,
} from '@feature/records/components';
import {
  AddRecordComponent,
  EditRecordPageComponent,
} from '@feature/records/pages';
import {
  AuthLayoutComponent,
  FeatureLayoutComponent,
  HomeLayoutComponent,
} from '@shared/components/layouts';
import { PageNotFoundComponent } from '@shared/components/views/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [{ path: '', component: HomePageComponent }],
  },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [],
  },

  {
    path: 'records',
    component: FeatureLayoutComponent,
    children: [
      {
        path: '',
        component: RecordsComponent,
        // TODO: fix issue when opening knowledge/ that it opens as programming-project/ tab
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
          {
            path: 'note',
            component: NoteComponent,
          },
          { path: ':category/new', component: AddRecordComponent },
          { path: ':category/edit/:id', component: EditRecordPageComponent },
        ],
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
