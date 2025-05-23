export interface Treatment {
  _id?: string;
  name?: string;
  description?: string;
  photoUrl?: string;


}
export interface APITreatmentsResponse {
  message: string;
  treatments: Treatment[];
}