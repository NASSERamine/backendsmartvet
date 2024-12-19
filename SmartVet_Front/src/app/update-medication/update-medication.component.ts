import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MedicationService } from '../services/medication.service';

@Component({
  selector: 'app-update-medication',
  templateUrl: './update-medication.component.html',
  styleUrls: ['./update-medication.component.css']
})
export class UpdateMedicationComponent {
     isModalOpen: boolean = false;
       medicationName: string = '';
       medicationDetail: string = '';
       medicationId: string = '';
       medications: any[] = [];
       constructor(private medicationService: MedicationService) {}
     
       // Open the modal
       openModal(medicationId: number) {
        this.isModalOpen = true;
        this.medicationId = medicationId.toString();
      }



      ngOnInit() {
        this.fetchMedications(); // Fetch medications on component initialization
      }
    
      // Fetch the list of medications
      fetchMedications() {
        this.medicationService.getAllMedications().subscribe({
          next: (response) => {
            this.medications = response;
          },
          error: (error: HttpErrorResponse) => {
            console.error('Error fetching medications:', error.message);
          }
        });
      }

      editMedication(medication: any) {
         // Convert to string
        this.medicationName = medication.name;
        this.medicationDetail = medication.details;
        this.isModalOpen = true; // Open the modal
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
           details: this.medicationDetail,
          
         };
         const  id=this.medicationId
     
         this.medicationService.updateMedication(id,medicationData).subscribe({
           next: (response) => {
             console.log('Medication added successfully:', response);
             this.closeModal(); 
             this.fetchMedications();
           },
           error: (error: HttpErrorResponse) => {
             console.error('Error adding medication:', error.message);
           }
         });
       }
}
