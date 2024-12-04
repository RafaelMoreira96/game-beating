/* import { HttpHeaders } from "@angular/common/http";

export const API_CONFIG = {
    //BASE_URL: 'http://localhost:8000/api/v1',
    BASE_URL: 'https://game-beating.onrender.com',
    token: localStorage.getItem('token'),
    headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
}; */

import { HttpHeaders } from "@angular/common/http";

export const API_CONFIG = {
    //BASE_URL: 'http://localhost:8000',
  BASE_URL: 'https://game-beating.onrender.com',
  
  get token() {
    // Garante que o código só tente acessar localStorage no navegador
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  },

  get headers() {
    const token = this.token;
    return token 
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`) 
      : new HttpHeaders();
  }
};
