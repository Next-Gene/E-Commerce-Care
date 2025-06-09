import { Observable } from "rxjs";
import { brand } from "../interfaces/brand";

export abstract class BrandAPI{
 abstract getAllBrands():Observable<brand[]>;
}