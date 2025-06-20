import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }
   private searchTerm = new BehaviorSubject<string>('');
  searchTerm1 = this.searchTerm.asObservable();

  updateSearchTerm(term: string) {
    this.searchTerm.next(term);
  }
}
