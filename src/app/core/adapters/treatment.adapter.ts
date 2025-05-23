import { Injectable } from "@angular/core";
import { TreatmentApi } from "../base/TreatmentApi";
import { APITreatmentsResponse, Treatment } from "../interfaces/treatment";

@Injectable({
  providedIn: 'root',
})
export class TreatmentAdapter {
  constructor() {}

  TreatmentAdapter(rawRes: APITreatmentsResponse): Treatment[] {
    return rawRes.treatments.map((resItem: any) => ({
      _id: resItem._id,
      name: resItem.name,
      description: resItem.description,
      photoUrl: resItem.photoUrl,
   
    }));
  }
}