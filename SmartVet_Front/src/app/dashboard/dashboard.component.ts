import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemperatureService } from '../services/temperature.service'; // Importez le service

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  temperature: string = ''; // Déclarez une variable pour stocker la température

  constructor(private router: Router, private temperatureService: TemperatureService) {} // Injectez le service dans le constructeur

  ngOnInit() {
    this.loadTemperature(); // Chargez la température au démarrage du composant
  }

  // Fonction pour récupérer la température via le service
  loadTemperature() {
    this.temperatureService.getTemperature().subscribe(
      (data) => {
        // Formatez la température avec deux décimales
        this.temperature = parseFloat(data.temperature).toFixed(2) + '°C'; // Assurez-vous que la température soit un nombre et formatez-la
      },
      (error) => {
        console.error('Error fetching temperature', error);
      }
    );
  }

  // Fonction pour naviguer vers la page d'ajout d'animal
  navigateToAdd() {
    this.router.navigate(['/add-animal']); // Remplacez par le chemin correct pour la page "Add Animal"
  }
}
