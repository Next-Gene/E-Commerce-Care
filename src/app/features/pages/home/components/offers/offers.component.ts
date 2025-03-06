import { Component, inject, OnInit } from '@angular/core';
import { DiscBtnComponent } from "../../../../../shared/components/ui/disc-btn/disc-btn.component";
import { TextsComponent } from "../../../../../shared/texts/texts.component";
import { GetImagesService } from '../../../../../core/service/get-images.service';

@Component({
  selector: 'app-offers',
  imports: [DiscBtnComponent, TextsComponent],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss'
})
export class OffersComponent  {


}

