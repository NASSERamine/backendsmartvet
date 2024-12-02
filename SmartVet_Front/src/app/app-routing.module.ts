import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AddAnimalComponent } from './add-animal/add-animal.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' }, // Redirige vers la page d'accueil
  { path: 'welcome', component: WelcomePageComponent },    // Route pour la page d'accueil
  { path: 'login', component: LoginComponent },            // Route pour le login
  { path: 'signup', component: SignUpComponent },          // Route pour l'inscription
  { path: 'add-animal', component: AddAnimalComponent },   // Route pour ajouter un animal
  { path: 'dashboard', component: DashboardComponent },    // Route pour le tableau de bord
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
