import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private authService: LoginService, private router: Router) {}

  onSubmit(): void {
    this.authService.authenticate(this.username, this.password)
      .subscribe((authenticated: boolean) => {
        if (authenticated) {
          // Rediriger vers une page sécurisée après une connexion réussie
          this.router.navigate(['/products']);
        } else {
          // Afficher une erreur si l'authentification échoue
          this.loginError = true;
        }
      });
  }
}
