import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importez Router
import { AuthService } from '../services/signup.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {} // Injectez Router ici

  onSignUp(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      return;
    }

    // Clear error message before making the API call
    this.errorMessage = '';

    // Call AuthService to register the user
    this.authService.register(this.name, this.email, this.password).subscribe(
      (response) => {
        console.log('Inscription réussie:', response);
        alert('Inscription réussie! Veuillez vous connecter.');

        // Rediriger vers la page de login après une inscription réussie
        this.router.navigate(['/login']); // Remplacez '/login' par le chemin correct de votre page de login
      },
      (error) => {
        console.error('Erreur lors de l’inscription:', error);
        this.errorMessage = 'Erreur lors de l’inscription. Veuillez réessayer.';
      }
    );
  }
}
