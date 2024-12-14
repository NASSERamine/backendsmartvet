import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemperatureService } from '../services/temperature.service'; // Service pour la température
import { HeartRateService } from '../services/heart-rate-service.service'; // Service pour la fréquence cardiaque

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  temperature: string = ''; // Variable pour afficher la température
  heartRate: string = '';

  constructor(
    private router: Router,
    private temperatureService: TemperatureService, // Service pour la température
    private heartRateService: HeartRateService // Service pour la fréquence cardiaque
  ) {}

  ngOnInit() {
    this.loadTemperature(); // Charger la température au démarrage
    this.loadHeartRate(); // Charger la fréquence cardiaque au démarrage
  }

  // Récupération de la température
  loadTemperature() {
    this.temperatureService.getTemperature().subscribe(
      (data: any) => {
        if (data && data.temperature) {
          this.temperature = parseFloat(data.temperature).toFixed(2) + '°C';
        } else {
          console.error('Réponse invalide pour la température :', data);
          this.temperature = 'N/A';
        }
      },
      (error: any) => {
        console.error('Erreur lors de la récupération de la température', error);
        this.temperature = 'Erreur';
      }
    );
  }

  // Récupération de la fréquence cardiaque
  loadHeartRate() {
    this.heartRateService.getHeartRate().subscribe(
      (heartRate: number) => {
        this.heartRate = `${heartRate} `; // Format de la fréquence cardiaque
      },
      (error: any) => {
        console.error('Erreur lors de la récupération de la fréquence cardiaque', error);
        this.heartRate = 'Erreur';
      }
    );
  }

  // Navigation vers la page d'ajout d'animal
  navigateToAdd() {
    this.router.navigate(['/add-animal']);
  }
}
