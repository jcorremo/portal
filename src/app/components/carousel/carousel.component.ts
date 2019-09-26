import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  images = [];
  imagesDesktop = [
    '../../../assets/home/b-d-1.png',
    '../../../assets/home/b-d-2.png',
    '../../../assets/home/b-d-3.png'
  ];

  imagesTablet = [
    '../../../assets/home/b-t-1.png',
    '../../../assets/home/b-t-2.png',
    '../../../assets/home/b-t-3.png'
  ];

  imagesMobile = [
    '../../../assets/home/b-m-1.png',
    '../../../assets/home/b-m-2.png',
    '../../../assets/home/b-m-3.png'
  ];

  constructor() {}

  ngOnInit() {
    this.setSrc()
    window.addEventListener('resize', this.setSrc);
  }

  setSrc = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 481) {
      this.images = this.imagesMobile;
    } else if (windowWidth > 480 && windowWidth < 769) {
      this.images = this.imagesTablet;
    } else {
      this.images = this.imagesDesktop;
    }
  }
}
