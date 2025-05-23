export interface Team {
    _id: number;
    name: string;
    image: string;
    description: string;
    role: string;
 
}
export interface APITeamResponse {
    message: string;
    team: Team[];
}