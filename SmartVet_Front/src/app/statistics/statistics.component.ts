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

  // Heart rate data and chart options
  heartRateData: any[] = [
    [12, 75],
    [13, 80],
    [14, 77],
    [15, 85],
    [16, 78]
  ];
  chartOptionsHeartRate = {
    title: 'Heart Rate',
    legend: 'none',
    backgroundColor: 'transparent',
    hAxis: {
      textStyle: { color: '#999' },
      gridlines: { color: 'transparent' }
    },
    vAxis: {
      textStyle: { color: '#999' },
      gridlines: { count: 4, color: '#eee' },
      minValue: 60,
      maxValue: 120
    },
    colors: ['#00C6FB'],
    chartArea: {
      left: 50,
      top: 20,
      width: '85%',
      height: '70%'
    }
  };

  // Temperature data and chart options
  temperatureData: any[] = [
    ['12 PM', 36.5],
    ['1 PM', 36.7],
    ['2 PM', 36.6],
    ['3 PM', 36.8],
    ['4 PM', 36.9]
  ];
  chartOptionsTemperature = {
    title: 'Temperature (°C)',
    legend: { position: 'bottom' },
    backgroundColor: 'transparent',
    hAxis: {
      textStyle: { color: '#999' },
      gridlines: { color: 'transparent' }
    },
    vAxis: {
      textStyle: { color: '#999' },
      gridlines: { count: 4, color: '#eee' },
      minValue: 35,
      maxValue: 40
    },
    colors: ['#FF5733'], // Orange for temperature line
    chartArea: {
      left: 50,
      top: 20,
      width: '85%',
      height: '70%'
    }
  };

  averageHeartRate: number = 92;

  chartTypeHeartRate: ChartType = ChartType.ColumnChart; // Heart rate chart
  chartTypeTemperature: ChartType = ChartType.LineChart; // Temperature chart

  constructor(
    private router: Router,
    private loginService: LoginService,
    private heartRateService: HeartRateService
  ) {}

  ngOnInit() {
    this.loadUserName();
    this.listenForHeartRateData();
  }

  loadUserName() {
    const email = localStorage.getItem('email');
    if (email) {
      this.loginService.getNameByEmail(email).subscribe(
        (user) => {
          this.userName = user.name;
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

  listenForHeartRateData() {
    this.heartRateService.getHeartRate().subscribe((data) => {
      const newHeartRateData = [new Date(data.timestamp).toLocaleTimeString(), data.heartRate];
      this.heartRateData.push(newHeartRateData);
      if (this.heartRateData.length > 20) {
        this.heartRateData.shift();
      }

      
    });
  }
}
