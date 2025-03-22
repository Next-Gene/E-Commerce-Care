import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutBackEndComponent } from './about-back-end.component';

describe('AboutBackEndComponent', () => {
  let component: AboutBackEndComponent;
  let fixture: ComponentFixture<AboutBackEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutBackEndComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutBackEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
