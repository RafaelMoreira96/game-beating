import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Console } from '../models/console';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class ConsoleService {
  //BASE_URL = 'http://localhost:8000/api/v1/console';
  BASE_URL = API_CONFIG.BASE_URL + '/api/v1/console';
  token = localStorage.getItem('token');
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  constructor(private http: HttpClient) {}

  getConsoles() {
    return this.http.get(`${this.BASE_URL}/list`, { headers: this.headers });
  }

  getDeactivatedConsoles() {
    return this.http.get(`${this.BASE_URL}/list/deactivated`, {
      headers: this.headers,
    });
  }

  getConsole(id: number) {
    return this.http.get(`${this.BASE_URL}/${id}`, { headers: this.headers });
  }

  createConsole(data: Console) {
    return this.http.post(`${this.BASE_URL}`, data, {
      headers: this.headers,
    });
  }

  updateConsole(id: number, data: Console) {
    return this.http.put(`${this.BASE_URL}/${id}`, data, {
      headers: this.headers,
    });
  }

  deleteConsole(id: number) {
    return this.http.delete(`${this.BASE_URL}/${id}`, {
      headers: this.headers,
    });
  }

  reactivateConsole(id: number) {
    return this.http.put(`${this.BASE_URL}/activate/${id}`, {
      headers: this.headers,
    });
  }
}
