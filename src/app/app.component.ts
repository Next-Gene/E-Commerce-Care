import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from "./core/layout/navbar/navbar.component";
import { FooterComponent } from "./core/layout/footer/footer.component";
import { filter } from 'rxjs';
import { ResetPasswordComponent } from "./core/pages/Authcomponents/reset/reset-password/reset-password.component";
import { VerfiycodeComponent } from "./core/pages/Authcomponents/reset/verfiycode/verfiycode.component";
import { NewPasswordComponent } from "./core/pages/Authcomponents/reset/new-password/new-password.component";

@Component({
  selector: 'app-root',
  imports: [CommonModule, NavbarComponent, FooterComponent,RouterOutlet,ResetPasswordComponent,VerfiycodeComponent,NewPasswordComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'E-Commerce-Care';
  isAuthPage:boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object, private _router: Router) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }

    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const authPages = ['/login', '/register', '/forgot-password', '/verify', '/reset-password'];
      this.isAuthPage = authPages.includes(event.url);
    });
  }
}
