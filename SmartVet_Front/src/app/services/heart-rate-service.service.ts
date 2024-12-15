import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class HeartRateService {
  private apiUrl = 'http://localhost:5000/api/pulse'; // API URL
  private heartSubject = new Subject<{ heartRate: number; timestamp: string }>(); // Subject to emit heart rate with timestamp

  constructor(private http: HttpClient) {
    this.startPolling(); // Start polling when the service is initialized
  }

  // Observable to subscribe to heart rate updates
  getHeartRate(): Observable<{ heartRate: number; timestamp: string }> {
    return this.heartSubject.asObservable();
  }

  // Start polling the API
  private startPolling(): void {
    setInterval(() => {
      this.http.get<{ pulseValue: number }>(this.apiUrl).subscribe(
        (data) => {
          if (data && typeof data.pulseValue === 'number') {
            const heartRate = data.pulseValue; // Directly use pulseValue as it's already a number
            const timestamp = new Date().toISOString(); // Get the current timestamp
            this.heartSubject.next({ heartRate, timestamp }); // Emit heart rate and timestamp
          } else {
            console.error('Invalid API response or pulseValue is not a number:', data);
          }
        },
        (error) => {
          console.error('Error fetching heart rate:', error);
        }
      );
    }, 5000); // Polling interval of 5 seconds
  }

  getHeartRateHistory(): Observable<{ heartRate: number; timestamp: string }[]> {
    return this.http.get<{ pulseValue: number; timestamp: string }[]>(
      'http://localhost:5000/api/history'
    ).pipe(
      map((data) => {
        // Transforme les données pour renommer `pulseValue` en `heartRate`
        return data.map((item) => ({
          heartRate: item.pulseValue,
          timestamp: item.timestamp,
        }));
      })
    );
  }
}
