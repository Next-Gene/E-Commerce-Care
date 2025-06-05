import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly BASE_URL = 'https://primecareapi.runasp.net/api/auth';
  private authState$ = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/login`, credentials);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.authState$.next(false);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getAuthState(): Observable<boolean> {
    return this.authState$.asObservable();
  }
} 