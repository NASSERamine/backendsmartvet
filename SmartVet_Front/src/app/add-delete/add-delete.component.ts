import { Component } from '@angular/core';

@Component({
  selector: 'app-add-delete',
  templateUrl: './add-delete.component.html',
  styleUrls: ['./add-delete.component.css']
})
export class AddDeleteComponent {

  isModalOpen: boolean = false;
  actionType: string = ''; // To differentiate between Add or Delete actions

  // Open Modal Method
  openModal(action: string) {
    this.isModalOpen = true;
    this.actionType = action; // Set action type (Add or Delete)
  }

  // Close Modal
  closeModal() {
    this.isModalOpen = false;
    this.actionType = ''; // Reset action type
  }

  // Delete Action Logic
  deleteAction() {
    console.log('Delete action triggered');
    // Your delete logic here
    this.closeModal(); // Close modal after action
  }

  // Add Action Logic
  addAction() {
    console.log('Add action triggered');
    // Your add logic here
    this.closeModal(); // Close modal after action
  }
}
