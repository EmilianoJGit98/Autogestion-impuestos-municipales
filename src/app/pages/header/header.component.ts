import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthTokenService } from '../../services/auth-token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  Token: any = '';

  constructor(private tokenService: AuthTokenService, private router: Router) {}

  ngOnInit() {
    this.validaToken();
  }

  cerrarSesion() {
    this.tokenService.logout();
    this.router.navigateByUrl('login');
  }

  validaToken() {
    this.Token = this.tokenService.getAccessToken();
    if (this.Token == null) {
      this.router.navigateByUrl('login');
    } else {
    }
  }
}
