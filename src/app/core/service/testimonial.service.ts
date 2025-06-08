import { Injectable } from '@angular/core';
import { TestimonialAdapter } from '../adapters/testimonial.adapter';
import { HttpClient } from '@angular/common/http';
import { APITestimonialResponse } from '../interfaces/testimonial';
import { ApiEndpoint } from '../enums/api.endpoints';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(
    private _httpClient: HttpClient,
     private _testimonialAdapter: TestimonialAdapter
  ) { }
  getAllTestimonials() {
    return this._httpClient.get<APITestimonialResponse>(ApiEndpoint.TESTIMONIAL) 
    .pipe( map((res: APITestimonialResponse) =>
        this._testimonialAdapter.TestimonialAdapter(res)
  )); 
  }
}
