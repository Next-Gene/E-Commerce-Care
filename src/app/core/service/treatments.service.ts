import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreatmentAdapter } from '../adapters/treatment.adapter';
import { APITreatmentsResponse } from '../interfaces/treatment';
import { ApiEndpoint } from '../enums/api.endpoints';
import { map } from 'rxjs/operators';
import { TreatmentApi } from '../base/TreatmentApi';

@Injectable({
  providedIn: 'root'
})
export class TreatmentsService implements TreatmentApi {

  constructor(
    private _httpClient: HttpClient,
    private _treatmentsAdapter: TreatmentAdapter
  ) {}
  getAllTreatments() {
return this._httpClient.get<APITreatmentsResponse>(ApiEndpoint.TREARMENT).pipe(
  map((res: APITreatmentsResponse) =>
    this._treatmentsAdapter.TreatmentAdapter(res)
  )
)

  }
}
