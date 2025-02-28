import { Component } from '@angular/core';
import { InformationComponent } from "./components/information/information.component";
import { CategoriyComponent } from "./components/categoriy/categoriy.component";
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  imports: [InformationComponent, CategoriyComponent,CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
