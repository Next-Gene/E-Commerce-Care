import { AboutComponent } from './features/pages/about/about.component';
import { CartComponent } from './shared/components/ui/cart/cart.component';
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
        path: 'cart',
        loadComponent: () => import('./shared/components/ui/cart/cart.component')
            .then(c => c.CartComponent)
        
    },

];
