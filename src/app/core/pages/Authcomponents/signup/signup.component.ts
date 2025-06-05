
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { Router, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AlertsComponent } from '../../../../shared/components/ui/alerts/alerts.component';
import { BackgroundComponent } from '../../../../shared/components/ui/background/background.component';
import { RegButtonComponent } from '../../../../shared/components/ui/reg-button/reg-button.component';
import { AuthApiService } from '../../../../../../projects/auth-api/src/public-api';
import { validsignup } from '../../../../shared/utilites/validsignup';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  imports: [AlertsComponent,TranslateModule, ReactiveFormsModule, BackgroundComponent, RegButtonComponent ,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  private ngUnsubscribe = new Subject<void>(); 

  private _router = inject(Router)
  errormessage : string="";
  private _AuthApiService=inject(AuthApiService)
  register:FormGroup=new FormGroup({
  username:new FormControl(null,validsignup.name),
  fname:new FormControl(null,validsignup.name),
  lname:new FormControl(null,validsignup.name),
  phoneNumber:new FormControl(null,validsignup.phone),
  email:new FormControl(null,validsignup.email),
  password:new FormControl(null,validsignup.Password ),
  repassword:new FormControl(null)
  },this.confirmpass)
  confirmpass(g:AbstractControl){
    return g.get('password')?.value==g.get('repassword')?.value ?null : {missmatch:true}
  }


  signup= () => {
    this._AuthApiService.Regester(this.register.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res: any) => {

          if (typeof document !== 'undefined' && res.message ==undefined) {
            this._router.navigate(['/login']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.errormessage = err.error.message;
        }
      });
  };

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete(); 
  }
}
