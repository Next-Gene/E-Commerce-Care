import { Component, inject } from '@angular/core';
import { AuthLayOutService } from '../../../../../../services/auth-lay-out.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { validsignup } from '../../../../utilites/validsignup';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertsComponent } from "../../../../shared/alerts/alerts.component";
import { EmailInputComponent } from "../../../../shared/email-input/email-input.component";
import { BackgroundComponent } from "../../../../shared/background/background.component";
import { IconComponent } from "../../../../shared/icon/icon.component";
import { RegButtonComponent } from "../../../../shared/reg-button/reg-button.component";
import { Router, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-signup',
  imports: [AlertsComponent, EmailInputComponent, ReactiveFormsModule, BackgroundComponent, IconComponent, RegButtonComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  private ngUnsubscribe = new Subject<void>(); 

  private _router = inject(Router)
  errormessage : string="";
  private _auth=inject(AuthLayOutService)
  register=new FormGroup({
  username:new FormControl(null,validsignup.name),
  firstName:new FormControl(null,validsignup.name),
  lastName:new FormControl(null,validsignup.name),
  phone:new FormControl(null,validsignup.phone),
  email:new FormControl(null,validsignup.email),
  password:new FormControl(null,validsignup.password ),
  rePassword:new FormControl(null)
  },this.confirmpass)
  confirmpass(g:AbstractControl){
    return g.get('password')?.value==g.get('rePassword')?.value ?null : {missmatch:true}
  }


  getdata = () => {
    this._auth.signup(this.register.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res: any) => {
          console.log(res);
          if (typeof document !== 'undefined' && res.message === "success") {
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
