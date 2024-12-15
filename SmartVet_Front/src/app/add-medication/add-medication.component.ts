import { Component } from '@angular/core';
import { MedicationService } from '../services/medication.service'; // Importer le service
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-medication',
  templateUrl: './add-medication.component.html',
  styleUrls: ['./add-medication.component.css']
})
export class AddMedicationComponent {
  isModalOpen: boolean = false;
  medicationName: string = '';
  medicationDetail: string = '';

  constructor(private medicationService: MedicationService) {}

  // Open the modal
  openModal() {
    this.isModalOpen = true;
  }

  // Close the modal
  closeModal() {
    this.isModalOpen = false;
    this.medicationName = '';
    this.medicationDetail = '';
  }

  // Submit the form data to the backend
  onSubmit() {
    const medicationData = {
      name: this.medicationName,
      details: this.medicationDetail
    };

    this.medicationService.addMedication(medicationData).subscribe({
      next: (response) => {
        console.log('Medication added successfully:', response);
        this.closeModal(); // Close the modal after success
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error adding medication:', error.message);
      }
    });
  }
}
