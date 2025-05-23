import { takeUntil, Subject } from 'rxjs';
import { Component, inject } from '@angular/core';
import { TreatmentsService } from '../../../../../core/service/treatments.service';
import { Treatment } from '../../../../../core/interfaces/treatment';

@Component({
  selector: 'app-our-services',
  imports: [],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.scss'
})
export class OurServicesComponent {
private _treatments=inject(TreatmentsService)
  treatments: Treatment[] = [];
   private _destroy$ = new Subject<void>(); 
 

  getAllTreatments() {
    this._treatments.getAllTreatments() 
    .pipe(takeUntil(this._destroy$))
    .subscribe((res) => {
      this.treatments = res;
    });
  }
  ngOnInit() {
    this.getAllTreatments();
  }
    ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
