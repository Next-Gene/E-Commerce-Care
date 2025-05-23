import { Component, inject } from '@angular/core';
import { TestimonialService } from '../../../../../core/service/testimonial.service';
import { Testimonial } from '../../../../../core/interfaces/testimonial';

@Component({
  selector: 'app-testimonial',
  imports: [],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss'
})
export class TestimonialComponent {
private _testimonial = inject(TestimonialService);
  testimonials: Testimonial[] = [];

  getAllTestimonials() {
    this._testimonial.getAllTestimonials()
      .subscribe((res) => {
        this.testimonials = res;
      });
  }

  ngOnInit() {
    this.getAllTestimonials();
  }
}
