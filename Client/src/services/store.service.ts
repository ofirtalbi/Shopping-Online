import { CartItemModel } from '../app/models/cart-item.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class StoreService {

  private cart = new BehaviorSubject<Array<CartItemModel>>([]);
  currentStore = this.cart.asObservable();

  constructor() { }

  changeMessage(product) {
    this.cart.next(product)
  }
}
