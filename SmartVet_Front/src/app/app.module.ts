import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { LoginComponent } from './login/login.component';
import {  SignUpComponent } from './sign-up/sign-up.component';
import { AddAnimalComponent } from './add-animal/add-animal.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LocationComponent } from './location/location.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { AddMedicationComponent } from './add-medication/add-medication.component';
import { AddDeleteComponent } from './add-delete/add-delete.component';
import { ProfilComponent } from './profil/profil.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    LoginComponent,
    SignUpComponent,
    AddAnimalComponent,
    SideBarComponent,
    DashboardComponent,
    LocationComponent,
    ChatBotComponent,
    StatisticsComponent,
    AddMedicationComponent,
    AddDeleteComponent,
    ProfilComponent,
    NotificationComponent,
    
  

  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleChartsModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
