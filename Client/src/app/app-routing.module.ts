import { IsAdminGuard } from './../guards/is-admin.guard';
import { AdminPrivComponent } from './components/admin-priv/admin-priv.component';
import { CheckoutComponent } from './components/checkout-modal/checkout.component';

import { MainComponent } from './components/main/main.component';
import { AuthGuard } from './../guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./components/home/home.component"
import { LoginComponent } from "./components/login/login.component"
import { RegisterComponent } from "./components/register/register.component"

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "Admin", component: AdminPrivComponent, canActivate: [IsAdminGuard] },
  { path: "Shop", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "Login", component: LoginComponent },
  { path: "Register", component: RegisterComponent },
  { path: "Checkout", component: CheckoutComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


