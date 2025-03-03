import { CarouselModule } from 'ngx-owl-carousel-o';
import { Component } from '@angular/core';
import { PopularItemsComponent } from "./components/popular-items/popular-items.component";
import { InformationComponent } from "./components/information/information.component";
import { CategoriyComponent } from "./components/categoriy/categoriy.component";

@Component({
  selector: 'app-home',
  imports: [InformationComponent, CarouselModule, PopularItemsComponent, CategoriyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent {

}
