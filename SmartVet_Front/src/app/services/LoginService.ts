import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:5000/api'; // Base URL of the API
  private tokenKey = 'authToken'; // Key for saving the token
  private emailKey = 'email';

  constructor(private http: HttpClient) {}

  // Login method
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  // Save token in localStorage
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  saveUserEmail(email: string): void {
    localStorage.setItem(this.emailKey, email);
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  // Logout method
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    
  }

   // Get the user's name by email
   getNameByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/username/${email}`);
  }
}
