import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

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
      this.http.get<{ pulseValue: string }>(this.apiUrl).subscribe(
        (data) => {
          if (data && typeof data.pulseValue === 'string') {
            const heartRate = parseInt(data.pulseValue, 10); // Convert to number
            if (!isNaN(heartRate)) {
              const timestamp = new Date().toISOString(); // Get the current timestamp
              this.heartSubject.next({ heartRate, timestamp }); // Emit heart rate and timestamp
            } else {
              console.error('Invalid pulseValue:', data.pulseValue);
            }
          } else {
            console.error('Invalid API response:', data);
          }
        },
        (error) => {
          console.error('Error fetching heart rate:', error);
        }
      );
    }, 5000); // Polling interval of 5 seconds
  }
}
