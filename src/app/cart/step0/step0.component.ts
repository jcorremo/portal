import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-step0',
  templateUrl: './step0.component.html',
  styleUrls: ['./step0.component.scss']
})
export class Step0Component implements OnInit {
  categoria1: any = [];

  public items: Product[] = [];
  public total: number = 0;

  constructor(
    private cartService: CartService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    if (sessionStorage.getItem('cart')) {
      const cart = JSON.parse(sessionStorage.getItem('cart'));
      this.cartService.items = [...cart.items];
      this.cartService.total = cart.total;
    }
    this.items = [...this.cartService.items];
    this.total = this.cartService.total;
    // Load cards
    this.apiService.getByCategory('Consolas').subscribe(
      res => {
        if (res !== null) this.categoria1 = res;
      },
      error => console.log(error)
    );
  }
}
