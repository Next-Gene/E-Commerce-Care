import { validsignup } from './../../../../shared/utilites/validsignup';
import { Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { IconComponent } from '../../../../shared/components/ui/icon/icon.component';
import { EmailInputComponent } from '../../../../shared/components/ui/email-input/email-input.component';
import { AlertsComponent } from '../../../../shared/components/ui/alerts/alerts.component';
import { RegButtonComponent } from '../../../../shared/components/ui/reg-button/reg-button.component';
import { BackgroundComponent } from '../../../../shared/components/ui/background/background.component';
import { AuthApiService } from '../../../../../../projects/auth-api/src/public-api';


@Component({
  selector: 'app-login',
  imports: [IconComponent, EmailInputComponent, ReactiveFormsModule,AlertsComponent,RegButtonComponent , BackgroundComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    private ngUnsubscribe = new Subject<void>(); 
  
  private _router=inject(Router)
  private _auth=inject(AuthApiService)
  errormessage : string="";
  login:FormGroup=new FormGroup({
  email:new FormControl(null,validsignup.email),
  password:new FormControl(null,validsignup.Password ),
  })
  navigateToSignup() {
    this._router.navigate(['/register']);
  }
  getdata =()=>{
  this._auth.Login(this.login.value )
        .pipe(takeUntil(this.ngUnsubscribe))
  .subscribe({
    next: (res: any) => {
      localStorage.setItem("token", res.token);
      
    },
    error: (err: HttpErrorResponse) => {
      this.errormessage = err.error.message;
    }
  });
}
  
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete(); 
  }
}
