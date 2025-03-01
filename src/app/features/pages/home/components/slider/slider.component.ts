import { CarouselModule } from 'ngx-owl-carousel-o';
import { Component, inject } from '@angular/core';
import { DiscBtnComponent } from "../../../../../shared/components/ui/disc-btn/disc-btn.component";
import { TextsComponent } from "../../../../../shared/texts/texts.component";
import { GetImagesService } from '../../../../../core/service/get-images.service';

@Component({
  selector: 'app-slider',
  standalone:true,
  imports: [DiscBtnComponent, TextsComponent ,CarouselModule],
  
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})

export class SliderComponent {
private _GetImagesService=inject(GetImagesService);
images:any[]=[];
carouselOptions: any;
setimage(){
this._GetImagesService.getimage().subscribe( {
next:(res)=>{
this.images=res.images   
}
});
}
croissant(){
this.carouselOptions = {
loop: true,
autoplay: true,
      autoplayTimeout: 5000,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        1000: {
          items: 1,
        },
      },
      nav: false,
      dots: true,
    
    };
  }
 ngOnInit(): void {
 this.setimage()
this.croissant()
 }


}
