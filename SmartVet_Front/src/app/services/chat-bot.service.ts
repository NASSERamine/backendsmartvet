import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {
  private apiUrl = 'http://localhost:5000/api/chatbot'; // URL de votre backend

  constructor(private http: HttpClient) {}

  // Envoyer un message au backend
  sendMessage(message: string, sessionId: string): Observable<any> {
    const payload = { message, sessionId };
    return this.http.post<any>(this.apiUrl, payload);
  }
}
