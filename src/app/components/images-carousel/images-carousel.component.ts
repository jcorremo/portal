import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-images-carousel',
  templateUrl: './images-carousel.component.html',
  styleUrls: ['./images-carousel.component.scss']
})
export class ImagesCarouselComponent implements OnInit {
  @Input() id: string;

  category = 'Drones';
  url = "/drones"
  sliderCards: Product[]
  
  constructor(private apiService: ApiService) {
    this.sliderCards = [];
  }

  ngOnInit() {
    this.getItems();
  }

  async getItems() {
    try {
      this.sliderCards = await this.apiService
        .getFilterProducts({
          category: this.category
        })
        .toPromise();
    } catch (e) {
      console.log(e);
    }
  }
}
