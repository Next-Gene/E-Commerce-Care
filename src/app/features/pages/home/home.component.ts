import { Component } from '@angular/core';
import { PopularItemsComponent } from "./components/popular-items/popular-items.component";

@Component({
  selector: 'app-home',
  imports: [PopularItemsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
