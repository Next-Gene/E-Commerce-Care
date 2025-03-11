import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymetComponent } from './paymet.component';

describe('PaymetComponent', () => {
  let component: PaymetComponent;
  let fixture: ComponentFixture<PaymetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
