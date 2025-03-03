import { Component } from '@angular/core';
import { FlowbiteService } from '../../service/flowbite.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private _FlowbiteService:FlowbiteService){};
  ngOnInit(): void{
    this._FlowbiteService.loadFlowbite(()=>{

    })
}

cartCount: number = 0; 

addToCart(): void {
  this.cartCount++;
}

removeFromCart(): void {
  if (this.cartCount > 0) {
    this.cartCount--;
  }
}

}
