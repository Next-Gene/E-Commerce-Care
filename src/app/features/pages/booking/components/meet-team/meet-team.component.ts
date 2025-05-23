import { Component, inject } from '@angular/core';
import { TeamService } from '../../../../../core/service/team.service';
import { Team } from '../../../../../core/interfaces/team';

@Component({
  selector: 'app-meet-team',
  imports: [],
  templateUrl: './meet-team.component.html',
  styleUrl: './meet-team.component.scss'
})
export class MeetTeamComponent {
private _team=inject(TeamService)
  team: Team[] = [];
  getAllTeam() {
  this._team.getAllTeam()
  .subscribe((res) => {
  this.team = res;
  });
  }
  ngOnInit() {
  this.getAllTeam();
  }
 }

