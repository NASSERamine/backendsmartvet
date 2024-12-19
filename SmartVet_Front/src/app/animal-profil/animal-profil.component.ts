import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnimalSelectionService } from '../services/animal-selection.service';
import { AnimalsService } from '../services/animals.service';

@Component({
  selector: 'app-animal-profil',
  templateUrl: './animal-profil.component.html',
  styleUrls: ['./animal-profil.component.css']
})
export class AnimalProfilComponent {
  isModalOpen: boolean = false;
  selectedAnimal: any = null;
  // Animal data
  animal = {
    imageUrl: 'assets/Dog.png',
    name: 'Bobi',
    weight: 2,
    age: 2,
    type: 'Dog',
  };
  constructor(
    private animalsService: AnimalsService
  ){}
   
  openModal(selectedAnimalName: string) {
    this.isModalOpen = true;
    this.selectedAnimal = this.animal;
  }
  // Temporary copy for cancel functionality
  originalAnimal = { ...this.animal };

  cancelEdit(): void {
    // Restore original data and close modal
    this.animal = { ...this.originalAnimal };
    
  }

  closeModal(): void {
    // Save changes and close modal
    this.originalAnimal = { ...this.animal };
    
    this.isModalOpen = false;
  }
  
  updateSelectedAnimal(animalName: string) {
    this.animalsService.getAnimalsForLoggedInUser().subscribe(
      (animals) => {
        const animal = animals.find((a: any) => a.name === animalName);
        if (animal) {
          this.selectedAnimal = animal;

        }
      },
      (error) => {
        console.error('Error fetching animals:', error);
      }
    );
  }
}
