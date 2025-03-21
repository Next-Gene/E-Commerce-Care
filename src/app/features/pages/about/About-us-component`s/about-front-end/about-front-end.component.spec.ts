import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutFrontEndComponent } from './about-front-end.component';

describe('AboutFrontEndComponent', () => {
  let component: AboutFrontEndComponent;
  let fixture: ComponentFixture<AboutFrontEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutFrontEndComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutFrontEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
