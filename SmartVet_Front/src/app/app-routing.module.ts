import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AddAnimalComponent } from './add-animal/add-animal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AddMedicationComponent } from './add-medication/add-medication.component';
import { ProfilComponent } from './profil/profil.component';
import { NotificationComponent } from './notification/notification.component';



const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' }, // Redirige vers la page d'accueil
  { path: 'welcome', component: WelcomePageComponent },    // Route pour la page d'accueil
  { path: 'login', component: LoginComponent },            // Route pour le login
  { path: 'signup', component: SignUpComponent },          
  { path: 'add-animal', component: AddAnimalComponent },   
  { path: 'dashboard', component: DashboardComponent },  
  { path: 'stat', component: StatisticsComponent }, 
  { path: 'add-medication', component: AddMedicationComponent }, 
  {path:'profil' ,component:ProfilComponent



  },
  {path:'notifications ',component:NotificationComponent}
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
