import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-single-product-rating',
  imports: [CarouselModule, CommonModule],
  templateUrl: './single-product-rating.component.html',
  styleUrl: './single-product-rating.component.scss'
})
export class SingleProductRatingComponent {
carouselOptions: any;
showRatingModal: boolean = false;
currentRating: number = 0;
private _destroy$ = new Subject<void>();
ngOnInit(): void {
this.croissant();
}
croissant(): void {
this.carouselOptions = {
loop: true,
mouseDrag: true,
touchDrag: true,
autoplay: true,
autoplayTimeout: 2000,
dots: false,
navSpeed: 700,
responsive: {
0: { items: 1 },
600: { items: 2 },
1000: { items: 3 }
},
nav: false,
};
}
toggleRatingModal(): void {
this.showRatingModal = !this.showRatingModal;
}
setRating(star: number): void {
this.currentRating = star;
}
submitRating(): void {
console.log('Rating submitted:', this.currentRating);
this.toggleRatingModal();
}
}