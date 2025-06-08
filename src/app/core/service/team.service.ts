import { APITeamResponse } from './../interfaces/team';
import { TeamAdapter } from './../adapters/team.adapter';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoint } from '../enums/api.endpoints';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
   private _httpClient: HttpClient,
   private _teamAdapter: TeamAdapter
  ) { }
  getAllTeam() {
    return this._httpClient.get<APITeamResponse>(ApiEndpoint.TEAM).pipe(
      map((res: any) => this._teamAdapter.TeamAdapter(res))
    )
  }
}
