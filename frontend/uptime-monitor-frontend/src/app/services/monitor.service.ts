import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MonitoredService } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  // VM IP + backend port
  private readonly baseUrl = 'http://192.168.184.128:4000/api';

  constructor(private http: HttpClient) {}

  getServices(): Observable<MonitoredService[]> {
    return this.http.get<MonitoredService[]>(`${this.baseUrl}/services`);
  }

  addService(name: string, url: string): Observable<MonitoredService> {
    return this.http.post<MonitoredService>(`${this.baseUrl}/services`, { name, url });
  }

  checkService(id: number): Observable<MonitoredService> {
    return this.http.put<MonitoredService>(`${this.baseUrl}/services/${id}/check`, {});
  }
}
