import { RouterLink } from '@angular/router';
import { FlowbiteService } from './../../services/flowbite.service';
import { Component, PLATFORM_ID, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  constructor(private _FlowbiteService:FlowbiteService){};
  ngOnInit(): void{
    this._FlowbiteService.loadFlowbite(()=>{

    })
  }
  


}
