import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatResponse } from '../interfaces/models/chat-response.model';
import { UsageStatus } from '../interfaces/models/usage-status.model';
import { EmergencyContacts } from '../interfaces/models/emergency-contacts.model';
import { ApiEndpoint } from '../enums/api.endpoints';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  constructor(
    private _httpClient: HttpClient
  ) {}

  askQuestion(query: string): Observable<ChatResponse> {
    return this._httpClient.post<ChatResponse>(`${ApiEndpoint.CHATBOT}/ask`, {
      query,
    });
  }

  getUsageStatus(): Observable<UsageStatus> {
    return this._httpClient.get<UsageStatus>(
      `${ApiEndpoint.CHATBOT}/usage-status`
    );
  }

  getEmergencyContacts(): Observable<EmergencyContacts> {
    return this._httpClient.get<EmergencyContacts>(
      `${ApiEndpoint.CHATBOT}/emergency-contacts`
    );
  }
}
