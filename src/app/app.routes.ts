import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
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
            import('./core/pages/Authcomponents/login/login.component').then(
                (c) => c.LoginComponent
            ),
    },
    {



        path: 'resetPassword',
        loadComponent: () =>
            import('./core/pages/Authcomponents/reset/reset-password/reset-password.component').then(
                (c) => c.ResetPasswordComponent
            ),
    },
    {



        path: 'verifyCode',
        loadComponent: () =>
            import('./core/pages/Authcomponents/reset/verfiycode/verfiycode.component').then(
                (c) => c.VerfiycodeComponent
            ),
    },
    {



        path: 'newPassword',
        loadComponent: () =>
            import('./core/pages/Authcomponents/reset/new-password/new-password.component').then(
                (c) => c.NewPasswordComponent
            ),
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./core/pages/Authcomponents/signup/signup.component').then(
                (c) => c.SignupComponent
            ),
    }

];
