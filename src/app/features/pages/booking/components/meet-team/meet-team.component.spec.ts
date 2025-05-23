import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetTeamComponent } from './meet-team.component';

describe('MeetTeamComponent', () => {
  let component: MeetTeamComponent;
  let fixture: ComponentFixture<MeetTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
