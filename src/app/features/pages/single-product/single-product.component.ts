import { Subject, takeUntil } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/service/products.service';
import { Product } from '../../../core/interfaces/product';
import { CartComponent } from "../../../shared/components/ui/cart/cart.component";
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SingleProductTitleComponent } from "./components/single-product-title/single-product-title.component";
import { SingleProductInformationComponent } from "./components/single-product-information/single-product-information.component";
import { SingleProductRatingComponent } from "./components/single-product-rating/single-product-rating.component";
import { SingleProductRelatedItemsComponent } from "./components/single-product-related-items/single-product-related-items.component";

@Component({
  selector: 'app-single-product',
  imports: [SingleProductTitleComponent, SingleProductInformationComponent, SingleProductRatingComponent, SingleProductRelatedItemsComponent],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss'
})
export class SingleProductComponent{
  


}


