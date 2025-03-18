import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProductRatingComponent } from './single-product-rating.component';

describe('SingleProductRatingComponent', () => {
  let component: SingleProductRatingComponent;
  let fixture: ComponentFixture<SingleProductRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleProductRatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleProductRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
