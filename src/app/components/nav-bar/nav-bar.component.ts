import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user';
import { Category } from 'src/app/models/category';
import * as $ from 'jquery';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Input() src: string
  @Input() alt: string
  
  user: User;
  categories: Category[];
  url: string = 'productos';
  search: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.apiService.getListCategories().subscribe(res => {
      this.categories = res;
    });
    $('.menu-mobile a').on('click', function(e) {
      e.preventDefault();
      $('#toggleButton').click();
    })
  }

  onSubmit(value: string, event: Event): void {
    event.preventDefault();
    // this.router.navigate([`/${this.url}`]);
    // this.search = '';
    // this.url = 'productos';
  }

  logOut(event: Event) {
    event.preventDefault();
    this.userService.logoutUser();
  }
}
