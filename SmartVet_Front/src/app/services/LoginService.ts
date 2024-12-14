import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:5000/api'; // Base URL de l'API

  constructor(private http: HttpClient) {}

  // Méthode pour la connexion
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  // Sauvegarder le token dans le localStorage
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Vérifier si un utilisateur est connecté
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
