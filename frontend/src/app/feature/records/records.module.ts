import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewRecordComponent } from './components/view-record/view-record.component';
import { RecordsComponent } from './components/records/records.component';



@NgModule({
  declarations: [
    ViewRecordComponent,
    RecordsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RecordsModule { }
