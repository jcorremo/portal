import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-card-category',
  templateUrl: './card-category.component.html',
  styleUrls: ['./card-category.component.scss']
})
export class CardCategoryComponent implements OnInit {
  categories: Category[];

  constructor(
    private apiService: ApiService,
  ) {
    this.categories = [];
  }

  ngOnInit() {
    this.getAllCategories();
  }

  async getAllCategories() {
    try {
      this.categories = await this.apiService
        .getListCategories()
        .toPromise();
    } catch (e) { }
  }
}
