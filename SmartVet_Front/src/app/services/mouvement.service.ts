import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MouvementService {

  private apiUrl = 'http://localhost:5000/api/movement';  // Remplacez par l'URL réelle de votre API
  private temperatureSubject = new Subject<any>();  // Subject pour émettre les nouvelles températures

  constructor(private http: HttpClient) {
    this.startPolling();  // Lance le polling dès que le service est créé
  }

  // Méthode pour récupérer la température depuis l'API
  getTemperature(): Observable<any> {
    return this.temperatureSubject.asObservable();  // Retourne un observable sur lequel les composants peuvent s'abonner
  }

  // Méthode pour démarrer le polling
  private startPolling(): void {
    // Intervalle de 5 secondes (5000ms)
    setInterval(() => {
      this.http.get<any>(this.apiUrl).subscribe(
        (data) => {
          this.temperatureSubject.next(data);  // Émet la nouvelle température
        },
        (error) => {
          console.error('Erreur de récupération de la température', error);
        }
      );
    }, 5000);  // Changez la valeur 5000 pour l'intervalle souhaité
  }
}
