import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = 'http://localhost:3000/notifications'; // Remplacez par votre URL de backend

  constructor(private http: HttpClient) {}

  // Récupérer toutes les notifications
  getNotifications(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
