import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {
  @Input() product: Product;

  constructor(private cartService: CartService) {}
  selected: string;

  ngOnInit() {}

  onClick() {
    this.selected = this.product.description
    setTimeout(() => this.selected = "", 2000);
    this.cartService.addItem(this.product);
  }
}
