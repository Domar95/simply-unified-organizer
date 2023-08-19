import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewRecordComponent } from '@feature/records/components/view-record/view-record.component';

const routes: Routes = [
   { path: "records", component: ViewRecordComponent },
  // {
  //   path: 'records',
  //   loadComponent: () => import('@feature/records/components/view-record/view-record.component').then(m => m.ViewRecordComponent)
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
