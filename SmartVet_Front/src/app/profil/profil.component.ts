import { Component } from '@angular/core';
import { LoginService } from '../services/LoginService';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  userName: string = '';
  userEmail: string = '';
  isProfileMenuOpen: boolean = false; // Controls the visibility of the profile menu
  
  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const email = localStorage.getItem('email'); 
    
    if (email) {
      this.loginService.getNameByEmail(email).subscribe(
        (user) => {
          this.userName = user.name;  // Assuming the API returns 'name' and 'email'
          this.userEmail = email;
          console.log(this.userEmail)
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );
    }
  }

  openProfileMenu() {
    this.isProfileMenuOpen = true;
  }

  closeProfileMenu() {
    this.isProfileMenuOpen = false;
  }
}
