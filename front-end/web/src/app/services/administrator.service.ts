import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdministratorService {
  BASE_URL = 'http://localhost:8000/api/v1/admin';
  token = localStorage.getItem('token');
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  constructor(private http: HttpClient) {}

  registerAdministrator(data: any) {
    return this.http.post(`${this.BASE_URL}`, data);
  }

  viewAdministrator() {
    return this.http.get(`${this.BASE_URL}/view`, { headers: this.headers });
  }

  deleteAdministrator(id: number) {
    return this.http.delete(`${this.BASE_URL}/delete`, {
      headers: this.headers,
    });
  }

  getAdministrator(id: number) {
    return this.http.get(`${this.BASE_URL}/view/${id}`, {
      headers: this.headers,
    });
  }

  getAdministrators() {
    return this.http.get(`${this.BASE_URL}/list`, { headers: this.headers });
  }

  updateAdministrator(id: number, data: any) {
    return this.http.put(`${this.BASE_URL}/update/${id}`, data, {
      headers: this.headers,
    });
  }
}
