// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:5000/api/login'; // Remplacez cette URL par celle de votre backend

  constructor(private http: HttpClient) {}

  // Méthode pour envoyer les informations de login
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password });
  }

  // Sauvegarder le token dans le localStorage
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Récupérer le token depuis le localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Déconnexion et suppression du token
  logout(): void {
    localStorage.removeItem('authToken');
  }

  // Vérification si l'utilisateur est authentifié (token présent)
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
