import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HeartRateService {
  private apiUrl = 'http://localhost:5000/api/pulse'; // URL de l'API
  private heartSubject = new Subject<number>(); // Subject pour émettre les nouvelles fréquences cardiaques

  constructor(private http: HttpClient) {
    this.startPolling(); // Lancer le polling dès que le service est initialisé
  }

  // Observable pour s'abonner aux nouvelles valeurs de fréquence cardiaque
  getHeartRate(): Observable<number> {
    return this.heartSubject.asObservable();
  }

  // Méthode pour démarrer le polling
  private startPolling(): void {
    setInterval(() => {
      this.http.get<{ pulseValue: string }>(this.apiUrl).subscribe(
        (data) => {
          if (data && typeof data.pulseValue === 'string') {
            const heartRate = parseInt(data.pulseValue, 10); // Convertir en nombre
            if (!isNaN(heartRate)) {
              this.heartSubject.next(heartRate); // Émet la nouvelle valeur
            } else {
              console.error('La valeur pulseValue n’est pas un nombre valide :', data.pulseValue);
            }
          } else {
            console.error('Réponse invalide pour la fréquence cardiaque :', data);
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération de la fréquence cardiaque', error);
        }
      );
    }, 5000); // Intervalle de 5 secondes
  }
}
