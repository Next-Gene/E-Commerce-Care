import { Component } from '@angular/core';
import { InformationComponent } from "../../../shared/slider/information/information.component";
import { CategoriyComponent } from "../../../shared/slider/categoriy/categoriy.component";
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  imports: [InformationComponent, CategoriyComponent,CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
