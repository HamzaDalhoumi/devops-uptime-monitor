import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

import { MonitorService } from './services/monitor.service';
import { MonitoredService } from './models/service.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'DevOps Uptime Monitor';

  services: MonitoredService[] = [];
  newName = '';
  newUrl = '';

  loadingServices = false;
  creatingService = false;

  // small stats block for the dashboard cards
  stats = {
    total: 0,
    up: 0,
    down: 0
  };

  constructor(private monitorService: MonitorService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  private updateStats(): void {
    this.stats.total = this.services.length;
    this.stats.up = this.services.filter(s => s.status === 'UP').length;
    this.stats.down = this.services.filter(s => s.status === 'DOWN').length;
  }

  loadServices(): void {
    this.loadingServices = true;
    this.monitorService.getServices().subscribe({
      next: (data) => {
        this.services = data;
        this.loadingServices = false;
        this.updateStats();
      },
      error: (err) => {
        console.error('Error loading services', err);
        this.loadingServices = false;
      }
    });
  }

  addService(): void {
    if (!this.newName || !this.newUrl) return;

    let url = this.newUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    this.creatingService = true;
    this.monitorService.addService(this.newName.trim(), url).subscribe({
      next: (service) => {
        this.services.push(service);
        this.newName = '';
        this.newUrl = '';
        this.creatingService = false;
        this.updateStats();
      },
      error: (err) => {
        console.error('Error adding service', err);
        this.creatingService = false;
      }
    });
  }

  check(service: MonitoredService): void {
    this.monitorService.checkService(service.id).subscribe({
      next: (updated) => {
        const index = this.services.findIndex(s => s.id === updated.id);
        if (index !== -1) {
          this.services[index] = updated;
          this.updateStats();
        }
      },
      error: (err) => {
        console.error('Error checking service', err);
      }
    });
  }
}
