import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProductTitleComponent } from './single-product-title.component';

describe('SingleProductTitleComponent', () => {
  let component: SingleProductTitleComponent;
  let fixture: ComponentFixture<SingleProductTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleProductTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleProductTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
