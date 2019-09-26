import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {
  shipId: string = ""

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.shipId = sessionStorage.getItem('shipId');
    this.cartService.clearCart();
  }

}
