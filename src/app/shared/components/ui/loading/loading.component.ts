import { Component } from '@angular/core';
import { LoadingService } from '../../../../core/service/loading-service.service';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  constructor(public _loadingService: LoadingService) {}
}
