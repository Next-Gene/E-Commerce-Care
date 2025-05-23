import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionBookingComponent } from './section-booking.component';

describe('SectionBookingComponent', () => {
  let component: SectionBookingComponent;
  let fixture: ComponentFixture<SectionBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
