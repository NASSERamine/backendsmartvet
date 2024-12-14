import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Pour les requêtes HTTP
import { Observable } from 'rxjs'; // Pour les observables

@Injectable({
  providedIn: 'root',
})
export class AddAnimalService {
  private apiUrl = 'http://localhost:5000/api/animals'; // URL de l'API backend

  constructor(private http: HttpClient) {
    
  }

  // Méthode pour ajouter un animal
  addAnimal(animal: any): Observable<any> {
    return this.http.post(this.apiUrl, animal); // Envoie de la requête POST à l'API
  }
}
