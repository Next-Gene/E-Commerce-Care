import { Routes, RouterLink } from '@angular/router';
import { Component, inject, Inject } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../../../../core/service/categories.service';
import { Category } from '../../../../../core/interfaces/category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categoriy',
  imports: [CarouselModule,RouterLink,CommonModule],
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
    // pullDrag: true,
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
    nav: false
  }

}
