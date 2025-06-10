import { DetailsCategoryComponent } from './features/pages/home/components/details-category/details-category.component';
import { PaymetComponent } from './features/pages/checkout/paymet/paymet.component';
import { FormComponent } from './features/pages/checkout/form/form.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'chatbot',
    loadComponent: () =>
      import('./features/chatbot/chatbot.component').then(
        (c) => c.ChatbotComponent
      ),
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./features/pages/home/home.component').then(
        (c) => c.HomeComponent
      ),
  },

  {
    path: 'about',
    loadComponent: () =>
      import('./features/pages/about/about.component').then(
        (c) => c.AboutComponent
      ),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./features/pages/categories/categories.component').then(
        (c) => c.CategoriesComponent
      ),
  },
  {
    path: 'All-prodect',
    loadComponent: () =>
      import('./features/pages/all-prodect/all-prodect.component').then(
        (c) => c.AllProductComponent
      ),
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./core/pages/Authcomponents/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'SingleProduct/:id',
    loadComponent: () =>
      import('./features/pages/single-product/single-product.component').then(
        (c) => c.SingleProductComponent
      ),
  },
  {
    path: 'resetPassword',
    loadComponent: () =>
      import(
        './core/pages/Authcomponents/reset/reset-password/reset-password.component'
      ).then((c) => c.ResetPasswordComponent),
  },
  {
    path: 'verifyCode',
    loadComponent: () =>
      import(
        './core/pages/Authcomponents/reset/verfiycode/verfiycode.component'
      ).then((c) => c.VerfiycodeComponent),
  },
  {
    path: 'newPassword',
    loadComponent: () =>
      import(
        './core/pages/Authcomponents/reset/new-password/new-password.component'
      ).then((c) => c.NewPasswordComponent),
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
    path: 'details-category/:id',
    loadComponent: () =>
      import(
        './features/pages/home/components/details-category/details-category.component'
      ).then((c) => c.DetailsCategoryComponent),
  },
  {
    path: 'policy',
    loadComponent: () =>
      import('./features/pages/static pages/policy/policy.component').then(
        (c) => c.PolicyComponent
      ),
  },
  {
    path: 'delivery',
    loadComponent: () =>
      import('./features/pages/static pages/delivery/delivery.component').then(
        (c) => c.DeliveryComponent
      ),
  },
  {
    path: 'faqs',
    loadComponent: () =>
      import('./features/pages/static pages/faqs/faqs.component').then(
        (c) => c.FAQSComponent
      ),
  },
  {
    path: 'stores',
    loadComponent: () =>
      import('./features/pages/static pages/stores/stores.component').then(
        (c) => c.StoresComponent
      ),
  },

  {
    path: 'cart',
    loadComponent: () =>
      import('./features/pages/cart/cart.component').then(
        (c) => c.CartComponent
      ),
  },
  {
    path: 'booking',
    loadComponent: () =>
      import('./features/pages/booking/booking.component').then(
        (c) => c.BookingComponent
      ),
  },
  {
    path: 'best-seller',
    loadComponent: () =>
      import('./features/pages/best-seller/best-seller.component').then(
        (c) => c.BestSellerComponent
      ),
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./features/pages/wishlist/wishlist.component').then(
        (c) => c.WishlistComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/ui/error-page/error-page.component').then(
        (c) => c.ErrorPageComponent
      ),
  },
];
