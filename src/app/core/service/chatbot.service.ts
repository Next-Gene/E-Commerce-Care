import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatResponse } from '../interfaces/models/chat-response.model';
import { UsageStatus } from '../interfaces/models/usage-status.model';
import { EmergencyContacts } from '../interfaces/models/emergency-contacts.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private readonly baseUrl = 'https://primecareapi.runasp.net/api/PrimeAi';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  askQuestion(query: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(
      `${this.baseUrl}/ask`,
      { query },
      { headers: this.getHeaders() }
    );
  }

  getUsageStatus(): Observable<UsageStatus> {
    return this.http.get<UsageStatus>(
      `${this.baseUrl}/usage-status`,
      { headers: this.getHeaders() }
    );
  }

  getEmergencyContacts(): Observable<EmergencyContacts> {
    return this.http.get<EmergencyContacts>(
      `${this.baseUrl}/emergency-contacts`,
      { headers: this.getHeaders() }
    );
  }
} 