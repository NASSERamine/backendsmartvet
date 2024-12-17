import { Component, OnInit } from '@angular/core';
import { AnimalsService } from '../services/animals.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  isOpen = false; // Controls sidebar visibility
  isAnimalsListOpen = false; // Controls animal list visibility
  animals: any[] = []; // List of animals
  selectedAnimalName: string | null = null; // Selected animal name, nullable to handle no selection
  private selectedAnimalKey = 'selectedAnimal'; // Key for saving the animal name in localStorage

  constructor(private animalsService: AnimalsService, private router: Router) {}

  ngOnInit(): void {
    this.fetchAnimals(); // Fetch animals when the component initializes
    this.loadSelectedAnimal(); // Load the selected animal from localStorage
  }

  // Toggle sidebar open/close
  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  // Close sidebar
  closeSidebar() {
    this.isOpen = false;
  }

  // Toggle animal list open/close
  toggleAnimalsList() {
    this.isAnimalsListOpen = !this.isAnimalsListOpen;
  }

  // Fetch the list of animals using the service
  fetchAnimals(): void {
    this.animalsService.getAnimalsForLoggedInUser().subscribe(
      (data: any[]) => {
        this.animals = data; // Populate the animals list
      },
      (error: any) => {
        console.error('Error fetching animals:', error);
      }
    );
  }

  // Handle click on an animal
  onAnimalClick(animal: any): void {
    console.log('Animal clicked:', animal);
    localStorage.setItem(this.selectedAnimalKey, animal.name); // Save animal name in localStorage
    this.selectedAnimalName = animal.name; // Update selected animal in the component
    
  }

  // Load the selected animal from localStorage
  loadSelectedAnimal(): void {
    const savedAnimal = localStorage.getItem(this.selectedAnimalKey);
    if (savedAnimal) {
      this.selectedAnimalName = savedAnimal; // Set the selected animal name from localStorage
    }
  }
}
