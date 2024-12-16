import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { LoginService } from '../services/LoginService';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: any[] = [];
  isProfilePopupVisible = false;
  userName: string = '';
  notificationThreshold = 10;
  iconColor = 'text-muted';
  duplicateFound = false;          

  @Output() iconColorChange = new EventEmitter<string>();
  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private loginService: LoginService, // Inject the user service
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
    this.loadUserName();  // Fetch the user name from the user service
  }

  // Load notifications from the service
  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe(
      (data) => {
        this.notifications = data;
      },
      (error) => {
        console.error('Error loading notifications:', error);
        this.notifications = [];  // Fallback to an empty array if there's an error
      }
    );
  }

  // Load the username either from the user service or fallback to 'User'
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

  // Logout functionality
  logout(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);  // Navigate to login page
  }

  // Toggle profile popup visibility
  toggleProfilePopup(): void {
    this.isProfilePopupVisible = !this.isProfilePopupVisible;
  }

  checkDuplicateNotifications() {
    const messageCount = this.notifications.reduce((acc: { [key: string]: number }, notification) => {
      acc[notification.message] = (acc[notification.message] || 0) + 1;
      return acc;
    }, {});

    // Check if any notification message has reached the threshold
    const hasDuplicate = Object.values(messageCount).some((count: number) => {
      if (count >= this.notificationThreshold && !this.duplicateFound) {
        this.duplicateFound = true;  // Prevent further checks once threshold is reached
        return true;  // Found duplicate
      }
      return false;  // No duplicate or threshold not reached
    });

    // Update icon color based on the result
    this.iconColor = hasDuplicate ? 'text-danger' : 'text-muted'; // Red if duplicate found, muted if not
  }
}
