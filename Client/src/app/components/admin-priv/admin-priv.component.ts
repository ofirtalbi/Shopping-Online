import { RequestService } from './../../../services/request.service';
import { ProductModel } from './../../models/product.model';
import { StoreService } from './../../../services/store.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-priv',
  templateUrl: './admin-priv.component.html',
  styleUrls: ['./admin-priv.component.scss'],
})
export class AdminPrivComponent implements OnInit {
  public Products: ProductModel[];
  public newProduct: ProductModel = new ProductModel();
  public categories = [
    'Sneaks',
    'Dairy and Eggs',
    'Drinks',
    'Shampoo & Conditioner',
    'Frozen',
    'Bakery',
  ];
  public product: ProductModel | undefined;

  constructor(private data: StoreService, private auth: RequestService) {}

  async editProduct(product, productName, category, price, picture) {
    try {
      await this.auth.editProduct({
        product: product,
        update: { productName, category, price, picture },
      });
    } catch (err) {
      alert(err.message);
    }
  }

  async addProduct() {
    try {
      await this.auth.addProduct(this.newProduct);
    } catch (err) {
      alert(err.message);
    }
  }

  async ngOnInit(): Promise<any> {
    this.Products = await this.auth.fetchProducts();
    // this.categories = new Set(this.Products.map((p) => p.category));
  }
}
