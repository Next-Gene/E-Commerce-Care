import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from "./core/layout/navbar/navbar.component";
import { FooterComponent } from "./core/layout/footer/footer.component";
import { ResetPasswordComponent } from "./core/pages/Authcomponents/reset/reset-password/reset-password.component";
import { VerfiycodeComponent } from "./core/pages/Authcomponents/reset/verfiycode/verfiycode.component";
import { NewPasswordComponent } from "./core/pages/Authcomponents/reset/new-password/new-password.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ResetPasswordComponent, VerfiycodeComponent, NewPasswordComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit {
  title = 'E-Commerce-Care';
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }
  }
}
