import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriyComponent } from './categoriy.component';

describe('CategoriyComponent', () => {
  let component: CategoriyComponent;
  let fixture: ComponentFixture<CategoriyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
