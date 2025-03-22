import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPrimeCareComponent } from './about-prime-care.component';

describe('AboutPrimeCareComponent', () => {
  let component: AboutPrimeCareComponent;
  let fixture: ComponentFixture<AboutPrimeCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutPrimeCareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutPrimeCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
