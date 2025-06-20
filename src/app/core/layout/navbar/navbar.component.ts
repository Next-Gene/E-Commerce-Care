import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  HostListener,
  inject,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FlowbiteService } from '../../service/flowbite.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../service/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from '../../service/theme.service';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from '../../service/cart.service';
import { SearchService } from '../../service/search.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
    animations: [  // ✅ هنا فقط
trigger('fadeZoomIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.8)' }),
    animate('250ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.8)' })),
  ]),
])
  ],
})

export class NavbarComponent implements OnInit, OnDestroy {
  private _searchService = inject(SearchService);
  private _ThemeService = inject(ThemeService);
  private _cartService = inject(CartService);
  private destroy$ = new Subject<void>();
  isDarkMode = false;
  showSearchInput = false;
  private searchSubject = new Subject<string>();
  searchTerm = '';

  toggleTheme() {
    this._ThemeService.toggleDarkMode();
  }
  cartCount: number = 0;
  isMenuOpen: boolean = false;
  isLoggedIn: boolean = false;
  constructor(
    private _FlowbiteService: FlowbiteService,
    private router: Router,
    private translationService: TranslationService,
    private themeService: ThemeService,
    private _eref: ElementRef
  ) {

  }
  isDropdownOpen = false;
  currentLanguage!: 'ar' | 'en';

  ngOnInit(): void {
    this.currentLanguage = this.translationService.getLang();
    this._FlowbiteService.loadFlowbite(() => {});
    this.checkLoginStatus();

    // Subscribe to theme changes
    this._ThemeService.darkMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isDark) => {
        this.isDarkMode = isDark;
      });

    // Subscribe to cart count changes
    this._cartService.cartItemCount$
      .pipe(takeUntil(this.destroy$))
      .subscribe((count) => {
        this.cartCount = count;
      });
  }
onSearchInput(event: Event) {
  const input = event.target as HTMLInputElement;
  const value = input?.value ?? '';
  this._searchService.updateSearchTerm(value);
}
  toggleSearch() {
    this.showSearchInput = !this.showSearchInput;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false; // Close dropdown if clicked outside
    }
  }
}
