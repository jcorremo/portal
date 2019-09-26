import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.scss']
})
export class CartFormComponent implements OnInit {
  states = ['Antioquia', 'Cundinamarca', 'Valle'];
  cities = ['Barranquilla', 'Bogotá', 'Cali', 'Medellín'];
  streets = ['CLL', 'CRA', 'DG', 'TR'];

  data = {
    state: '',
    city: '',
    address: '',
    num1: '',
    num2: '',
    num3: '',
    opt1: '',
    opt2: '',
    phone: ''
  };

  constructor(private router: Router) {}

  ngOnInit() {
    if (sessionStorage.getItem('shipData')) {
      this.data = JSON.parse(sessionStorage.getItem('shipData'));
    }
  }

  onSubmit() {
    sessionStorage.setItem('shipData', JSON.stringify(this.data));
    this.navigate();
  }

  navigate() {
    this.router.navigate(['/cart/step-2']);
  }
}
