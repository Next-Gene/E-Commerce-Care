import { Component } from '@angular/core';
import { MadeByComponent } from "./About-us-component`s/made-by/made-by.component";
import { AboutBackEndComponent } from "./About-us-component`s/about-back-end/about-back-end.component";
import { AboutFrontEndComponent } from "./About-us-component`s/about-front-end/about-front-end.component";
import { AboutProjectManagerComponent } from "./About-us-component`s/about-project-manager/about-project-manager.component";
import { AboutUIUXComponent } from "./About-us-component`s/about-ui-ux/about-ui-ux.component";
import { AboutPrimeCareComponent } from "./About-us-component`s/about-prime-care/about-prime-care.component";
import { AboutFullStackComponent } from './About-us-component`s/about-full-stack/about-full-stack.component';

@Component({
  selector: 'app-about',
  imports: [MadeByComponent, AboutBackEndComponent, AboutFrontEndComponent, AboutProjectManagerComponent, AboutUIUXComponent, AboutPrimeCareComponent, AboutFullStackComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
