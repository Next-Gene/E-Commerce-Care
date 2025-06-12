import { Observable } from 'rxjs';
import { OnlinePayment } from '../interfaces/onlinepayment';
import { OnlinePaymentRes } from '../interfaces/onlinepaymentRes';

export abstract class OnlinePaymentAPI {
    abstract createOnlinePayment(onlinePayment: OnlinePayment): Observable<OnlinePaymentRes>;
}