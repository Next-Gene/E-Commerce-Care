import { Observable } from 'rxjs';
import { DeliveryPayment } from '../interfaces/deliverypayment';
export abstract class DeliveryPaymentAPI {
  abstract createDeliveryPayment(
    deliveryPayment: DeliveryPayment
  ): Observable<DeliveryPayment>;
}
