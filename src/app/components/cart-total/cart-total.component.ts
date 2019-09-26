import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrls: ['./cart-total.component.scss']
})
export class CartTotalComponent implements OnInit {
  items: number = 0
  subtotal: number = 0;
  total: number = 0;

  constructor() { }

  ngOnInit() {
    let cart = JSON.parse(sessionStorage.getItem('cart'));
    this.items = cart.items.length;
    this.subtotal = cart.total;
    this.total = parseInt(cart.total) + 12000;
  }

}
