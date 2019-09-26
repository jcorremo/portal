import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public items: Product[] = [];
  public total: number = 0;

  constructor() {}

  addItem(product: Product) {
    this.items = [product, ...this.items];
    this.saveCart();
  }

  removeItem(index: number) {
    this.items = [
      ...this.items.slice(0, index),
      ...this.items.slice(index + 1, this.items.length)
    ];
    this.saveCart();
  }

  sum(key) {
    return this.items.reduce((a, b) => a + (parseInt(b[key]) || 0), 0);
  }

  clearCart() {
    this.items = []
    this.total = 0;
    sessionStorage.removeItem('cart');
  }

  saveCart() {
    this.total = this.sum('price');
    const cart = {
      items: this.items,
      total: this.total
    };
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }
}
