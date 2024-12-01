import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddAnimalService {
  private apiUrl = 'http://localhost:3000/api/animals'; // Update with your actual endpoint

  constructor(private http: HttpClient) {}

  addAnimal(animal: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, animal);
  }
}




