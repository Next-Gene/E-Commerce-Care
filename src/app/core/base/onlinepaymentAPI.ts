import { Observable } from 'rxjs';
import { OnlinePayment } from '../interfaces/onlinepayment';
export abstract class OnlinePaymentAPI {
  abstract createOnlinePayment(onlinePayment: OnlinePayment): Observable<OnlinePayment>;
}
