// src/app/components/login/login.component.ts
import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { LoginService } from '../services/LoginService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  // Fonction appelée lors de la soumission du formulaire de login
  onLogin(): void {
    if (this.username && this.password) {
      // Appel à la méthode login du service loginService
      this.loginService.login(this.username, this.password).subscribe(
        (response) => {
          // Sauvegarder le token reçu dans le localStorage
          this.loginService.saveToken(response.token);
          // Rediriger vers une page sécurisée (exemple : tableau de bord)
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          // Affichage d'un message d'erreur si la connexion échoue
          this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect';
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs';
    }
  }
}
