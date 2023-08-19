import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalServerErrorComponent } from './components/views/internal-server-error/internal-server-error.component';



@NgModule({
  declarations: [
    InternalServerErrorComponent
  ],
  imports: [
    CommonModule,
  ],
  providers: []
})
export class SharedModule { }
