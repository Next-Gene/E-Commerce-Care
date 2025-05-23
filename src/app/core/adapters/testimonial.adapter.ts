import { Testimonial } from './../interfaces/testimonial';
import { Injectable } from "@angular/core";
import { APITestimonialResponse } from "../interfaces/testimonial";

@Injectable({
  providedIn: 'root',
})

export class TestimonialAdapter {
    constructor() {}
    
    TestimonialAdapter(rawRes: APITestimonialResponse): Testimonial[] {
        return rawRes.testimonials.map((resItem: any) => ({
        _id: resItem._id,
        name: resItem.name,
        title: resItem.title,
        description: resItem.text,
        image: resItem.image,
        position: resItem.position,
        }));
    }
}