import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProdectComponent } from './all-prodect.component';

describe('AllProdectComponent', () => {
  let component: AllProdectComponent;
  let fixture: ComponentFixture<AllProdectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllProdectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProdectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
