import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalsService } from '../services/animals.service';
import { MedicationService } from '../services/medication.service';
import { TemperatureService } from '../services/temperature.service';
import { HeartRateService } from '../services/heart-rate-service.service';
import { LoginService } from '../services/LoginService';
import { AddMedicationComponent } from '../add-medication/add-medication.component';
import { MouvementService } from '../services/mouvement.service';
import { AnimalSelectionService } from '../services/animal-selection.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  temperature: string = '';
  heartRate: string = '';
  movement: string = '';
  userName: string = '';
  medications: any[] = [];
  selectedAnimalName: string = '';
  isProfilePopupVisible: boolean = false;
  iconColor = 'text-muted';

  private animalSelectionSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private animalsService: AnimalsService,
    private temperatureService: TemperatureService,
    private heartRateService: HeartRateService,
    private loginService: LoginService,
    private medicationService: MedicationService,
    private mouvementService: MouvementService,
    private animalSelectionService: AnimalSelectionService
  ) {}

  ngOnInit() {
    this.loadTemperature();
    this.loadHeartRate();
    this.loadUserName();
    this.loadMedications();
    this.loadMovement();
    this.loadAnimals();

    // Subscribe to animal selection changes
    this.animalSelectionSubscription = this.animalSelectionService.selectedAnimal$
      .subscribe(animalName => {
        if (animalName) {
          this.selectedAnimalName = animalName;
          // Reload animal-specific data
          this.reloadAnimalSpecificData(animalName);
        }
      });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.animalSelectionSubscription) {
      this.animalSelectionSubscription.unsubscribe();
    }
  }

  // Reload data specific to the selected animal
  reloadAnimalSpecificData(animalName: string) {
    this.loadTemperature();
    this.loadHeartRate();
    this.loadMedications();
    this.loadMovement();
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

  // Load animals
  loadAnimals() {
    this.animalsService.getAnimalsForLoggedInUser().subscribe(
      (animals) => {
        if (animals && animals.length > 0) {
          const selectedAnimal = localStorage.getItem('selectedAnimal');
          if (!selectedAnimal) {
            // If no animal is selected, use the first animal in the list
            const firstAnimal = animals[0];
            this.animalSelectionService.setSelectedAnimal(firstAnimal.name);
          } else {
            this.animalSelectionService.setSelectedAnimal(selectedAnimal);
          }
        } else {
          console.warn('No animals found for this user.');
        }
      },
      (error) => {
        console.error('Error fetching animals:', error);
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

  // Open add medication modal
  openAddMedicationModal(addMedicationComponent: AddMedicationComponent) {
    addMedicationComponent.openModal();
  }
  editMedication(medication: any): void {
    // Logic to edit the selected medication
    console.log('Editing medication:', medication);
  }
  
  deleteMedication(medication: any): void {
    // Logic to delete the selected medication
    console.log('Deleting medication:', medication);
  }
  
}