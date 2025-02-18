import { Subject, takeUntil } from 'rxjs';
import { validsignup } from '../../../../utilites/validsignup';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthLayOutService } from '../../../../../../services/auth-lay-out.service';
import { IconComponent } from "../../../../shared/icon/icon.component";
import { EmailInputComponent } from "../../../../shared/email-input/email-input.component";
import { AlertsComponent } from "../../../../shared/alerts/alerts.component";
import { BackgroundComponent } from "../../../../shared/background/background.component";
import { Router } from '@angular/router';
import { RegButtonComponent } from '../../../../shared/reg-button/reg-button.component';

@Component({
  selector: 'app-login',
  imports: [IconComponent, EmailInputComponent, ReactiveFormsModule,AlertsComponent,RegButtonComponent , BackgroundComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    private ngUnsubscribe = new Subject<void>(); 
  
  private _router=inject(Router)
  private _auth=inject(AuthLayOutService)
  errormessage : string="";
  register=new FormGroup({
  email:new FormControl(null,validsignup.email),
  password:new FormControl(null,validsignup.password ),
  })
  navigateToSignup() {
    this._router.navigate(['/register']);
  }
  getdata =()=>{
  this._auth.signin(this.register.value)
        .pipe(takeUntil(this.ngUnsubscribe))
  .subscribe({
    next: (res: any) => {
      localStorage.setItem("token", res.token);
      
    },
    error: (err: HttpErrorResponse) => {
      console.log(err.error.message);
      this.errormessage = err.error.message;
    }
  });
}
  
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete(); 
  }
}
