import { CatserviceService } from '../../../../../core/service/catservice.service';
import { Component, inject, Inject } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o'; 

@Component({
  selector: 'app-categoriy',
  imports: [CarouselModule],
  templateUrl: './categoriy.component.html',
  styleUrl: './categoriy.component.scss'
})
export class CategoriyComponent {

  Categories: any[] = [];

  constructor(private _CatserviceService: CatserviceService) {} 

  ngOnInit(): void {
    this._CatserviceService.getCategories().subscribe(data => {
      this.Categories = data;
    });
  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay:true,
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
      850:{
        items:3
      },
      1050:{
        items:4
      },
      1300:{
        items:5
      }

    },
    nav: false
  }

}
