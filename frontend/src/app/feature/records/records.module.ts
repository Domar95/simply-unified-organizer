import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { RecordsApiService } from './services';
import { RecordsRoutingModule } from './records-routing.module';

@NgModule({
  declarations: [],
  imports: [
    RecordsRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [RecordsApiService],
})
export class RecordsModule {}
