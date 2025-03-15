import { Component } from '@angular/core';
import { FlowbiteService } from '../../service/flowbite.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  cartCount: number = 0;
  isMenuOpen: boolean = false;
  isLoggedIn: boolean = false;
  constructor(private _FlowbiteService: FlowbiteService, private router: Router) {}

  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite(() => {});
    this.checkLoginStatus();
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
}
