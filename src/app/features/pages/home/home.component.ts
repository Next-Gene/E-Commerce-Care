import { Component } from '@angular/core';
import { PopularItemsComponent } from "./components/popular-items/popular-items.component";
import { InformationComponent } from "./components/information/information.component";
import { CategoriyComponent } from "./components/categoriy/categoriy.component";
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  imports: [InformationComponent, CategoriyComponent,CarouselModule,PopularItemsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
