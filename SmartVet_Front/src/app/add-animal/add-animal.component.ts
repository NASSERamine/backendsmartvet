import { Component } from '@angular/core';
import { AddAnimalService } from '../services/add-animal.service';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.css'],
})
export class AddAnimalComponent {
  animal = { name: '', type: '', age: 0, weight: 0 }; // Ajoutez le champ 'weight' (poids) si nécessaire
  message = '';

  constructor(private addAnimalService: AddAnimalService) {}

  submitAnimal(): void {
    // Soumettre les informations de l'animal via le service
    this.addAnimalService.addAnimal(this.animal).subscribe(
      (response) => {
        this.message = 'Animal ajouté avec succès !';
        this.animal = { name: '', type: '', age: 0, weight: 0 }; // Réinitialiser le formulaire
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'animal :', error);
        this.message = 'Échec de l\'ajout de l\'animal. Veuillez réessayer.';
      }
    );
  }
}
