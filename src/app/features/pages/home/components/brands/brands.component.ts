import { Component, inject } from '@angular/core';
import { BrandService } from '../../../../../core/service/brand.service';
import { brand } from '../../../../../core/interfaces/brand';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-brands',
  imports: [CommonModule, CarouselModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  private brandService = inject(BrandService);
  brands: brand[] = [];
  carouselOptions: any;

  ngOnInit(): void {
    this.getAllBrands();
    this.croissant();
  }
  getAllBrands() {

    this.brandService.getAllBrands().subscribe((brands: brand[]) => {
      const uniqueBrands = this.removeDuplicates(brands);
      this.brands = this.getRandomBrands(uniqueBrands, 8);
    });
  }
  removeDuplicates(brands: brand[]): brand[] {
    const seen = new Set();
    return brands.filter((brand) => {
      if (seen.has(brand.id)) return false;
      seen.add(brand.id);
      return true;
    });
  }

  getRandomBrands(brands: brand[], count: number): brand[] {
    const shuffled = [...brands].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  croissant(): void {
    this.carouselOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      autoplay: true,
      rtl: true,
      autoplayTimeout: 2000,
      dots: false,
      navSpeed: 700,
      responsive: {
        0: { items: 1 },
        600: { items: 3 },
        1000: { items: 3 }
      },
      nav: false,
    };
  }
}
