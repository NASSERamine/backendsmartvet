import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import { TemperatureService } from '../services/temperature.service';
import { HeartRateService } from '../services/heart-rate-service.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  public temperatureChart: any;
  public heartRateChart: any;

  private temperatureData: { timestamp: string; temperature: number }[] = [];
  private heartRateData: { timestamp: string; heartRate: number }[] = [];

  constructor(
    private temperatureService: TemperatureService,
    private heartRateService: HeartRateService
  ) {
    // Register Chart.js components
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.initTemperatureChart();
    this.initHeartRateChart();

    // Load historical data, then subscribe to real-time updates
    this.loadHistoricalData().then(() => {
      this.subscribeToTemperature();
      this.subscribeToHeartRate();
    });
  }

  private async loadHistoricalData(): Promise<void> {
    await Promise.all([this.loadTemperatureHistory(), this.loadHeartRateHistory()]);
  }

  private loadTemperatureHistory(): Promise<void> {
    return new Promise((resolve) => {
      this.temperatureService.getTemperatureHistory().subscribe((data) => {
        data.forEach(({ timestamp, temperature }) => {
          this.temperatureData.push({ timestamp, temperature });

          this.temperatureChart.data.labels.push(
            new Date(timestamp).toLocaleTimeString()
          );
          this.temperatureChart.data.datasets[0].data.push(temperature);
        });
        this.temperatureChart.update();
        resolve();
      });
    });
  }

  private loadHeartRateHistory(): Promise<void> {
    return new Promise((resolve) => {
      this.heartRateService.getHeartRateHistory().subscribe((data) => {
        data.forEach(({ timestamp, heartRate }) => {
          this.heartRateData.push({ timestamp, heartRate });

          this.heartRateChart.data.labels.push(
            new Date(timestamp).toLocaleTimeString()
          );
          this.heartRateChart.data.datasets[0].data.push(heartRate);
        });
        this.heartRateChart.update();
        resolve();
      });
    });
  }

  private initTemperatureChart(): void {
    this.temperatureChart = new Chart('temperatureChart', {
      type: 'line' as ChartType,
      data: {
        labels: [],
        datasets: [
          {
            label: 'Temperature (°C)',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Temperature Over Time', // Titre du graphique
            font: {
              size: 16, // Taille du titre
              weight: 'bold',
            },
          },
        },
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Time',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Temperature (°C)',
            },
          },
        },
      } as ChartOptions,
    });
  }

  private initHeartRateChart(): void {
    this.heartRateChart = new Chart('heartRateChart', {
      type: 'line' as ChartType,
      data: {
        labels: [],
        datasets: [
          {
            label: 'Heart Rate (BPM)',
            data: [],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Heart Rate (BPM)', // Titre du graphique
            font: {
              size: 16, // Taille du titre
              weight: 'bold',
            },
          },
          legend: {
            display: false,
            position: 'top',
          },
        },
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Time',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Heart Rate (BPM)',
            },
          },
        },
      } as ChartOptions,
    });
  }

  private subscribeToTemperature(): void {
    this.temperatureService.getTemperature().subscribe((data) => {
      const { timestamp, temperature } = data;

      if (!this.temperatureData.some((item) => item.timestamp === timestamp)) {
        this.temperatureData.push({ timestamp, temperature });

        this.temperatureChart.data.labels.push(
          new Date(timestamp).toLocaleTimeString()
        );
        this.temperatureChart.data.datasets[0].data.push(temperature);
        this.temperatureChart.update();
      }
    });
  }

  private subscribeToHeartRate(): void {
    this.heartRateService.getHeartRate().subscribe((data) => {
      const { timestamp, heartRate } = data;

      if (!this.heartRateData.some((item) => item.timestamp === timestamp)) {
        this.heartRateData.push({ timestamp, heartRate });

        this.heartRateChart.data.labels.push(
          new Date(timestamp).toLocaleTimeString()
        );
        this.heartRateChart.data.datasets[0].data.push(heartRate);
        this.heartRateChart.update();
      }
    });
  }
}
