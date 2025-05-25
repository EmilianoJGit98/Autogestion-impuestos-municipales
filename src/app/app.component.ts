import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import '@fortawesome/fontawesome-free/css/all.min.css';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'importanciones-mercadopago';
}
