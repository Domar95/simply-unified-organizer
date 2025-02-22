import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'suo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule],
})
export class AppComponent {
  title = 'Organizer WebApp';
}
