import { PaymetComponent } from './features/pages/checkout/paymet/paymet.component';
import { FormComponent } from './features/pages/checkout/form/form.component';
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
        path: 'about',
        loadComponent: () => import('./features/pages/about/about.component')
            .then(c => c.AboutComponent)
        
    },
    {
        path: 'categories',
        loadComponent: () => import('./features/pages/categories/categories.component')
            .then(c => c.CategoriesComponent)
        
    },
    {
        path: 'All-prodect',
        loadComponent: () => import('./features/pages/all-prodect/all-prodect.component')
            .then(c => c.AllProdectComponent)
        
    },
    {
        path: 'cart',
        loadComponent: () => import('./shared/components/ui/cart/cart.component')
            .then(c => c.CartComponent)
        
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
    },
    {
        path: 'checkout',
        loadComponent: () =>
            import('./features/pages/checkout/ckeckout/ckeckout.component').then(
                (c) => c.CkeckoutComponent
            ),
    },
    {
        path: 'paymet',
        loadComponent: () =>
            import('./features/pages/checkout/paymet/paymet.component').then(
                (c) => c.PaymetComponent
            ),
    }


];
