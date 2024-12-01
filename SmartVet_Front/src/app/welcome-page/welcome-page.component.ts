import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent {
navigateToSignup() {
  this.router.navigate(['/signup']);

}
        constructor(private router: Router) {}
      navigateToLogin() {
        this.router.navigate(['/login']);
      }

}
