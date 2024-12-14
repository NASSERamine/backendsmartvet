import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api'; 

  constructor(private http: HttpClient) {}

  /**
   * Enregistre un nouvel utilisateur
   * @param name - Nom complet de l'utilisateur
   * @param email - Email de l'utilisateur
   * @param password - Mot de passe de l'utilisateur
   * @returns Observable contenant la réponse du backend
   */
  register(name: string, email: string, password: string): Observable<any> {
    const body = {
      name: name,
      email: email,
      password: password
    };

    return this.http.post(`${this.apiUrl}/register`, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
