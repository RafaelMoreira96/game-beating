import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly BASE_URL = 'http://localhost:8000/api/v1';
  private jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {}

  authenticate(nickname: string, password: string): Observable<any> {
    const loginPayload = { nickname, password };

    return this.http
      .post(`${this.BASE_URL}/login`, loginPayload, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        observe: 'response',
        responseType: 'json',
      })
      .pipe(
        catchError((error) => {
          console.error('Erro na autenticação:', error);
          return throwError(
            () => new Error('Falha na autenticação, tente novamente.')
          );
        })
      );
  }

  authenticateAdmin(nickname: string, password: string): Observable<any> {
    const loginPayload = { nickname, password };

    return this.http
      .post(`${this.BASE_URL}/admin_login`, loginPayload, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        observe: 'response',
        responseType: 'json',
      })
      .pipe(
        catchError((error) => {
          console.error('Erro na autenticação:', error);
          return throwError(
            () => new Error('Falha na autenticação, tente novamente.')
          );
        })
      );
  }

  successfulLogin(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token != null && !this.jwtService.isTokenExpired(token);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); 
      return payload.role; 
    }
    return null;
  }
}
