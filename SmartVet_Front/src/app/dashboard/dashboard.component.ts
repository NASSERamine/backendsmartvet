import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicationService } from '../services/medication.service'; // Importer MedicationService
import { TemperatureService } from '../services/temperature.service'; // Service pour la température
import { HeartRateService } from '../services/heart-rate-service.service'; // Service pour la fréquence cardiaque
import { LoginService } from '../services/LoginService';
import { AddMedicationComponent } from '../add-medication/add-medication.component';
import { MouvementService } from '../services/mouvement.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  temperature: string = ''; // Variable pour afficher la température
  heartRate: string = '';
  movement : string='';
  userName: string = '';
  medications: any[] = []; // Liste des médicaments

  constructor(
    private router: Router,
    private temperatureService: TemperatureService, // Service pour la température
    private heartRateService: HeartRateService,
    private loginService: LoginService,
    private medicationService: MedicationService,
    private mouvementService: MouvementService // Injecter MedicationService
  ) {}

  ngOnInit() {
    this.loadTemperature(); // Charger la température au démarrage
    this.loadHeartRate();
    this.loadUserName();
    this.loadMedications();
    this.loadMovment(); // Charger les médicaments au démarrage
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
      (data: { heartRate: number; timestamp: string }) => {
        this.heartRate = `${data.heartRate} `; // Format de la fréquence cardiaque
      },
      (error: any) => {
        console.error('Erreur lors de la récupération de la fréquence cardiaque', error);
        this.heartRate = 'Erreur';
      }
    );
  }
  loadMovment() {
    this.mouvementService.getTemperature().subscribe(
      (data: { movement: number; timestamp: string }) => {
        this.movement = `${data.movement} `; // Format de la fréquence cardiaque
      },
      (error: any) => {
        console.error('Erreur lors de la récupération de la fréquence cardiaque', error);
        this.movement = 'Erreur';
      }
    );
  }

  loadUserName() {
    const email = localStorage.getItem('email');  // Récupérer l'email du localStorage
    if (email) {
      this.loginService.getNameByEmail(email).subscribe(
        (user) => {
          this.userName = user.name;  // Assurez-vous que la réponse contient un champ 'name'
          console.log('Nom de l\'utilisateur récupéré :', this.userName);
        },
        (error) => {
          console.error('Erreur lors de la récupération du nom de l\'utilisateur:', error);
        }
      );
    } else {
      console.warn('Aucun email trouvé dans le localStorage.');
    }
  }

  // Récupérer la liste des médicaments
  loadMedications() {
    this.medicationService.getAllMedications().subscribe(
      (medications) => {
        this.medications = medications; // Assurez-vous que la réponse est un tableau d'objets
      },
      (error) => {
        console.error('Erreur lors de la récupération des médicaments', error);
      }
    );
  }

  // Navigation vers la page d'ajout d'animal
  navigateToAdd() {
    this.router.navigate(['/add-animal']);
  }

  isOpen = false;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    const dashboardContainer = document.querySelector('.dashboard-container');
    if (dashboardContainer) {
      dashboardContainer.classList.toggle('sidebar-expanded');
    }
  }

  closeSidebar() {
    this.isOpen = false;
  }

  openAddMedicationModal(addMedicationComponent: AddMedicationComponent) {
    addMedicationComponent.openModal();
  }
}
