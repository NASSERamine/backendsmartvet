import { Component } from '@angular/core';

@Component({
  selector: 'app-animal-profil',
  templateUrl: './animal-profil.component.html',
  styleUrls: ['./animal-profil.component.css']
})
export class AnimalProfilComponent {
  isEditMode: boolean = false;

  // Original animal data
  animal = {
    imageUrl: 'https://via.placeholder.com/150',
    name: 'Bella',
    weight: 25,
    age: 4,
    type: 'Dog',
  };

  // Temporary copy for cancel functionality
  originalAnimal = { ...this.animal };

  toggleEditMode(): void {
    if (this.isEditMode) {
      // Save changes
      this.originalAnimal = { ...this.animal };
    }
    this.isEditMode = !this.isEditMode;
  }

  cancelEdit(): void {
    // Restore original data
    this.animal = { ...this.originalAnimal };
    this.isEditMode = false;
  }
}
