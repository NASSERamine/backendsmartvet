// animals.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalsService {
  private apiUrl = 'http://localhost:5000/api/animals'; // Base URL of the backend API
  private emailKey = 'email'; // Key used to store email in localStorage

  constructor(private http: HttpClient) {}

  /**
   * Get animals for the logged-in user
   * @returns Observable of an array of animals
   */
  getAnimalsForLoggedInUser(): Observable<any[]> {
    const email = localStorage.getItem(this.emailKey); // Retrieve email from localStorage
    if (!email) {
      throw new Error('No email found in localStorage!');
    }

    const params = new HttpParams().set('email', email); // Set query parameter for the API call
    return this.http.get<any[]>(this.apiUrl, { params }); // Send GET request with email as a parameter
  }
}
