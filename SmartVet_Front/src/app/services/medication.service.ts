import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  private apiUrl = 'http://localhost:5000/api/medications'; 

  constructor(private http: HttpClient) {}

  // Add medication (existing method)
  addMedication(medicationData: { name: string; details: string }): Observable<any> {
    return this.http.post(this.apiUrl, medicationData);
  }

  // Get all medications (existing method)
  getAllMedications(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get medication by ID (existing method)
  getMedicationById(medicationId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${medicationId}`);
  }

  // Update medication (existing method)
  updateMedication(medicationId: string, medicationData: { name: string; details: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${medicationId}`, medicationData);
  }

  // Delete medication (existing method)
  deleteMedication(medicationId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${medicationId}`);
  }
}