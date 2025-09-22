import { ProductDetailsComponent } from './../components/product-details/product-details.component';
import { Routes } from '@angular/router';
import { AuthComponent } from '../layouts/auth/auth.component';
import { MainComponent } from '../layouts/main/main.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { ProductsComponent } from '../components/products/products.component';
import { CategoriesComponent } from '../components/categories/categories.component';
import { BrandsComponent } from '../components/brands/brands.component';
import { CartComponent } from '../components/cart/cart.component';
import { RegisterComponent } from '../components/register/register.component';
import { authGuard } from '../core/guards/auth.guard';
import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';
import { ForgetPasswordComponent } from '../components/forget-password/forget-password.component';
import { VerifyPasswordComponent } from '../components/verify-password/verify-password.component';
import { WishListComponent } from '../components/wish-list/wish-list.component';
import { CheckoutComponent } from '../components/checkout/checkout.component';
import { AllordersComponent } from '../components/allorders/allorders.component';
import { OrderDetailsComponent } from '../components/order-details/order-details.component';
import { SubCategoriesComponent } from '../components/sub-categories/sub-categories.component';
import { SpecificBrandComponent } from '../components/specific-brand/specific-brand.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { UpdateProfileComponent } from '../components/update-profile/update-profile.component';
import { AddAddressComponent } from '../components/add-address/add-address.component';
import { UserAddressesComponent } from '../components/user-addresses/user-addresses.component';
import { Component } from '@angular/core';

export const routes: Routes = [
    // {path:'',loadComponent:()=>import('../components/login/login.component').then((component)=>component.LoginComponent),pathMatch:'full'},
    {path:'',component:AuthComponent,children:[
        {path:'',loadComponent:()=>import('../components/login/login.component').then((component)=>component.LoginComponent),pathMatch:'full'},
        {path:'login',loadComponent:()=>import('../components/login/login.component').then((component)=>component.LoginComponent),title:'Login'},
        {path:'register',loadComponent:()=>import('../components/register/register.component').then((component)=>component.RegisterComponent),title:'Register'},
        {path:'forget-password',loadComponent:()=>import('../components/forget-password/forget-password.component').then((Component)=>Component.ForgetPasswordComponent),title:'ForgetPassword'},
        {path:'verify-password',loadComponent:()=>import('../components/verify-password/verify-password.component').then((component)=>component.VerifyPasswordComponent),title:'VerifyPassword'},
        {path:'reset-password',loadComponent:()=>import('../components/reset-password/reset-password.component').then((component)=>component.ResetPasswordComponent),title:'VerifyPassword'},
    ]},
    {path:'',component:MainComponent,canActivate:[authGuard],children:[
        {path:'',loadComponent:()=>import('../components/home/home.component').then((component)=>component.HomeComponent),pathMatch:'full'},
        {path:'home',loadComponent:()=>import('../components/home/home.component').then((component)=>component.HomeComponent),title:'Home'},
        {path:'profile',loadComponent:()=>import('../components/profile/profile.component').then((component)=>component.ProfileComponent),title:'Profile'},
        {path:'update-profile/:data',loadComponent:()=>import('../components/update-profile/update-profile.component').then((component)=>component.UpdateProfileComponent),title:'Update Profile'},
        {path:'add-address',loadComponent:()=>import('../components/add-address/add-address.component').then((component)=>component.AddAddressComponent),title:'Add Address'},
        {path:'addresses',loadComponent:()=>import('../components/user-addresses/user-addresses.component').then((component)=>component.UserAddressesComponent),title:'Your addresses'},
        {path:'products',loadComponent:()=>import('../components/products/products.component').then((component)=>component.ProductsComponent),title:'Products'},
        {path:'categories',loadComponent:()=>import('../components/categories/categories.component').then((component)=>component.CategoriesComponent),title:'Categories'},
        {path:'sub-categories/:id/:name',loadComponent:()=>import('../components/sub-categories/sub-categories.component').then((component)=>component.SubCategoriesComponent),title:'SubCategories'},
        {path:'brands',loadComponent:()=>import('../components/brands/brands.component').then((component)=>component.BrandsComponent),title:'Brands'},
        {path:'specific-brand/:id',loadComponent:()=>import('../components/specific-brand/specific-brand.component').then((component)=>component.SpecificBrandComponent),title:'Specific Brand'},
        {path:'cart',loadComponent:()=>import('../components/cart/cart.component').then((component)=>component.CartComponent),title:'Cart'},
        {path:'wishList',loadComponent:()=>import('../components/wish-list/wish-list.component').then((component)=>component.WishListComponent),title:'WishList'},
        {path:'product-details/:id',loadComponent:()=>import('../components/product-details/product-details.component').then((component)=>component.ProductDetailsComponent),title:'ProductDetails'},
        {path:'checkout/:id',loadComponent:()=>import('../components/checkout/checkout.component').then((component)=>component.CheckoutComponent),title:'CheckOut'},
        {path:'allorders',loadComponent:()=>import('../components/allorders/allorders.component').then((component)=>component.AllordersComponent),title:'All Orders'},
        {path:'order-details/:items',loadComponent:()=>import('../components/order-details/order-details.component').then((component)=>component.OrderDetailsComponent),title:'Order Details'},
    ]},
    {path:'**',loadComponent:()=>import('../components/not-found/not-found.component').then((component)=>component.NotFoundComponent),title:'Error 404'}
];
