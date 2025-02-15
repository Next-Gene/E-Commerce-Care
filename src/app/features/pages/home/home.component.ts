import { Component } from '@angular/core';
import { FooterComponent } from "../../../core/layout/footer/footer.component";
import { NavbarComponent } from "../../../core/layout/navbar/navbar.component";

@Component({
  selector: 'app-home',
  imports: [FooterComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
