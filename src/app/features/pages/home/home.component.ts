import { Component } from '@angular/core';
import { SliderComponent } from "./components/slider/slider.component";
import { OffersComponent } from "./components/offers/offers.component";
import { InfoComponent } from "./components/info/info.component";

@Component({
  selector: 'app-home',
  imports: [SliderComponent, OffersComponent, InfoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
