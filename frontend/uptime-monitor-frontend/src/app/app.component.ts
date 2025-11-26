import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MonitorService } from './services/monitor.service';
import { MonitoredService } from './models/service.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,     // needed for *ngIf, *ngFor
    FormsModule,      // needed for ngModel
    HttpClientModule  // needed for API calls
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DevOps Uptime Monitor';

  services: MonitoredService[] = [];
  newName = '';
  newUrl = '';

  loadingServices = false;
  creatingService = false;

  constructor(private monitorService: MonitorService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.loadingServices = true;
    this.monitorService.getServices().subscribe({
      next: (data) => {
        this.services = data;
        this.loadingServices = false;
      },
      error: () => {
        this.loadingServices = false;
      }
    });
  }

  addService(): void {
    if (!this.newName || !this.newUrl) return;

    this.creatingService = true;
    this.monitorService.addService(this.newName, this.newUrl).subscribe({
      next: (service) => {
        this.services.push(service);
        this.newName = '';
        this.newUrl = '';
        this.creatingService = false;
      },
      error: () => {
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
        }
      },
      error: (err) => {
        console.error('Error checking service', err);
      }
    });
  }
}
