import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutFullStackComponent } from './about-full-stack.component';

describe('AboutFullStackComponent', () => {
  let component: AboutFullStackComponent;
  let fixture: ComponentFixture<AboutFullStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutFullStackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutFullStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
