import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LocalStorageService } from './local-storage.service';
import * as en from '../../../../public/assets/i18n/en.json';
import * as ar from '../../../../public/assets/i18n/ar.json';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  protected defaultLang = 'en';
  protected currentLang: 'en' | 'ar';

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
}
