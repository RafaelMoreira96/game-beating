import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectUpdateLog } from '../models/project-update-log';

@Injectable({
  providedIn: 'root',
})
export class ProjectUpdateLogService {
  BASE_URL = 'http://localhost:8000/api/v1/log';
  token = localStorage.getItem('token');
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  constructor(private http: HttpClient) {}

  getLogs() {
    return this.http.get(`${this.BASE_URL}/list`, { headers: this.headers });
  }

  registerLog(log: ProjectUpdateLog) {
    return this.http.post(`${this.BASE_URL}`, log, {
      headers: this.headers,
    });
  }

  removeLog(id: number) {
    return this.http.delete(`${this.BASE_URL}/${id}`, { headers: this.headers });
  }
}
