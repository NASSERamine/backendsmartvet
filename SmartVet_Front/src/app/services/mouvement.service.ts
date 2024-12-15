import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MouvementService {
  private apiUrl = 'http://localhost:5000/api/temperature';  // Remplacez par l'URL réelle de votre API
  private movmenteSubject = new Subject<any>();  // Subject pour émettre les nouvelles températures

  constructor(private http: HttpClient) {
    this.startPolling();  // Lance le polling dès que le service est créé
  }

  // Méthode pour récupérer la Movement depuis l'API
  getTemperature(): Observable<any> {
    return this.movmenteSubject.asObservable();  // Retourne un observable sur lequel les composants peuvent s'abonner
  }

  // Méthode pour démarrer le polling
  private startPolling(): void {
    // Intervalle de 5 secondes (5000ms)
    setInterval(() => {
      this.http.get<any>(this.apiUrl).subscribe(
        (data) => {
          this.movmenteSubject.next(data);  // Émet la nouvelle température
        },
        (error) => {
          console.error('Erreur de récupération de la température', error);
        }
      );
    }, 5000);  // Changez la valeur 5000 pour l'intervalle souhaité
  }

  getTemperatureHistory(): Observable<{ movement
    : number; timestamp: string }[]> {
    return this.http.get<{ movement
      : number; timestamp: string }[]>(
      'http://localhost:5000/api/history'
    );
  }
  
}
