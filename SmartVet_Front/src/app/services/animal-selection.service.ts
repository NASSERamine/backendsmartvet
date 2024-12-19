import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalSelectionService {
  private selectedAnimalSubject = new BehaviorSubject<string | null>(null);
  selectedAnimal$ = this.selectedAnimalSubject.asObservable();

  setSelectedAnimal(animalName: string): void {
    this.selectedAnimalSubject.next(animalName);
    localStorage.setItem('selectedAnimal', animalName); // Optionnel, sauvegarde dans localStorage
  }

 

}
