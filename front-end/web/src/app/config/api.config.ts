import { HttpHeaders } from "@angular/common/http";

export const API_CONFIG = {
    BASE_URL: 'http://localhost:8000/api/v1',
    token: localStorage.getItem('token'),
    headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
};