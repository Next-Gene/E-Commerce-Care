import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSammaryComponent } from './cart-sammary.component';

describe('CartSammaryComponent', () => {
  let component: CartSammaryComponent;
  let fixture: ComponentFixture<CartSammaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartSammaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartSammaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
