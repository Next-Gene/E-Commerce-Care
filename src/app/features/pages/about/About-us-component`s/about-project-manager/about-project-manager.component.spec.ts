import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutProjectManagerComponent } from './about-project-manager.component';

describe('AboutProjectManagerComponent', () => {
  let component: AboutProjectManagerComponent;
  let fixture: ComponentFixture<AboutProjectManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutProjectManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutProjectManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
