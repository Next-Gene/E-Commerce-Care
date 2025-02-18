import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./features/pages/home/home.component')
            .then(c => c.HomeComponent)
    },
    {
       
     
          
            path: 'login',
            loadComponent: () =>
              import('./core/Authcomponents/login/login/login.component').then(
                (c) => c.LoginComponent
              ),
          },
          {
            path: 'register',
            loadComponent: () =>
              import('./core/Authcomponents/signup/signup/signup.component').then(
                (c) => c.SignupComponent
              ),
          }
      
    
];
