import { ProductModel } from './../../models/product.model';

import { RequestService } from './../../../services/request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public productQuery: String;
  public Products: ProductModel[];
  public filteredProducts: ProductModel[];
  public searchFilter: ProductModel[];
  constructor(private auth: RequestService) {}
  public categories;

  async ngOnInit(): Promise<any> {
    this.Products = await this.auth.fetchProducts();
    this.filteredProducts = this.Products;
    this.searchFilter = this.Products;
    this.categories = new Set(this.Products.map((p) => p.category));
  }

  filterProducts(category) {
    this.filteredProducts = this.Products.filter(
      (p) => p.category === category
    );
    return this.filteredProducts;
  }

  searchProduct(value) {
    this.searchFilter = this.Products;
    this.searchFilter = this.Products.filter((p) =>
      p.productName.toLowerCase().includes(value.toLowerCase())
    );
  }
}
