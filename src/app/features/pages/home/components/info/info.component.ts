import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']  // تم تصحيح المفتاح هنا
})
export class InfoComponent {
  currentLanguage: string;

  constructor(private translate: TranslateService) {
    this.currentLanguage = this.translate.currentLang || this.translate.getDefaultLang();
    
    // الاشتراك في تغييرات اللغة لتحديث currentLanguage عند تغيير لغة التطبيق
    this.translate.onLangChange.subscribe(event => {
      this.currentLanguage = event.lang;
    });
  }
}
