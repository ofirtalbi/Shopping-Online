import { IsAdminGuard } from './../guards/is-admin.guard';
import { CheckoutComponent } from './components/checkout-modal/checkout.component';
import { AuthGuard } from '../guards/auth.guard';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModuleLoaders } from './material-imports';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';

import { LayoutComponent } from './components/layout/layout.component';

import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpModule } from '@angular/http';
import { CartComponent } from './components/cart/cart.component';
import { CardComponent } from './components/card/card.component';
import { AdminPrivComponent } from './components/admin-priv/admin-priv.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MainComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    CartComponent,
    CardComponent,
    CheckoutComponent,
    AdminPrivComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModuleLoaders,
    HttpClientModule,
    HttpModule,
  ],
  providers: [AuthGuard, IsAdminGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
