export interface Testimonial {
    _id?: string;
    name?: string;
    title?: string;
    description?: string;
    image?: string;
    position?: string;
}
export interface APITestimonialResponse {
    message: string;
    testimonials: Testimonial[];
}