import { ForgetPassUser } from './../../../../../../../dist/auth-api/lib/interface/forgetPass.d';
import { validsignup } from './../../../../../shared/utilites/validsignup';
import { Subject, takeUntil } from 'rxjs';
import { Component, inject } from '@angular/core';
import { EmailInputComponent } from "../../../../../shared/components/ui/email-input/email-input.component";
import { AlertsComponent } from "../../../../../shared/components/ui/alerts/alerts.component";
import { RegButtonComponent } from "../../../../../shared/components/ui/reg-button/reg-button.component";
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from '../../../../../../../dist/auth-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [EmailInputComponent, AlertsComponent, RegButtonComponent,ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
   private ngUnsubscribe = new Subject<void>(); 
  
  private _router=inject(Router)
  private _AuthApiService=inject(AuthApiService)
  errormessage : string="";
  forgetpass:FormGroup=new FormGroup({
  email:new FormControl(null,validsignup.email),
  })
  verifycode:FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required]),
    })
    resetpass:FormGroup=new FormGroup({
      email:new FormControl(null,validsignup.email),
      newPassword:new FormControl(null,validsignup.Password),
    })

  submit=()=>{
    if(this.forgetpass.valid){
      this._AuthApiService.Forgetpass(this.forgetpass.value )
      .pipe(takeUntil(this.ngUnsubscribe))
.subscribe({
  next: (res) => {    
    this._router.navigate(["verifyCode"])

  },
  error: (err: HttpErrorResponse) => {
    this.errormessage = err.error.message;
  }
});
    }

}


  
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete(); 
  }
}
