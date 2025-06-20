import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
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
  animations: [
    trigger('fadeZoomIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('250ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.8)' })),
      ]),
    ]),
  ],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private _searchService = inject(SearchService);
  private _ThemeService = inject(ThemeService);
  private _cartService = inject(CartService);
  private destroy$ = new Subject<void>();
  isDarkMode = false;
  showSearchInput = false;
  isDropdownOpen = false;
  searchTerm = '';
  cartCount = 0;
  isMenuOpen = false;
  isLoggedIn = false;
  currentLanguage!: 'ar' | 'en';

  constructor(
    private _FlowbiteService: FlowbiteService,
    private router: Router,
    private translationService: TranslationService,
    private _eref: ElementRef
  ) {}

  ngOnInit(): void {
    this.currentLanguage = this.translationService.getLang();
    this._FlowbiteService.loadFlowbite(() => {});
    this.checkLoginStatus();

    this._ThemeService.darkMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isDark) => (this.isDarkMode = isDark));

    this._cartService.cartItemCount$
      .pipe(takeUntil(this.destroy$))
      .subscribe((count) => (this.cartCount = count));
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const clickedInside = this._eref.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isDropdownOpen = false;
      this.showSearchInput = false;
    }
  }

  toggleSearch() {
    this.showSearchInput = !this.showSearchInput;
  }

  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input?.value ?? '';
    this._searchService.updateSearchTerm(value);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleTheme() {
    this._ThemeService.toggleDarkMode();
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

  logout() {
    this.isLoggedIn = false;
    this.isDropdownOpen = false;
    localStorage.removeItem('token');
    this.router.navigate(['/home']).then(() => {
        window.location.reload();
      });
  }

  switchLang() {
    this.translationService.switchLang();
  }

  get isArabic(): boolean {
    return document.documentElement.dir === 'rtl';
  }

  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
