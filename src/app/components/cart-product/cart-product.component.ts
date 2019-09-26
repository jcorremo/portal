import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { Step0Component } from 'src/app/cart/step0/step0.component';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss']
})
export class CartProductComponent implements OnInit {
  @Input() product: Product;
  @Input() index: number;

  constructor(
    private cartService: CartService,
    private step0: Step0Component
  ) {}

  ngOnInit() {}

  onClick() {
    this.cartService.removeItem(this.index);
    this.step0.items = this.cartService.items;
    this.step0.total = this.cartService.total;
  }
}
