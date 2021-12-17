import { RequestService } from './../../../services/request.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {


  public cart: [] = JSON.parse(localStorage.getItem("Cart"))
  public userEmail = localStorage.getItem("email")
  cartTotal: Number = 0
  public orderForm: FormGroup;
  public userCity: String = ''
  public userStreet: String = ''



  constructor(private fb: FormBuilder, private auth: RequestService) {

    this.orderForm = this.fb.group({
      city: new FormControl("", [Validators.required]),
      street: new FormControl("", [Validators.required]),
      date: new FormControl(new Date(), [Validators.required]),
      zipCode: new FormControl("", [Validators.required, Validators.minLength(7),
      Validators.pattern('[0-9]*')
      ]),
      creditCard: new FormControl("", [Validators.required, Validators.minLength(16),
      Validators.pattern('[0-9]*')])
    })
    this.cartTotal = this.cartTotalFn(this.cart)
  }
  async submitOrder() {
    const formatted_date = this.orderForm.get("date").value.getDate() + "-" + (this.orderForm.get("date").value.getMonth() + 1) + "-" +
      this.orderForm.get("date").value.getFullYear()
    console.log(formatted_date)
    try {
      await this.auth.addShipment({ date: formatted_date, email: this.userEmail })
      alert("Order has been placed!")
    }
    catch (err) {
      alert(err.message)
    }
  }

  insertCity() {
    this.userCity = localStorage.getItem("city")
    this.orderForm.get("city").clearValidators()
    this.orderForm.get("city").updateValueAndValidity()
    this.orderForm.get("city").setValidators([Validators.required])
  }
  insertStreet() {
    this.userStreet = localStorage.getItem("street")
    this.orderForm.get("street").clearValidators()
    this.orderForm.get("street").updateValueAndValidity()
    this.orderForm.get("street").setValidators([Validators.required])
  }

  getCityError() {
    if (this.orderForm.get("city").hasError("required")) return "City is required";
    return '';
  }
  getStreetError() {
    if (this.orderForm.get("street").hasError("required")) return "Street adress is required";
    return '';
  }
  getZipError() {
    if (this.orderForm.get("zipCode").hasError("required")) return "Zip code is required";
    if (this.orderForm.get("zipCode").hasError("minlength")) return "7 digits are required";
    return '';
  }
  getCardError() {
    if (this.orderForm.get("creditCard").hasError("required")) return "Credit Card is required";
    if (this.orderForm.get("creditCard").hasError("minlength")) return "16 digits are required";
    return '';
  }

  cartTotalFn(cart) {
    let total = 0
    cart.forEach(item => {
      total += +item.price * +item.quantity
    })
    return Math.round((total + Number.EPSILON) * 100) / 100
  }


  ngOnInit(): void {
  }
}