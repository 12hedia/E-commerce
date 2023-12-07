import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { LoginComponent } from './components/login/login.component';
import { BuyComponent } from './components/buy/buy.component';
import { PanierComponent } from './components/panier/panier.component';

const routes: Routes = [
  {path:"products", component:ProductsComponent},
  {path:"login", component:LoginComponent},
  {path:"buy", component:BuyComponent},
  {path:"panier", component:PanierComponent},
  {path: "", component: HomeComponent},
  {path:"newProduct", component:ProductAddComponent},
  {path:"editProduct/:id", component:ProductEditComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
