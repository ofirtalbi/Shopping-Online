import { ProductModel } from '../app/models/product.model';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './../app/models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  public baseUrl = 'http://localhost:3000/api/users/';

  constructor(private http: HttpClient) {}

  public fetchUsers(): Promise<UserModel[]> {
    return this.http.get<UserModel[]>(this.baseUrl + 'getAllUsers').toPromise();
  }

  public fetchProducts(): Promise<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.baseUrl + 'products').toPromise();
  }

  public login(userCredentials: any): Promise<any> {
    return this.http
      .post<any>(this.baseUrl + 'login', userCredentials)
      .toPromise();
  }

  public checkAvailability(userCredentials: any): Promise<any> {
    return this.http
      .post<any>(this.baseUrl + 'checkAvailability', userCredentials)
      .toPromise();
  }

  public register(userToAdd: any): Promise<any> {
    return this.http
      .post<any>(this.baseUrl + 'register', userToAdd)
      .toPromise();
  }

  public addProduct(prodToAdd: any): Promise<any> {
    return this.http
      .post<any>(this.baseUrl + 'addProduct', prodToAdd)
      .toPromise();
  }

  public editProduct(prodToEdit: any): Promise<any> {
    return this.http
      .post<any>(this.baseUrl + 'editProduct', prodToEdit)
      .toPromise();
  }

  public addShipment(shipDate: any): Promise<any> {
    return this.http
      .post<any>(this.baseUrl + 'addShipment', shipDate)
      .toPromise();
  }
}
