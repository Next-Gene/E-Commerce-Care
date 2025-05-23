import { Observable } from "rxjs";
import { Treatment } from "../interfaces/treatment";

export abstract class TreatmentApi {
abstract getAllTreatments(): Observable<Treatment[]>;
}