import { Router } from '@angular/router';
import { RequestService } from './../../../services/request.service';
import { CartItemModel } from '../../models/cart-item.model';
import { Component, OnInit } from '@angular/core';
import { StoreService } from "../../../services/store.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public user;
  public store: Array<CartItemModel>;
  public cartSum: any = 0

  constructor(private data: StoreService, private request: RequestService, private router: Router) {
  }


  cartTotal() {
    this.cartSum = 0
    this.store.forEach(item => {
      this.cartSum += +item.price * +item.quantity
    })
    return Math.round((this.cartSum + Number.EPSILON) * 100) / 100
  }

  removeFromCart(itemToRemove) {

    this.cartSum -= +itemToRemove.price * +itemToRemove.quantity
    this.store = this.store.filter(item => item.name != itemToRemove.name)
    this.data.changeMessage(this.store)
    localStorage.setItem("Cart", JSON.stringify(this.store))

  }

  clearCart() {

    this.cartSum = 0;
    this.store.length = 0
    this.data.changeMessage(this.store)
    localStorage.removeItem("Cart")
  }

  disabledButton() {
    if (this.cartSum) return false
    else return true
  }


  async checkout() {
    this.router.navigateByUrl('/Checkout')
  }

  ngOnInit() {
    this.data.currentStore.subscribe(cart => this.store = cart)
    const storedCart = JSON.parse(localStorage.getItem("Cart"))
    if (storedCart) {
      this.data.changeMessage(storedCart)
    }
  }

}


