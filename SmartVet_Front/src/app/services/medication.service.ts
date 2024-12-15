import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  private apiUrl = 'http://localhost:5000/api/medications'; // L'URL de votre API

  constructor(private http: HttpClient) {}

  // Ajouter un médicament
  addMedication(medicationData: { name: string; details: string }): Observable<any> {
    return this.http.post(this.apiUrl, medicationData);
  }

  // Récupérer tous les médicaments
  getAllMedications(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
