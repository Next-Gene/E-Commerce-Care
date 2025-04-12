import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from "./core/layout/navbar/navbar.component";
import { FooterComponent } from "./core/layout/footer/footer.component";
import { filter } from 'rxjs';
import { LoadingComponent } from "./shared/components/ui/loading/loading.component";

@Component({
  selector: 'app-root',
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterOutlet, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'E-Commerce-Care';
  isAuthPage: boolean = false;
  isLoading: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object, private _router: Router) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }

    this._router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationStart') {
        this.isLoading = true;
      }

      if (event.constructor.name === 'NavigationEnd' || event.constructor.name === 'NavigationCancel' || event.constructor.name === 'NavigationError') {
        this.isLoading = false;
      }

      if (event instanceof NavigationEnd) {
        const authPages = ['/login', '/register', '/newPassword', '/verifyCode', '/resetPassword'];
        this.isAuthPage = authPages.includes(event.url);
      }
    });
  }
}

