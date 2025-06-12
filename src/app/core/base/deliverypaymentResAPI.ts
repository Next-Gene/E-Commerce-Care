import { DeliveryPaymentRes } from "../interfaces/deliverypaymentRes";
import { Observable } from "rxjs";

export abstract class DeliveryPaymentResAPI {
    abstract getDeliveryPaymentRes(): Observable<DeliveryPaymentRes>;
}