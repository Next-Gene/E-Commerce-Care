import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProductInformationComponent } from './single-product-information.component';

describe('SingleProductInformationComponent', () => {
  let component: SingleProductInformationComponent;
  let fixture: ComponentFixture<SingleProductInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleProductInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleProductInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
