import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LocalStorageService } from './local-storage.service';
import * as en from '../locale/en.json';
import * as ar from '../locale/ar.json';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private defaultLang = 'en';
  private currentLang: 'en' | 'ar';

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService
  ) {
    this.translateService.setTranslation('ar', ar);
    this.translateService.setTranslation('en', en);

    this.currentLang =
      this.localStorageService.getItem('lang') || this.defaultLang;

    translateService.use(this.currentLang);
    this.localStorageService.setItem('lang', this.currentLang);
  }

  switchLang() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.localStorageService.setItem('lang', this.currentLang);
    location.reload();
  }

  getDir(): 'rtl' | 'ltr' {
    return this.currentLang === 'ar' ? 'rtl' : 'ltr';
  }

  getLang(): 'ar' | 'en' {
    return this.currentLang;
  }
}
