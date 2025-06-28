import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'login',loadComponent:()=>import('./login/login').then(x=>x.Login),pathMatch:'full'},
    {path:'register',loadComponent:()=>import('./register/register').then(x=>x.Register),pathMatch:'full'},
    {path:'products',loadComponent:()=>import('./products/products').then(x=>x.Products),pathMatch:'full'},
    {path:'wishlist',loadComponent:()=>import('./whishlist/whishlist').then(x=>x.Whishlist),pathMatch:'full'},
    {path:'products/:id',loadComponent:()=>import('./product-details/product-details').then(x=>x.ProductDetails),pathMatch:'full'},
    {path:'checkout',loadComponent:()=>import('./checkout/checkout').then(x=>x.Checkout),pathMatch:'full'},
    {path:'',loadComponent:()=>import('./products/products').then(x=>x.Products),pathMatch:'full'},
    {path:'**',loadComponent:()=>import('./not-found/not-found').then(x=>x.NotFound)},
    

 ];
