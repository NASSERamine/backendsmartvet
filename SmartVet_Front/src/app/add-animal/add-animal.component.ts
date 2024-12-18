import { Component } from '@angular/core';
import { AddAnimalService } from '../services/add-animal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.css'],
})
export class AddAnimalComponent {
  animal = { name: '', type: '', age: 0, weight: 0 }; // Animal object with fields name, type, age, and weight
  message = '';

  constructor(private addAnimalService: AddAnimalService ,private router: Router) {}

  submitAnimal(): void {
    const userEmail = localStorage.getItem('email'); // Récupérer l'email de l'utilisateur depuis le localStorage

    if (!userEmail) {
      console.error('Aucun email trouvé dans le localStorage');
      this.message = 'L\'email de l\'utilisateur est requis.';
      return;
    }

    const animalWithEmail = { ...this.animal, email: userEmail }; // Ajouter l'email à l'objet animal

    // Soumettre les informations de l'animal avec l'email via le service
    this.addAnimalService.addAnimal(animalWithEmail).subscribe(
      (response) => {
        this.message = 'Animal ajouté avec succès !';
        this.animal = { name: '', type: '', age: 0, weight: 0 }; // Réinitialiser le formulaire
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'animal :', error);
        this.message = 'Échec de l\'ajout de l\'animal. Veuillez réessayer.';
      }
    );
  }
}
