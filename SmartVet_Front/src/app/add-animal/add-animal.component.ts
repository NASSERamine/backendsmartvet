import { Component } from '@angular/core';
import { AddAnimalService } from '../services/add-animal.service';



@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.css'],
})
export class AddAnimalComponent {
  animal = { name: '', type: '', age: 0 }; // Adjust fields based on your back-end
  message = '';

  constructor(private addAnimalService: AddAnimalService) {}

  submitAnimal(): void {
    this.addAnimalService.addAnimal(this.animal).subscribe(
      (response) => {
        this.message = 'Animal added successfully!';
        this.animal = { name: '', type: '', age: 0 }; // Reset the form
      },
      (error) => {
        console.error('Error adding animal:', error);
        this.message = 'Failed to add animal.';
      }
    );
  }
}
