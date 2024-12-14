// src/app/temperature.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TemperatureService {
  private apiUrl = 'http://localhost:5000/api/temperature';  // Remplacez par l'URL réelle de votre API

  constructor(private http: HttpClient) {}

  getTemperature(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
