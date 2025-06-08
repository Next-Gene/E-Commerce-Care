import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ChatbotService } from '../../core/service/chatbot.service';
import { Subject, takeUntil } from 'rxjs';
import { ChatMessage } from '../../core/interfaces/models/chat-message.model';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { UsageStatus } from '../../core/interfaces/models/usage-status.model';
import { EmergencyContacts } from '../../core/interfaces/models/emergency-contacts.model';
import { ChatResponse } from '../../core/interfaces/models/chat-response.model';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('chatMessages') private chatMessages!: ElementRef;

  chatForm: FormGroup;
  chatHistory: ChatMessage[] = [];
  loading = false;
  private destroy$ = new Subject<void>();
  private shouldScroll = false;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private chatbotService = inject(ChatbotService);

  usageStatus$ = this.chatbotService.getUsageStatus();
  emergencyContacts$ = this.chatbotService.getEmergencyContacts();

  constructor() {
    this.chatForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit(): void {
    this.loadInitialMessages();
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  private loadInitialMessages(): void {
    this.chatHistory.push({
      content: "Hello! I'm your AI health assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    });
  }

  sendMessage(): void {
    if (this.chatForm.invalid || this.loading) return;

    const messageControl = this.chatForm.get('message');
    if (!messageControl) return;

    const message = messageControl.value?.trim();
    if (!message) return;

    this.chatHistory.push({
      content: message,
      isUser: true,
      timestamp: new Date(),
    });

    this.loading = true;
    this.shouldScroll = true;
    this.chatForm.disable();

    this.chatbotService
      .askQuestion(message)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: ChatResponse) => {
          let content = `💬 ${response.response}`; // response.response مش response.answer

          if (response.isEmergencyDetected) {
            content += `\n🚨 *Emergency detected!*`;
          }

          if (response.recommendedActions?.length) {
            content += `\n✅ *Recommended Actions:* \n- ${response.recommendedActions.join(
              '\n- '
            )}`;
          }

          if (response.disclaimers?.length) {
            content += `\n⚠ *Disclaimers:* \n- ${response.disclaimers.join(
              '\n- '
            )}`;
          }

          if (response.confidenceLevel !== undefined) {
            content += `\n📊 *Confidence Level:* ${response.confidenceLevel}`;
          }

          this.chatHistory.push({
            content,
            isUser: false,
            timestamp: new Date(response.timestamp),
          });

          this.shouldScroll = true;
          this.chatForm.enable();
          this.chatForm.reset();
          this.loading = false;
        },
        error: (error) => {
          this.handleError(error);
        },
      });
  }

  private handleError(error: {
    status: number;
    error?: { message: string };
  }): void {
    let errorMessage = 'An error occurred while processing your request.';

    if (error.status === 401) {
      errorMessage = 'Your session has expired. Please login again.';
      this.router.navigate(['/auth/login']);
    } else if (error.status === 429) {
      errorMessage =
        'You have reached your daily limit. Please try again tomorrow.';
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    }

    this.chatHistory.push({
      content: errorMessage,
      isUser: false,
      timestamp: new Date(),
      isError: true,
    });

    this.shouldScroll = true;
  }

  private scrollToBottom(): void {
    try {
      this.chatMessages.nativeElement.scrollTop =
        this.chatMessages.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
