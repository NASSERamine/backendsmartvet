import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-animal-profil',
  templateUrl: './animal-profil.component.html',
  styleUrls: ['./animal-profil.component.css']
})
export class AnimalProfilComponent {
  @Input() isEditMode: boolean = false; // Input property for modal visibility
  @Output() modalClose = new EventEmitter<void>(); // Event to notify parent component

  // Animal data
  animal = {
    imageUrl: 'assets/Dog.png',
    name: 'Bella',
    weight: 25,
    age: 4,
    type: 'Dog',
  };

  // Temporary copy for cancel functionality
  originalAnimal = { ...this.animal };

  cancelEdit(): void {
    // Restore original data and close modal
    this.animal = { ...this.originalAnimal };
    this.modalClose.emit();
  }

  closeModal(): void {
    // Save changes and close modal
    this.originalAnimal = { ...this.animal };
    this.modalClose.emit();
  }
}
