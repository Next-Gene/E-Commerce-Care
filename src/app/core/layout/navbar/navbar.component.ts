import { Component, inject } from '@angular/core';
import { FlowbiteService } from '../../service/flowbite.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../service/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from '../../service/theme.service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslateModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    private _ThemeService = inject(ThemeService);
  toggleTheme() {
    this._ThemeService.toggleDarkMode();
  }
  cartCount: number = 0;
  isMenuOpen: boolean = false;
  isLoggedIn: boolean = false;
  constructor(private _FlowbiteService: FlowbiteService, private router: Router,
    private translationService: TranslationService, private themeService: ThemeService
  ) {}
  isDropdownOpen = false;
   currentLanguage!: 'ar' | 'en';
  ngOnInit(): void {
    this.currentLanguage = this.translationService.getLang();
    this._FlowbiteService.loadFlowbite(() => {});
    this.checkLoginStatus();
  }
  get isArabic(): boolean {
    return document.documentElement.dir === 'rtl'; // أو استخدم أي منطق يعتمد على اللغة الحالية
  }
  
  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('token');
  }
  addToCart(): void {
    this.cartCount++;
  }

  removeFromCart(): void {
    if (this.cartCount > 0) {
      this.cartCount--;
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  logout() {
    this.isLoggedIn = false; 
    this.isDropdownOpen = false;
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
   switchLang() {
    this.translationService.switchLang();
  }
}
