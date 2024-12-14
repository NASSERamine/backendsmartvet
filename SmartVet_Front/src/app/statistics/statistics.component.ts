import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/LoginService';
import { HeartRateService } from '../services/heart-rate-service.service';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  userName: string = '';
  heartRateData: any[] = [['Time', 'Heart Rate']]; // Initial data for the chart
  chartOptions = {
    title: 'Heart Rate Over Time',
    curveType: 'function',
    legend: { position: 'bottom' },
    hAxis: {
      title: 'Time',
      format: 'HH:mm:ss',  // Time formatting for better readability
    },
    vAxis: {
      title: 'Heart Rate (BPM)',
    }
  };
  chartType: ChartType = ChartType.LineChart; // Chart type set to LineChart

  constructor(
    private router: Router,
    private loginService: LoginService,
    private heartRateService: HeartRateService // Inject the heart rate service
  ) {}

  ngOnInit() {
    this.loadUserName();
    this.listenForHeartRateData();  // Listen for updates from the heart rate service
  }

  // Load user name from the localStorage using the email
  loadUserName() {
    const email = localStorage.getItem('email');  // Retrieve email from localStorage
    if (email) {
      this.loginService.getNameByEmail(email).subscribe(
        (user) => {
          this.userName = user.name;  // Ensure the response contains a 'name' field
          console.log('User name retrieved:', this.userName);
        },
        (error) => {
          console.error('Error fetching user name:', error);
        }
      );
    } else {
      console.warn('No email found in localStorage.');
    }
  }

  // Listen for updates from the heart rate service
  listenForHeartRateData() {
    this.heartRateService.getHeartRate().subscribe((data) => {
      const newData = [new Date(data.timestamp).toLocaleTimeString(), data.heartRate]; 
      console.log('New heart rate data:', newData);// Format timestamp
      this.heartRateData.push(newData);  // Add new data to the chart
      if (this.heartRateData.length > 20) {
        this.heartRateData.shift();  // Keep the chart data to a manageable size (e.g., 20 entries)
      }
    });
  }
}
