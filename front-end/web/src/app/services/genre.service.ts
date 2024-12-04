import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre } from '../models/genre';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  //BASE_URL = 'http://localhost:8000/api/v1/genre';
  BASE_URL = API_CONFIG.BASE_URL + '/api/v1/genre';
  token = localStorage.getItem('token');
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  constructor(private http: HttpClient) {}

  getGenres() {
    return this.http.get(`${this.BASE_URL}/list`, { headers: this.headers });
  }

  getDeactivatedGenres() {
    return this.http.get(`${this.BASE_URL}/list/deactivated`, {
      headers: this.headers,
    });
  }

  getGenre(id: number) {
    return this.http.get(`${this.BASE_URL}/${id}`, { headers: this.headers });
  }

  createGenre(data: Genre) {
    return this.http.post(`${this.BASE_URL}`, data, {
      headers: this.headers,
    });
  }

  updateGenre(id: number, data: Genre) {
    return this.http.put(`${this.BASE_URL}/${id}`, data, {
      headers: this.headers,
    });
  }

  deleteGenre(id: number) {
    return this.http.delete(`${this.BASE_URL}/${id}`, {
      headers: this.headers,
    });
  }

  reactivateGenre(id: number) {
    return this.http.put(`${this.BASE_URL}/activate/${id}`, {
      headers: this.headers,
    });
  }
}
