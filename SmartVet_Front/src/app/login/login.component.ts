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

  onLogin(): void {
    if (this.username && this.password) {
      // Appel à la méthode login du service loginService
      this.loginService.login(this.username, this.password).subscribe(
        (response) => {
          // Sauvegarder le token reçu dans le localStorage
          this.loginService.saveToken(response.token);
  
          // Afficher un message dans la console
          console.log('Connexion réussie. Bienvenue,', this.username);
  
          // Rediriger vers une page sécurisée (exemple : tableau de bord)
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          // Affichage d'un message d'erreur si la connexion échoue
          this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect';
  
          // Afficher un message d'erreur dans la console
          console.error('Erreur de connexion :', error.message);
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs';
  
      // Message dans la console pour les champs vides
      console.warn('Tous les champs sont obligatoires.');
    }
  }
}
