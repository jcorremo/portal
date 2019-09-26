import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';
import { clearStringForURL } from '../libs/clearStringForURL';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  firstCards: Product[];
  secondCards: Product[];

  constructor(private apiService: ApiService) {
    this.firstCards = [];
    this.secondCards = [];
  }

  ngOnInit() {
    this.getAllItems();
  }

  async getAllItems() {
    try {
      this.firstCards = await this.apiService
        .getFilterProducts({
          category: 'Consolas'
        }, 3)
        .toPromise();
    } catch (e) {
      console.log(e);
    }

    try {
      this.secondCards = await this.apiService
        .getFilterProducts({
          category: 'Echo Dot'
        }, 2)
        .toPromise();
    } catch (e) {
      console.log(e);
    }
  }
}
