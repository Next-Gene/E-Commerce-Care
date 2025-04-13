import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-info',
  imports: [TranslateModule,CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {
  currentLanguage: string;

  constructor(private translate: TranslateService) {
    this.currentLanguage = this.translate.currentLang || this.translate.getDefaultLang();
    
    // Optional: subscribe to language change
    this.translate.onLangChange.subscribe(event => {
      this.currentLanguage = event.lang;
    });
  }
}
