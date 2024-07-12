import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashComponent } from './admin/admin-dash/admin-dash.component';
import { UserCurdComponent } from './admin/user-curd/user-curd.component';
import { ProductComponent } from './product/product.component';
import { SigninSignupComponent } from './customer/signin-signup/signin-signup.component';
import { BuyerDashComponent } from './customer/buyer/buyer-dash/buyer-dash.component';
import { CheckoutComponent } from './customer/buyer/checkout/checkout.component';
import { PageNotFoundComponent } from './shared/layouts/page-not-found/page-not-found.component';
import { SellerDashComponent } from './customer/seller/seller-dash/seller-dash.component';
import { SellerProductComponent } from './customer/seller/seller-product/seller-product.component';
import { AdminAuthGaurdService, AuthGuardService, BuyerAuthGaurdService, SellerAuthGaurdService, SellerBuyerAuthGuardLogin } from './shared/services/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: 'my-profile',
    component: UserProfileComponent,
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },

  //admin

  {
    path: '', canActivate:[AuthGuardService],
    children: [{ path: 'admin-login', component: AdminLoginComponent }],
  },

  {
    path: '',
    canActivate:[AdminAuthGaurdService],
    children: [
      { path: 'admin-dashboard', component: AdminDashComponent },
      { path: 'admin/user', component: UserCurdComponent },
      { path: 'admin/product', component: ProductComponent },
    ],
  },

  {
    path: '',
    canActivate:[SellerBuyerAuthGuardLogin],
    children: [
      { path: 'sign-in', component: SigninSignupComponent },
      { path: 'sign-up', component: SigninSignupComponent },
    ],
  },

  {
    path: '',
    canActivate:[BuyerAuthGaurdService],
    children: [
      { path: 'buyer-dashboard', component: BuyerDashComponent },
      { path: 'checkout', component: CheckoutComponent },
    ],
  },

  {
    path: '',
    canActivate:[SellerAuthGaurdService],
    children: [
      { path: 'seller-dashboard', component: SellerDashComponent },
      { path: 'seller/product', component: ProductComponent },
    ],
  },

  { path: '**', component: PageNotFoundComponent },
];
