import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddAnimalService {
  private apiUrl = 'http://localhost:5000/api/animals'; // URL de l'API pour ajouter un animal

  constructor(private http: HttpClient) {}

  // Ajouter un animal avec l'email de l'utilisateur
  addAnimal(animal: { name: string, type: string, age: number, weight: number, email: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, animal);
  }
}
