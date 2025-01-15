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

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'',component:AuthComponent,children:[
        {path:'',redirectTo:'login',pathMatch:'full'},
        {path:'login',component:LoginComponent,title:'Login'},
        {path:'register',component:RegisterComponent,title:'Register'},
        {path:'forget-password',component:ForgetPasswordComponent,title:'ForgetPassword'},
        {path:'verify-password',component:VerifyPasswordComponent,title:'VerifyPassword'},
        {path:'reset-password',component:ResetPasswordComponent,title:'VerifyPassword'},
    ]},
    {path:'',component:MainComponent,canActivate:[authGuard],children:[
        {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home',component:HomeComponent,title:'Home'},
        {path:'products',component:ProductsComponent,title:'Products'},
        {path:'categories',component:CategoriesComponent,title:'Categories'},
        {path:'sub-categories/:id/:name',component:SubCategoriesComponent,title:'SubCategories'},
        {path:'brands',component:BrandsComponent,title:'Brands'},
        {path:'specific-brand/:id',component:SpecificBrandComponent,title:'Specific Brand'},
        {path:'cart',component:CartComponent,title:'Cart'},
        {path:'wishList',component:WishListComponent,title:'WishList'},
        {path:'product-details/:id',component:ProductDetailsComponent,title:'ProductDetails'},
        {path:'checkout/:id',component:CheckoutComponent,title:'CheckOut'},
        {path:'allorders',component:AllordersComponent,title:'All Orders'},
        {path:'order-details/:items',component:OrderDetailsComponent,title:'Order Details'},
    ]},
    {path:'**',component:NotFoundComponent,title:'Error 404'}
];
