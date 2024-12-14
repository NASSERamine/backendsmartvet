import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/LoginService';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit{
  userName: string='';
   constructor(
      private router: Router,
      
      private loginService: LoginService
    ) {}

    ngOnInit() {
      this.loadUserName();
      
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
    // Navigation vers la page d'ajout d'animal
    navigateToAdd() {
      this.router.navigate(['/add-animal']);
    }
}
