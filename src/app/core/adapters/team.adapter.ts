import { Injectable } from '@angular/core';
import { APITeamResponse, Team } from './../interfaces/team';
@Injectable({
  providedIn: 'root',
})
export class TeamAdapter {
    
constructor() {}
    TeamAdapter(rawRes: APITeamResponse): Team[] {
        return rawRes.team.map((resItem: any) => ({
        _id: resItem._id,
        name: resItem.name,
        image: resItem.image,
         description: resItem.description,
        role: resItem.role,
       
        }));
    }
}