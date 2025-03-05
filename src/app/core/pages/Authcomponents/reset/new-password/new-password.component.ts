import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { validsignup } from '../../../../../shared/utilites/validsignup';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { AuthApiService } from '../../../../../../../projects/auth-api/src/public-api';
import { HttpErrorResponse } from '@angular/common/http';
import { RegButtonComponent } from "../../../../../shared/components/ui/reg-button/reg-button.component";
import { AlertsComponent } from "../../../../../shared/components/ui/alerts/alerts.component";
import { EmailInputComponent } from "../../../../../shared/components/ui/email-input/email-input.component";

@Component({
  selector: 'app-new-password',
  imports: [RegButtonComponent, AlertsComponent, EmailInputComponent ,ReactiveFormsModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
private ngUnsubscribe = new Subject<void>(); 
private _router=inject(Router)
private _AuthApiService=inject(AuthApiService)
    errormessage : string="";
    resetpass:FormGroup=new FormGroup({
        email:new FormControl(null,validsignup.email),
        newPassword:new FormControl(null,validsignup.Password),
      })
  submit3=()=>{
    if(this.resetpass.valid)
      {
        this._AuthApiService.resetpass(this.resetpass.value )
        .pipe(takeUntil(this.ngUnsubscribe))
  .subscribe({
    next: (res) => {
      this._router.navigate(["login"])
    },
    error: (err: HttpErrorResponse) => {
      this.errormessage = err.error.message;
    }
  });
      }
  
  }
}
