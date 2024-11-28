import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  BASE_URL = 'http://localhost:8000/api/v1/game';
  token = localStorage.getItem('token');
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  constructor(private http: HttpClient) {}

  registerGame(data: Game) {
    return this.http.post(`${this.BASE_URL}`, data, { headers: this.headers });
  }

  getGames() {
    return this.http.get(`${this.BASE_URL}/list_beaten`, {
      headers: this.headers,
    });
  }

  deleteGame(id: number) {
    return this.http.get(`${this.BASE_URL}/delete_beaten/${id}`, {
      headers: this.headers,
    });
  }
}
