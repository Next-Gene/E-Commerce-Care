import { RouterLink, RouterLinkActive } from '@angular/router';
import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../../../../core/service/categories.service';
import { Category } from '../../../../../core/interfaces/category';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-categoriy',
  imports: [CarouselModule,RouterLink,CommonModule,TranslateModule],
  templateUrl: './categoriy.component.html',
  styleUrl: './categoriy.component.scss'
})
export class CategoriyComponent {

  Categories: Category[] = [];

  constructor(private _CategoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.getallCategories();
  }
  getallCategories() {
    this._CategoriesService.getAllCategories().subscribe(data => {
      this.Categories = data;
    });

  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 2000,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      800: {
        items: 3
      },
      850: {
        items: 3
      },
      1050: {
        items: 4
      },
      1300: {
        items: 5
      }

    },
    nav: false,
    rtl: true, // This is the key RTL setting
    autoWidth: false, // Ensure consistent item width
    slideBy: 1, // Slide one item at a time
    pullDrag: true // Allow pull-to-drag
  }

}
