import { Observable } from "rxjs";
import { Testimonial } from "../interfaces/testimonial";

export abstract class TestimonialApi {
 
    abstract getAllTestimonials(): Observable<Testimonial[]>;
  }
