import { DeliveryPayment } from '../interfaces/deliverypayment';
import { Observable } from 'rxjs';

export abstract class DeliveryPaymentAPI {
    abstract createDeliveryPayment(deliveryPayment: DeliveryPayment): Observable<DeliveryPayment>;
}