import { CartItemModel } from '../../models/cart-item.model';
import { ProductModel } from './../../models/product.model';
import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from '../../../services/store.service'
import { stringify } from 'querystring';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() public Product: ProductModel;



  store: Array<CartItemModel>;

  constructor(private data: StoreService) { }


  ngOnInit(): void {
    this.data.currentStore.subscribe(cart => this.store = cart)
  }


  newProduct(name, price, quantity) {
    if (quantity < 1) return
    let storeCp = this.store
    let entry = true
    storeCp.map(item => {
      if (item.name === name) {
        item.quantity = +quantity + +item.quantity
        entry = false
        this.data.changeMessage(storeCp)
        localStorage.setItem("Cart", JSON.stringify(storeCp))
      }
    })
    if (entry === true) {
      storeCp.push(new CartItemModel(name, price, quantity))
      this.data.changeMessage(storeCp)
      localStorage.setItem("Cart", JSON.stringify(storeCp))
    }
  }

}
// if (storeCp.length > 0) {
//   storeCp.map(item => {
//     if (item.name === name) {
//       item.quantity = +quantity + +item.quantity
//     }
//   })
// }