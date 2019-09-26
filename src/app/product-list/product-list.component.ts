import {Component, OnDestroy, OnInit} from '@angular/core';
import { ApiService } from '../services/api.service';
import { Category } from '../models/category';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Api} from '../services/api';
import {routesNames} from '../routes.names';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  categories: Category[];
  list: any;
  productRouteName: string;
  currentCategory: Category;

  private parameters: Params;
  private queryParameters: Params;

  private queryParametersSubscriber: Subscription;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productRouteName = routesNames.PRODUCTS;
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.parameters = params;

      if (this.queryParametersSubscriber) {
        this.queryParametersSubscriber.unsubscribe();
      }

      this.queryParametersSubscriber = this.route.queryParams.subscribe((query: Params) => {
        this.queryParameters = query;

        this.getAllCategories();
      });
    });
  }

  async getAllCategories() {
    this.categories = await this.apiService.getListCategories().toPromise();

    this.currentCategory = this.categories.filter((category: Category) => category.url === this.parameters.category)[0];

    if (this.parameters.category === routesNames.PRODUCTS) {
      this.currentCategory = {
        name: 'Productos',
        url: routesNames.PRODUCTS,
        image: ''
      };
    } else if (!this.currentCategory) {
      // Redirect to 404 page
      return;
    }

    this.filterProducts();
  }

  async filterProducts() {
    const dataToFilter: Api = {};

    if (this.currentCategory.url !== routesNames.PRODUCTS) {
      dataToFilter.category = this.currentCategory.name;
    }

    if (this.queryParameters.price) {
      const [min, max] = this.queryParameters.price.split(',');

      dataToFilter.lowerPrice = min || '0';
      dataToFilter.higherPrice = max || '999999999';
    }

    if (this.queryParameters.available) {
      const [min, max] = this.queryParameters.available.split(',');

      dataToFilter.minAvailability = min || '0';
      dataToFilter.maxAvailability = max || '9999';
    }

    try {
      this.list = await this.apiService
        .getFilterProducts(dataToFilter)
        .toPromise();
    } catch (e) {
      this.list = [];
    }
  }

  setFilterData(query: object) {
    return {
      ...this.queryParameters,
      ...query
    };
  }

  clearFilterData(query) {
    const queries = { ...this.queryParameters };

    if (delete queries[query]) {
      this.router
        .navigate(['/', this.currentCategory.url], {
          queryParams: queries,
        });
    }
  }
}
