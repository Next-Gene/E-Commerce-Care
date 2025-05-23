import { Observable } from "rxjs";

export abstract class TeamApi {
    abstract getAllTeam(): Observable<TeamApi[]>; 
}