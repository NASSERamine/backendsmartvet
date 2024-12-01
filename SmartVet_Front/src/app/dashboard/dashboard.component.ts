import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private router: Router) {}

  navigateToAdd() {
    this.router.navigate(['/add-animal']); // Update with the correct path for the "Add Animal" page
  }
}
