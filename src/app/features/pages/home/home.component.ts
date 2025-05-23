import { CarouselModule } from 'ngx-owl-carousel-o';
import { Component } from '@angular/core';
import { SliderComponent } from "./components/slider/slider.component";
import { OffersComponent } from "./components/offers/offers.component";
import { InfoComponent } from "./components/info/info.component";
import { PopularItemsComponent } from "./components/popular-items/popular-items.component";
import { InformationComponent } from "./components/information/information.component";
import { CategoriyComponent } from "./components/categoriy/categoriy.component";
import { SectionBookingComponent } from "./components/section-booking/section-booking.component";

@Component({
  selector: 'app-home',
  imports: [SliderComponent, OffersComponent, InfoComponent, PopularItemsComponent, InformationComponent, CategoriyComponent, CarouselModule, SectionBookingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent {

}
