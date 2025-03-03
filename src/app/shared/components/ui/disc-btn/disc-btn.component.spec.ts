import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscBtnComponent } from './disc-btn.component';

describe('DiscBtnComponent', () => {
  let component: DiscBtnComponent;
  let fixture: ComponentFixture<DiscBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
