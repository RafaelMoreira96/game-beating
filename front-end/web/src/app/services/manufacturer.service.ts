import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class ManufacturerService {
  BASE_URL = API_CONFIG.BASE_URL + '/api/v1/manufacturer';
  token = localStorage.getItem('token');
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  constructor(private http: HttpClient) {}

  getManufacturers() {
    return this.http.get(`${this.BASE_URL}/list`, { headers: this.headers });
  }

  getDeactivatedManufacturers() {
    return this.http.get(`${this.BASE_URL}/list/deactivated`, {
      headers: this.headers,
    });
  }

  getManufacturer(id: number) {
    return this.http.get(`${this.BASE_URL}/${id}`, { headers: this.headers });
  }

  createManufacturer(data: any) {
    return this.http.post(`${this.BASE_URL}`, data, {
      headers: this.headers,
    });
  }

  updateManufacturer(id: number, data: any) {
    return this.http.put(`${this.BASE_URL}/${id}`, data, {
      headers: this.headers,
    });
  }

  deleteManufacturer(id: number) {
    return this.http.delete(`${this.BASE_URL}/${id}`, {
      headers: this.headers,
    });
  }

  reactivateManufacturer(id: number) {
    return this.http.put(`${this.BASE_URL}/activate/${id}`, {
      headers: this.headers,
    });
  }
}
