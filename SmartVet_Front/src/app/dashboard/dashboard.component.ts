import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalsService } from '../services/animals.service';
import { TemperatureService } from '../services/temperature.service';
import { HeartRateService } from '../services/heart-rate-service.service';
import { LoginService } from '../services/LoginService';
import { MedicationService } from '../services/medication.service';
import { MouvementService } from '../services/mouvement.service';
import { AddMedicationComponent } from '../add-medication/add-medication.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  temperature: string = ''; // Variable for temperature
  heartRate: string = ''; // Variable for heart rate
  movement: string = ''; // Variable for movement
  userName: string = ''; // User name
  medications: any[] = []; // List of medications
  selectedAnimalName: string = ''; // Selected animal's name
  isProfilePopupVisible: boolean = false;
  iconColor = 'text-muted';

  constructor(
    private router: Router,
    private animalsService: AnimalsService,
    private temperatureService: TemperatureService,
    private heartRateService: HeartRateService,
    private loginService: LoginService,
    private medicationService: MedicationService,
    private mouvementService: MouvementService
  ) {}

  ngOnInit() {
    this.loadTemperature();
    this.loadHeartRate();
    this.loadUserName();
    this.loadMedications();
    this.loadMovement();
    this.loadSelectedAnimalName();
  }

  // Load the selected animal name
  loadSelectedAnimalName() {
    const selectedAnimal = localStorage.getItem('selectedAnimal');
    if (selectedAnimal) {
      this.selectedAnimalName = selectedAnimal;
    } else {
      const emailKey = localStorage.getItem('email');
      if (emailKey) {
        this.animalsService.getAnimalsForLoggedInUser().subscribe(
          (animals) => {
            if (animals && animals.length > 0) {
              this.selectedAnimalName = animals[0].name;
              localStorage.setItem('selectedAnimal', this.selectedAnimalName); // Store the default selected animal
            } else {
              console.warn('Aucun animal trouvé pour cet utilisateur.');
              this.selectedAnimalName = 'Nom indisponible';
            }
          },
          (error) => {
            console.error('Erreur lors de la récupération des animaux :', error);
            this.selectedAnimalName = 'Erreur';
          }
        );
      } else {
        console.warn('Aucune clé email trouvée dans localStorage.');
        this.selectedAnimalName = 'Non connecté';
      }
    }
  }

  // Method to handle the animal name click and refresh the data
  onAnimalClick() {
    // Reload the selected animal name and other data
    this.loadSelectedAnimalName();
    this.loadTemperature();
    this.loadHeartRate();
    this.loadMovement();
    this.loadMedications();
    console.log('Animal data refreshed');
  }

  // Load the temperature
  loadTemperature() {
    this.temperatureService.getTemperature().subscribe(
      (data: any) => {
        if (data && data.temperature) {
          this.temperature = parseFloat(data.temperature).toFixed(2) + '°C';
        } else {
          console.error('Invalid response for temperature:', data);
          this.temperature = 'N/A';
        }
      },
      (error: any) => {
        console.error('Error fetching temperature', error);
        this.temperature = 'Error';
      }
    );
  }

  // Load the heart rate
  loadHeartRate() {
    this.heartRateService.getHeartRate().subscribe(
      (data: { heartRate: number }) => {
        this.heartRate = `${data.heartRate}`;
      },
      (error: any) => {
        console.error('Error fetching heart rate', error);
        this.heartRate = 'Error';
      }
    );
  }

  // Load the movement data
  loadMovement() {
    this.mouvementService.getTemperature().subscribe(
      (data: any) => {
        if (data && data.movement) {
          this.movement = parseFloat(data.movement).toFixed(2);
        } else {
          console.error('Invalid response for movement:', data);
          this.movement = '1.75';
        }
      },
      (error: any) => {
        console.error('Error fetching movement data', error);
        this.movement = '';
      }
    );
  }

  // Load the user name
  loadUserName() {
    const email = localStorage.getItem('email');
    if (email) {
      this.loginService.getNameByEmail(email).subscribe(
        (user) => {
          this.userName = user.name;
          console.log('User name fetched:', this.userName);
        },
        (error) => {
          console.error('Error fetching user name:', error);
        }
      );
    } else {
      console.warn('No email found in localStorage.');
    }
  }

  // Load medications
  loadMedications() {
    this.medicationService.getAllMedications().subscribe(
      (medications) => {
        this.medications = medications;
      },
      (error) => {
        console.error('Error fetching medications', error);
      }
    );
  }

  // Navigate to add animal page
  navigateToAdd() {
    this.router.navigate(['/add-animal']);
  }

  // Toggle profile popup
  toggleProfilePopup() {
    this.isProfilePopupVisible = !this.isProfilePopupVisible;
  }

  // Logout function
  logout() {
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }

  // Sidebar toggle
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
