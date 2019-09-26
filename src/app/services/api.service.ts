import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { clearStringForURL } from '../libs/clearStringForURL';
import { Api } from './api';
import { Category } from '../models/category';
import uuid from 'uuid';

import { BASE_URL_PRODUCT, BASE_URL_ORDER, BASE_URL_ORQUESTATOR } from '../../assets/config/environments';
let CurrentEnvironment = window.location.host == 'portal-prod-application.apps.az.rhcol.com' ? 'prod' : 'dev';

// const BASE_URL_PRODUCT = "http://catalogo-poc-dev.apps.az.rhcol.com/";
// const BASE_URL_ORDER = "http://pedido-poc-dev.apps.az.rhcol.com/";
// const BASE_URL_ORQUESTATOR = "http://orquestador-poc-dev.apps.az.rhcol.com/";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = BASE_URL_ORQUESTATOR[CurrentEnvironment] + 'product/inventory';
  // token: string = sessionStorage.getItem('access_token');
  headers = {
    // Authorization: `Bearer ${this.token}`,
    page: '1',
    messageID: uuid.v4(),
    timestamp: new Date().toString(),
    application: 'eCommerce',
    user: 'aval'
  };

  constructor(private http: HttpClient) {}

  getListCategories() {
    return this.http.get('/assets/data/categories.json').pipe(
      map((res: Category[]) =>
        res.map((el: Category) => {
          el.url = clearStringForURL(el.name);

          return el;
        })
      )
    );
  }

  getFilterProducts(filterParams: Api, limit = null) {
    return this.http
      .get(`${this.apiUrl}`, {
        headers: this.headers,
        params: { ...filterParams }
      })
      .pipe(
        map(res => (res ? res : [])),
        map((res: Product[]) => (limit ? res.slice(0, limit) : res)),
        map((products: Product[]) =>
          products.map((product: Product) => {
            product.categoryURL = clearStringForURL(product.category);

            return product;
          })
        )
      );
  }

  getByCategory(category, limit = null) {
    return this.http
      .get(`${this.apiUrl}`, {
        headers: this.headers,
        params: { category }
      })
      .pipe(
        map(res => (res ? res : [])),
        map((res: Product[]) => (limit ? res.slice(0, 3) : res)),
        map((products: Product[]) =>
          products.map((product: Product) => {
            product.categoryURL = clearStringForURL(product.category);

            return product;
          })
        )
      );
  }

  orderUrl = BASE_URL_ORDER[CurrentEnvironment] + 'orders';

  sendOrder(body) {
    return this.http.post(`${this.orderUrl}`, body);
  }
}


