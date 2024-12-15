import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import { TemperatureService } from '../services/temperature.service';
import { HeartRateService } from '../services/heart-rate-service.service';
import { MouvementService } from '../services/mouvement.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  public temperatureChart: any;
  public heartRateChart: any;
  public movementChart: any; // Nouveau graphique pour le mouvement

  private temperatureData: { timestamp: string; temperature: number }[] = [];
  private heartRateData: { timestamp: string; heartRate: number }[] = [];
  private movementData: { timestamp: string; movement: number }[] = []; // Données de mouvement

  constructor(
    private temperatureService: TemperatureService,
    private heartRateService: HeartRateService,
    private mouvementService: MouvementService // Injecter le service du mouvement
  ) {
    // Register Chart.js components
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.initTemperatureChart();
    this.initHeartRateChart();
    this.initMovementChart(); // Initialisation du graphique de mouvement

    // Load historical data, then subscribe to real-time updates
    this.loadHistoricalData().then(() => {
      this.subscribeToTemperature();
      this.subscribeToHeartRate();
      this.subscribeToMovement(); // S'abonner aux données de mouvement
    });
  }

  private async loadHistoricalData(): Promise<void> {
    await Promise.all([
      this.loadTemperatureHistory(),
      this.loadHeartRateHistory(),
      this.loadMovementHistory(), // Charger les données historiques de mouvement
    ]);
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

  // Charger l'historique du mouvement
  private loadMovementHistory(): Promise<void> {
    return new Promise((resolve) => {
      this.mouvementService.getTemperatureHistory().subscribe((data) => {
        data.forEach(({ timestamp, movement }) => {
          this.movementData.push({ timestamp, movement });

          this.movementChart.data.labels.push(
            new Date(timestamp).toLocaleTimeString()
          );
          this.movementChart.data.datasets[0].data.push(movement);
        });
        this.movementChart.update();
        resolve();
      });
    });
  }

  // Initialiser le graphique de température
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
            text: 'Temperature Over Time',
            font: { size: 16, weight: 'bold' },
          },
        },
        scales: {
          x: {
            type: 'category',
            title: { display: true, text: 'Time' },
          },
          y: {
            title: { display: true, text: 'Temperature (°C)' },
          },
        },
      } as ChartOptions,
    });
  }

  // Initialiser le graphique de fréquence cardiaque
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
          legend: {
            display: false,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Heart Rate (BPM)',
            font: { size: 16, weight: 'bold' },
          },
        },
        scales: {
          x: {
            type: 'category',
            title: { display: true, text: 'Time' },
          },
          y: {
            title: { display: true, text: 'Heart Rate (BPM)' },
          },
        },
      } as ChartOptions,
    });
  }

  // Initialiser le graphique de mouvement
  private initMovementChart(): void {
    this.movementChart = new Chart('movementChart', {
      type: 'line' as ChartType,
      data: {
        labels: [],
        datasets: [
          {
            label: 'Movement (Units)', // Nom de la courbe
            data: [],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
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
            text: 'Movement Over Time', // Titre du graphique
            font: { size: 16, weight: 'bold' },
          },
        },
        scales: {
          x: {
            type: 'category',
            title: { display: true, text: 'Time' },
          },
          y: {
            title: { display: true, text: 'Movement (Units)' },
          },
        },
      } as ChartOptions,
    });
  }

  // S'abonner aux données de température en temps réel
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

  // S'abonner aux données de fréquence cardiaque en temps réel
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

  // S'abonner aux données de mouvement en temps réel
  private subscribeToMovement(): void {
    this.mouvementService.getTemperature().subscribe((data) => {
      const { timestamp, movement } = data;

      if (!this.movementData.some((item) => item.timestamp === timestamp)) {
        this.movementData.push({ timestamp, movement });

        this.movementChart.data.labels.push(
          new Date(timestamp).toLocaleTimeString()
        );
        this.movementChart.data.datasets[0].data.push(movement);
        this.movementChart.update();
      }
    });
  }
}
