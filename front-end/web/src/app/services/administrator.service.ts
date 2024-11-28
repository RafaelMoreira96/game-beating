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

  deleteAdministrator() {
    return this.http.delete(`${this.BASE_URL}/delete`, {
      headers: this.headers,
    });
  }
}
