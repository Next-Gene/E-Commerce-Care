import { Component } from '@angular/core';
import { FindADoctorComponent } from "./components/find-a-doctor/find-a-doctor.component";
import { OurServicesComponent } from "./components/our-services/our-services.component";
import { MeetTeamComponent } from "./components/meet-team/meet-team.component";
import { TestimonialComponent } from "./components/testimonial/testimonial.component";
import { TrustedByComponent } from "./components/trusted-by/trusted-by.component";

@Component({
  selector: 'app-booking',
  imports: [FindADoctorComponent, OurServicesComponent, MeetTeamComponent, TestimonialComponent, TrustedByComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {

}
