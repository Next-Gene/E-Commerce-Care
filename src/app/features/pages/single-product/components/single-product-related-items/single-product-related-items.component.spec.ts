import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProductRelatedItemsComponent } from './single-product-related-items.component';

describe('SingleProductRelatedItemsComponent', () => {
  let component: SingleProductRelatedItemsComponent;
  let fixture: ComponentFixture<SingleProductRelatedItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleProductRelatedItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleProductRelatedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
