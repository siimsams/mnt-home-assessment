import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class JwtService {
  private readonly tokenKey = 'auth_token';
  private readonly baseUrl = `${environment.apiUrl}/auth-token`;

  constructor(private http: HttpClient) {}

  fetchAndStoreToken(): void {
    this.http.get(this.baseUrl, { responseType: 'text' }).subscribe({
      next: (token: string) => {
        localStorage.setItem(this.tokenKey, token);
      },
      error: (err) => {
        console.error('Failed to fetch JWT:', err);
      },
    });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}