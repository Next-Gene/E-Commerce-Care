import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUIUXComponent } from './about-ui-ux.component';

describe('AboutUIUXComponent', () => {
  let component: AboutUIUXComponent;
  let fixture: ComponentFixture<AboutUIUXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUIUXComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutUIUXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
